import { debug, toHex } from './util';
import { byte, word } from './types';

import CPU6502, { DebugInfo, flags, sizes } from './cpu6502';

export interface DebuggerContainer {
    run: () => void;
    stop: () => void;
    isRunning: () => boolean;
}

type symbols = { [key: number]: string };
type breakpointFn = (info: DebugInfo) => boolean;

const alwaysBreak = (_info: DebugInfo) => { return true; };

export const dumpStatusRegister = (sr: byte) =>
    [
        (sr & flags.N) ? 'N' : '-',
        (sr & flags.V) ? 'V' : '-',
        (sr & flags.X) ? 'X' : '-',
        (sr & flags.B) ? 'B' : '-',
        (sr & flags.D) ? 'D' : '-',
        (sr & flags.I) ? 'I' : '-',
        (sr & flags.Z) ? 'Z' : '-',
        (sr & flags.C) ? 'C' : '-',
    ].join('');

export default class Debugger {
    private verbose = false;
    private maxTrace = 256;
    private trace: DebugInfo[] = [];
    private breakpoints: Map<word, breakpointFn> = new Map();
    private symbols: symbols = {};

    constructor(private cpu: CPU6502, private container: DebuggerContainer) {}

    stepCycles(cycles: number) {
        this.cpu.stepCyclesDebug(this.verbose ? 1 : cycles, () => {
            const info = this.cpu.getDebugInfo();

            if (this.breakpoints.get(info.pc)?.(info)) {
                debug('breakpoint', this.printDebugInfo(info));
                this.container.stop();
                return true;
            }
            if (this.verbose) {
                debug(this.printDebugInfo(info));
            } else {
                this.updateTrace(info);
            }
        });
    }

    break = () => {
        this.container.stop();
    };

    step = () => {
        this.cpu.step(() => {
            const info = this.cpu.getDebugInfo();
            debug(this.printDebugInfo(info));
            this.updateTrace(info);
        });
    };

    continue = () => {
        this.container.run();
    };

    /**
     * Restart at a given memory address.
     *
     * @param address Address to start execution
     */

    runAt = (address: word) => {
        this.cpu.reset();
        this.cpu.setPC(address);
    };

    isRunning = () =>
        this.container.isRunning();

    setVerbose = (verbose: boolean) => {
        this.verbose = verbose;
    };

    setMaxTrace = (maxTrace: number) => {
        this.maxTrace = maxTrace;
    };

    getTrace = (count?: number) => {
        return this.trace.slice(count ? -count : undefined).map(this.printDebugInfo).join('\n');
    };

    printTrace = (count?: number) => {
        debug(this.getTrace(count));
    };

    getStack = (size?: number) => {
        const { sp } = this.cpu.getDebugInfo();
        const stack = [];

        let max = 255;
        let min = 0;
        if (size) {
            if ((sp - 3) >= (255 - size)) {
                min = Math.max(255 - size + 1, 0);
            } else {
                max = Math.min(sp + size - 4, 255);
                min = Math.max(sp - 3, 0);
            }
        }

        for (let addr = max; addr >= min; addr--) {
            const isSP = addr === sp ? '*' : ' ';
            const addrStr = `$${toHex(0x0100 + addr)}`;
            const valStr = toHex(this.cpu.read(0x01, addr));
            if (!size || ((sp + size > addr) && (addr > sp - size))) {
                stack.push(`${isSP} ${addrStr} ${valStr}`);
            }
        }

        return stack.join('\n');
    };

    setBreakpoint = (addr: word, exp?: breakpointFn) => {
        this.breakpoints.set(addr, exp || alwaysBreak);
    };

    clearBreakpoint = (addr: word) => {
        this.breakpoints.delete(addr);
    };

    listBreakpoints = () => {
        for(const [addr, fn] of this.breakpoints.entries()) {
            debug(toHex(addr, 4), fn);
        }
    };

    addSymbols = (symbols: symbols) => {
        this.symbols = { ...this.symbols, ...symbols };
    };

    printDebugInfo = (info: DebugInfo) => {
        const { pc, cmd } = info;
        const symbol = this.padWithSymbol(pc);

        return [
            toHex(pc, 4),
            '- ', symbol,
            this.dumpRegisters(info),
            ' ',
            this.dumpRawOp(cmd),
            ' ',
            this.dumpOp(pc, cmd)
        ].join('');
    };

    dumpPC = (pc: word) => {
        const b = this.cpu.read(pc);
        const op = this.cpu.getOpInfo(b);
        const size = sizes[op.mode];
        let result = toHex(pc, 4) + '- ';

        result += this.padWithSymbol(pc);

        const cmd = new Array<number>(size);
        for (let idx = 0, jdx = pc; idx < size; idx++, jdx++) {
            cmd[idx] = this.cpu.read(jdx);
        }

        result += this.dumpRawOp(cmd) + ' ' + this.dumpOp(pc, cmd);

        return result;
    };

    dumpRegisters = (debugInfo?: DebugInfo) => {
        if (debugInfo === undefined) {
            debugInfo = this.cpu.getDebugInfo();
        }
        const { ar, xr, yr, sr, sp } = debugInfo;
        return [
            'A=' + toHex(ar),
            ' X=' + toHex(xr),
            ' Y=' + toHex(yr),
            ' P=' + toHex(sr),
            ' S=' + toHex(sp),
            ' ',
            dumpStatusRegister(sr),
        ].join('');
    };

    dumpPage = (start: byte, end?: byte) => {
        let result = '';
        if (end === undefined) {
            end = start;
        }
        for (let page = start; page <= end; page++) {
            for (let idx = 0; idx < 16; idx++) {
                result += toHex(page) + toHex(idx << 4) + ': ';
                for (let jdx = 0; jdx < 16; jdx++) {
                    const b = this.cpu.read(page, idx * 16 + jdx);
                    result += toHex(b) + ' ';
                }
                result += '        ';
                for (let jdx = 0; jdx < 16; jdx++) {
                    const b = this.cpu.read(page, idx * 16 + jdx) & 0x7f;
                    if (b >= 0x20 && b < 0x7f) {
                        result += String.fromCharCode(b);
                    } else {
                        result += '.';
                    }
                }
                result += '\n';
            }
        }
        return result;
    };

    /**
     * Reads a range of memory. Will wrap at memory limit.
     *
     * @param address Starting address to read memory
     * @param length Length of memory to read.
     * @returns Byte array containing memory
     */
    getMemory(address: word, length: word) {
        const bytes = new Uint8Array(length);
        for (let idx = 0; idx < length; idx++) {
            address &= 0xffff;
            bytes[idx] = this.cpu.read(address++);
        }
        return bytes;
    }

    /**
     * Writes a range of memory. Will wrap at memory limit.
     *
     * @param address Starting address to write memory
     * @param bytes Data to write
     */
    setMemory(address: word, bytes: Uint8Array) {
        for (const byte of bytes) {
            address &= 0xffff;
            this.cpu.write(address++, byte);
        }
    }

    list = (pc: word) => {
        const results = [];
        for (let idx = 0; idx < 20; idx++) {
            const b = this.cpu.read(pc);
            const op = this.cpu.getOpInfo(b);
            results.push(this.dumpPC(pc));
            pc += sizes[op.mode];
        }
        return results;
    };

    private updateTrace(info: DebugInfo) {
        this.trace.push(info);
        if (this.trace.length > this.maxTrace) {
            this.trace.shift();
        }
    }

    private padWithSymbol(pc: word): string {
        const padding = '          ';
        const symbol = this.symbols[pc];

        let result: string = padding;
        if (symbol) {
            result = `${symbol}${padding.substring(symbol.length)}`;
        }
        return result;
    }

    private dumpRawOp(parts: byte[]) {
        const result = new Array(4);
        for (let idx = 0; idx < 4; idx++) {
            if (idx < parts.length) {
                result[idx] = toHex(parts[idx]);
            } else {
                result[idx] = '  ';
            }
        }
        return result.join(' ');
    }

    private dumpOp(pc: word, parts: byte[]) {
        const op = this.cpu.getOpInfo(parts[0]);
        const lsb = parts[1];
        const msb = parts[2];
        const addr = (msb << 8) | lsb;
        let val;
        let off;
        const toHexOrSymbol = (v: word, n?: number) => (
            this.symbols[v] || ('$' + toHex(v, n))
        );

        let result = op.name + ' ';
        switch (op.mode) {
            case 'implied':
                break;
            case 'immediate':
                result += `#${toHexOrSymbol(lsb)}`;
                break;
            case 'absolute':
                result += `${toHexOrSymbol(addr, 4)}`;
                break;
            case 'zeroPage':
                result += `${toHexOrSymbol(lsb)}`;
                break;
            case 'relative':
                {
                    off = lsb;
                    if (off > 127) {
                        off -= 256;
                    }
                    pc += off + 2;
                    result += `${toHexOrSymbol(pc, 4)} (${off})`;
                }
                break;
            case 'absoluteX':
                result += `${toHexOrSymbol(addr, 4)},X`;
                break;
            case 'absoluteY':
                result += `${toHexOrSymbol(addr, 4)},Y`;
                break;
            case 'zeroPageX':
                result += `${toHexOrSymbol(lsb)},X`;
                break;
            case 'zeroPageY':
                result += `${toHexOrSymbol(lsb)},Y`;
                break;
            case 'absoluteIndirect':
                result += `(${toHexOrSymbol(addr, 4)})`;
                break;
            case 'zeroPageXIndirect':
                result += `(${toHexOrSymbol(lsb)},X)`;
                break;
            case 'zeroPageIndirectY':
                result += `(${toHexOrSymbol(lsb)},),Y`;
                break;
            case 'accumulator':
                result += 'A';
                break;
            case 'zeroPageIndirect':
                result += `(${toHexOrSymbol(lsb)})`;
                break;
            case 'absoluteXIndirect':
                result += `(${toHexOrSymbol(addr, 4)},X)`;
                break;
            case 'zeroPage_relative':
                val = lsb;
                off = msb;
                if (off > 127) {
                    off -= 256;
                }
                pc += off + 2;
                result += `${toHexOrSymbol(val)},${toHexOrSymbol(pc, 4)} (${off})`;
                break;
            default:
                break;
        }
        return result;
    }
}
