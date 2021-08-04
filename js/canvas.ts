/* Copyright 2010-2021 Will Scullin <scullin@scullinsteel.com>
 *
 * Permission to use, copy, modify, distribute, and sell this software and its
 * documentation for any purpose is hereby granted without fee, provided that
 * the above copyright notice appear in all copies and that both that
 * copyright notice and this permission notice appear in supporting
 * documentation.  No representations are made about the suitability of this
 * software for any purpose.  It is provided "as is" without express or
 * implied warranty.
 */

import { bit, byte, Color, memory, MemoryPages, rom } from './types';
import { allocMemPages } from './util';
import {
    GraphicsState,
    HiresPage,
    LoresPage,
    Region,
    VideoModes,
    VideoModesState,
    bank,
    pageNo
} from './videomodes';

const dim = (c: Color): Color => {
    return [
        c[0] * 0.75 & 0xff,
        c[1] * 0.75 & 0xff,
        c[2] * 0.75 & 0xff
    ];
};

const whiteCol: Color = [255, 255, 255] as const;
const blackCol: Color = [0, 0, 0] as const;

// hires colors
const hcolors: readonly Color[][] = [
    [
        [0, 0, 0],       // Black
        [255, 68, 253],  // Violet
        [20, 245, 60],   // Green
        [255, 255, 255], // White
    ],
    [
        [0, 0, 0],       // Black
        [20, 207, 253],  // Blue
        [255, 106, 60],  // Orange
        [255, 255, 255], // White
    ]
];

// lores/dhires colors
const dcolors: Color[] = [
    [0, 0, 0], // 0x0 black
    [227, 30, 96], // 0x1 deep red
    [96, 78, 189], // 0x2 dark blue
    [255, 68, 253], // 0x3 purple
    [0, 163, 96], // 0x4 dark green
    [156, 156, 156], // 0x5 dark gray
    [20, 207, 253], // 0x6 medium blue
    [208, 195, 255], // 0x7 light blue
    [96, 114, 3], // 0x8 brown
    [255, 106, 60], // 0x9 orange
    [156, 156, 156], // 0xa light gray
    [255, 160, 208], // 0xb pink
    [20, 245, 60], // 0xc green
    [208, 221, 141], // 0xd yellow
    [114, 255, 208], // 0xe aquamarine
    [255, 255, 255], // 0xf white
];

// Map lores color order to dhires colors
const r4 = [
    0,   // Black
    2,   // Dark Blue
    4,   // Dark Green
    6,   // Medium Blue

    8,   // Brown
    5,   // Gray 1
    12,  // Light Green
    14,  // Aqua

    1,   // Red
    3,   // Purple
    10,  // Gray 2
    7,  // Pink

    9,   // Orange
    11,   // Light Blue
    13,  // Yellow
    15   // White
] as const;

//
const videoWidth = 568;
const videoHeight = 192;
const videoPad = 16;

const notDirty: Region = {
    top: videoHeight + 1,
    bottom: -1,
    left: videoWidth + 1,
    right: -1
} as const;

/****************************************************************************
 *
 * Text/Lores Graphics
 *
 ***************************************************************************/

export class LoresPage2D implements LoresPage {
    // $00-$3F inverse
    // $40-$7F flashing
    // $80-$FF normal

    private _buffer: memory[] = [];
    private _refreshing = false;
    private _blink = false;

    private highColorTextMode = false

    dirty: Region = {...notDirty}
    imageData: ImageData;

    constructor(
        private vm: VideoModes,
        private page: pageNo,
        private readonly charset: rom,
        private readonly e: boolean
    ) {
        this.imageData = this.vm.context.createImageData(videoWidth, videoHeight);
        for (let idx = 0; idx < this.imageData.data.length; idx++) {
            this.imageData.data[idx] = (idx % 4) == 3 ? 0xff : 0x00;
        }
        this._buffer[0] = allocMemPages(0x4);
        this._buffer[1] = allocMemPages(0x4);

        this.vm.setLoresPage(page, this);
    }

    private _drawPixel(data: Uint8ClampedArray, off: number, color: Color) {
        const c0 = color[0], c1 = color[1], c2 = color[2];
        data[off + 0] = data[off + 4] = c0;
        data[off + 1] = data[off + 5] = c1;
        data[off + 2] = data[off + 6] = c2;
    }

    private _drawHalfPixel(data: Uint8ClampedArray, off: number, color: Color) {
        const c0 = color[0], c1 = color[1], c2 = color[2];
        data[off + 0] = c0;
        data[off + 1] = c1;
        data[off + 2] = c2;
    }

    private _checkInverse(val: byte) {
        let inverse = false;
        if (this.e) {
            if (!this.vm._80colMode && !this.vm.altCharMode) {
                inverse = ((val & 0xc0) == 0x40) && this._blink;
            }
        } else {
            inverse = !((val & 0x80) || (val & 0x40) && this._blink);
        }
        return inverse;
    }

    bank0(): MemoryPages {
        return {
            start: () => this._start(),
            end: () => this._end(),
            read: (page, off) => this._read(page, off, 0),
            write: (page, off, val) => this._write(page, off, val, 0),
        };
    }

    bank1(): MemoryPages {
        return {
            start: () => this._start(),
            end: () => this._end(),
            read: (page, off) => this._read(page, off, 1),
            write: (page, off, val) => this._write(page, off, val, 1),
        };
    }

    // These are used by both bank 0 and 1

    private _start() {
        return (0x04 * this.page);
    }

    private _end() { return (0x04 * this.page) + 0x03; }

    private _read(page: byte, off: byte, bank: bank) {
        const addr = (page << 8) | off, base = addr & 0x3FF;
        return this._buffer[bank][base];
    }

    private _write(page: byte, off: byte, val: byte, bank: bank) {
        const addr = (page << 8) | off;
        const base = addr & 0x3FF;
        let fore: Color;
        let back: Color;

        if (this._buffer[bank][base] == val && !this._refreshing) {
            return;
        }
        this._buffer[bank][base] = val;

        const col = (base % 0x80) % 0x28;
        const adj = off - col;

        // 000001cd eabab000 -> 000abcde
        const ab = (adj & 0x18);
        const cd = (page & 0x03) << 1;
        const ee = adj >> 7;
        const row = ab | cd | ee;

        const data = this.imageData.data;
        if ((row < 24) && (col < 40)) {
            let y = row << 3;
            if (y < this.dirty.top) { this.dirty.top = y; }
            y += 8;
            if (y > this.dirty.bottom) { this.dirty.bottom = y; }
            let x = col * 14;
            if (x < this.dirty.left) { this.dirty.left = x; }
            x += 14;
            if (x > this.dirty.right) { this.dirty.right = x; }

            if (this.vm.textMode || this.vm.hiresMode || (this.vm.mixedMode && row > 19)) {
                if (this.vm._80colMode) {
                    const inverse = this._checkInverse(val);

                    fore = inverse ? blackCol : whiteCol;
                    back = inverse ? whiteCol : blackCol;

                    if (!this.vm.altCharMode) {
                        val = (val >= 0x40 && val < 0x80) ? val - 0x40 : val;
                    }

                    let offset = (col * 14 + (bank ? 0 : 1) * 7 + row * videoWidth * 8) * 4 + videoPad;

                    for (let jdx = 0; jdx < 8; jdx++) {
                        let b = this.charset[val * 8 + jdx];
                        for (let idx = 0; idx < 7; idx++) {
                            const color = (b & 0x01) ? back : fore;
                            this._drawHalfPixel(data, offset, color);
                            b >>= 1;
                            offset += 4;
                        }
                        offset += (videoWidth - 7) * 4;
                    }
                } else {
                    val = this._buffer[0][base];

                    const inverse = this._checkInverse(val);

                    fore = inverse ? blackCol : whiteCol;
                    back = inverse ? whiteCol : blackCol;

                    if (!this.vm.altCharMode) {
                        val = (val >= 0x40 && val < 0x80) ? val - 0x40 : val;
                    }

                    let offset = (col * 14 + row * videoWidth * 8) * 4 + videoPad;

                    if (this.highColorTextMode) {
                        fore = dcolors[this._buffer[1][base] >> 4];
                        back = dcolors[this._buffer[1][base] & 0x0f];
                    }

                    if (this.e) {
                        for (let jdx = 0; jdx < 8; jdx++) {
                            let b = this.charset[val * 8 + jdx];
                            for (let idx = 0; idx < 7; idx++) {
                                const color = (b & 0x01) ? back : fore;
                                this._drawPixel(data, offset, color);
                                b >>= 1;
                                offset += 8;
                            }
                            offset += (videoWidth - 14) * 4;
                        }
                    } else {
                        const colorMode = this.vm.mixedMode && !this.vm.textMode && !this.vm.monoMode;
                        // var val0 = col > 0 ? _buffer[0][base - 1] : 0;
                        // var val2 = col < 39 ? _buffer[0][base + 1] : 0;

                        for (let jdx = 0; jdx < 8; jdx++) {
                            let odd = !(col & 0x1);
                            let b = this.charset[val * 8 + jdx] << 1;
                            if (colorMode) {
                                // var b0 = charset[val0 * 8 + jdx];
                                // var b2 = charset[val2 * 8 + jdx];
                                if (inverse) { b ^= 0x1ff; }
                            }

                            for (let idx = 0; idx < 7; idx++) {
                                let color: Color;
                                if (colorMode) {
                                    if (b & 0x80) {
                                        if ((b & 0x1c0) != 0x80) {
                                            color = whiteCol;
                                        } else {
                                            color = odd ? hcolors[0][1] : hcolors[0][2];
                                        }
                                    } else {
                                        color = blackCol;
                                    }
                                    odd = !odd;
                                } else {
                                    color = (b & 0x80) ? fore : back;
                                }
                                this._drawPixel(data, offset, color);
                                b <<= 1;
                                offset += 8;
                            }
                            offset += (videoWidth - 14) * 4;
                        }
                    }
                }
            } else {
                if (this.vm._80colMode && !this.vm.an3State) {
                    let offset = (col * 14 + (bank ? 0 : 1) * 7 + row * videoWidth * 8) * 4 + videoPad;
                    if (this.vm.monoMode) {
                        for (let jdx = 0; jdx < 8; jdx++) {
                            let b = (jdx < 4) ? (val & 0x0f) : (val >> 4);
                            b |= (b << 4);
                            b |= (b << 8);
                            if (col & 0x1) {
                                b >>= 2;
                            }
                            for (let idx = 0; idx < 7; idx++) {
                                const color = (b & 0x01) ? whiteCol : blackCol;
                                this._drawHalfPixel(data, offset, color);
                                b >>= 1;
                                offset += 4;
                            }
                            offset += (videoWidth - 7) * 4;
                        }
                    } else {
                        if (bank & 0x1) {
                            val = ((val & 0x77) << 1) | ((val & 0x88) >> 3);
                        }
                        for (let jdx = 0; jdx < 8; jdx++) {
                            const color = dcolors[(jdx < 4) ?
                                (val & 0x0f) : (val >> 4)];
                            for (let idx = 0; idx < 7; idx++) {
                                this._drawHalfPixel(data, offset, color);
                                offset += 4;
                            }
                            offset += (videoWidth - 7) * 4;
                        }
                    }
                } else if (bank === 0) {
                    let offset = (col * 14 + row * videoWidth * 8) * 4 + videoPad;

                    if (this.vm.monoMode) {
                        for (let jdx = 0; jdx < 8; jdx++) {
                            let b = (jdx < 4) ? (val & 0x0f) : (val >> 4);
                            b |= (b << 4);
                            b |= (b << 8);
                            if (col & 0x1) {
                                b >>= 2;
                            }
                            for (let idx = 0; idx < 14; idx++) {
                                const color = (b & 0x0001) ? whiteCol : blackCol;
                                this._drawHalfPixel(data, offset, color);
                                b >>= 1;
                                offset += 4;
                            }
                            offset += (videoWidth - 14) * 4;
                        }
                    } else {
                        for (let jdx = 0; jdx < 8; jdx++) {
                            const color = dcolors[(jdx < 4) ? (val & 0x0f) : (val >> 4)];
                            for (let idx = 0; idx < 7; idx++) {
                                this._drawPixel(data, offset, color);
                                offset += 8;
                            }
                            offset += (videoWidth - 14) * 4;
                        }
                    }
                }
            }
        }
    }

    refresh() {
        this.highColorTextMode = !this.vm.an3State && !this.vm._80colMode;

        let addr = 0x400 * this.page;
        this._refreshing = true;
        for (let idx = 0; idx < 0x400; idx++, addr++) {
            this._write(addr >> 8, addr & 0xff, this._buffer[0][idx], 0);
            if (this.vm._80colMode) {
                this._write(addr >> 8, addr & 0xff, this._buffer[1][idx], 1);
            }
        }
        this._refreshing = false;
    }

    blink() {
        if (!this.vm.textMode || !this.vm.mixedMode) {
            return;
        }
        let addr = 0x400 * this.page;
        this._refreshing = true;
        this._blink = !this._blink;
        for (let idx = 0; idx < 0x400; idx++, addr++) {
            const b = this._buffer[0][idx];
            if ((b & 0xC0) == 0x40) {
                this._write(addr >> 8, addr & 0xff, this._buffer[0][idx], 0);
            }
        }
        this._refreshing = false;
    }

    start() {
        setInterval(() => this.blink(), 267);
        return this._start();
    }

    end() {
        return this._end();
    }

    read(page: byte, off: byte) {
        return this._read(page, off, 0);
    }

    write(page: byte, off: byte, val: byte) {
        return this._write(page, off, val, 0);
    }

    getState(): GraphicsState {
        return {
            buffer: [
                new Uint8Array(this._buffer[0]),
                new Uint8Array(this._buffer[1]),
            ]
        };
    }

    setState(state: GraphicsState) {
        this._buffer[0] = new Uint8Array(state.buffer[0]);
        this._buffer[1] = new Uint8Array(state.buffer[1]);

        this.refresh();
    }

    private rowToBase(row: number) {
        const ab = (row >> 3) & 3;
        const cd = (row >> 1) & 0x3;
        const e = row & 1;
        return (cd << 8) | (e << 7) | (ab << 5) | (ab << 3);
    }

    private mapCharCode(charCode: byte) {
        charCode &= 0x7F;
        if (charCode < 0x20) {
            charCode += 0x40;
        }
        if (!this.e && (charCode >= 0x60)) {
            charCode -= 0x40;
        }
        return charCode;
    }

    getText() {
        let buffer = '', line, charCode;
        let row, col, base;
        for (row = 0; row < 24; row++) {
            base = this.rowToBase(row);
            line = '';
            if (this.e && this.vm._80colMode) {
                for (col = 0; col < 80; col++) {
                    charCode = this.mapCharCode(this._buffer[1 - col % 2][base + Math.floor(col / 2)]);
                    line += String.fromCharCode(charCode);
                }
            } else {
                for (col = 0; col < 40; col++) {
                    charCode = this.mapCharCode(this._buffer[0][base + col]);
                    line += String.fromCharCode(charCode);
                }
            }
            line = line.trimRight();
            buffer += line + '\n';
        }
        return buffer;
    }
}

/****************************************************************************
 *
 * Hires Graphics
 *
 ***************************************************************************/

export class HiresPage2D implements HiresPage {
    public imageData: ImageData;
    dirty: Region = {...notDirty};

    private _buffer: memory[] = [];
    private _refreshing = false;

    highColorHGRMode: boolean;
    oneSixtyMode: boolean;
    mixedDHRMode: boolean;
    monoDHRMode: boolean;
    rgbDHRMode: boolean = false;

    constructor(
        private vm: VideoModes,
        private page: pageNo,
    ) {
        this.imageData = this.vm.context.createImageData(videoWidth, videoHeight);
        for (let idx = 0; idx < this.imageData.data.length; idx++) {
            this.imageData.data[idx] = (idx % 4) == 3 ? 0xff : 0x00;
        }
        this._buffer[0] = allocMemPages(0x20);
        this._buffer[1] = allocMemPages(0x20);

        this.vm.setHiresPage(page, this);
    }

    private _drawPixel(data: Uint8ClampedArray, off: number, color: Color) {
        const c0 = color[0], c1 = color[1], c2 = color[2];

        data[off + 0] = data[off + 4] = c0;
        data[off + 1] = data[off + 5] = c1;
        data[off + 2] = data[off + 6] = c2;
    }

    private _drawHalfPixel(data: Uint8ClampedArray, off: number, color: Color) {
        const c0 = color[0], c1 = color[1], c2 = color[2];

        data[off + 0] = c0;
        data[off + 1] = c1;
        data[off + 2] = c2;
    }

    //
    // 160x192 pixels alternate 3 and 4 base pixels wide
    //

    private _draw3Pixel(data: Uint8ClampedArray, off: number, color: Color) {
        const c0 = color[0], c1 = color[1], c2 = color[2];

        data[off + 0] = data[off + 4] = data[off + 8] = c0;
        data[off + 1] = data[off + 5] = data[off + 9] = c1;
        data[off + 2] = data[off + 6] = data[off + 10] = c2;
    }

    private _draw4Pixel(data: Uint8ClampedArray, off: number, color: Color) {
        const c0 = color[0], c1 = color[1], c2 = color[2];

        data[off + 0] = data[off + 4] = data[off + 8] = data[off + 12] = c0;
        data[off + 1] = data[off + 5] = data[off + 9] = data[off + 13] = c1;
        data[off + 2] = data[off + 6] = data[off + 10] = data[off + 14] = c2;
    }

    bank0(): MemoryPages {
        return {
            start: () => this._start(),
            end: () => this._end(),
            read: (page, off) => this._read(page, off, 0),
            write: (page, off, val) => this._write(page, off, val, 0),
        };
    }

    bank1(): MemoryPages {
        return {
            start: () => this._start(),
            end: () => this._end(),
            read: (page, off) => this._read(page, off, 1),
            write: (page, off, val) => this._write(page, off, val, 1),
        };
    }

    private _start() { return (0x20 * this.page); }

    private _end() { return (0x020 * this.page) + 0x1f; }

    private _read(page: byte, off: byte, bank: bank) {
        const addr = (page << 8) | off, base = addr & 0x1FFF;
        return this._buffer[bank][base];
    }

    private _write(page: byte, off: byte, val: byte, bank: bank) {
        const addr = (page << 8) | off;
        const base = addr & 0x1FFF;

        if (this._buffer[bank][base] == val && !this._refreshing) {
            return;
        }
        this._buffer[bank][base] = val;

        const col = (base % 0x80) % 0x28;
        const adj = off - col;

        // 000001cd eabab000 -> 000abcde
        const ab = (adj & 0x18);
        const cd = (page & 0x03) << 1;
        const e = adj >> 7;

        const rowA = ab | cd | e;
        const rowB = base >> 10;

        const data = this.imageData.data;
        let dx, dy;
        if ((rowA < 24) && (col < 40) && this.vm.hiresMode) {
            let y = rowA << 4 | rowB << 1;
            if (y < this.dirty.top) { this.dirty.top = y; }
            y += 1;
            if (y > this.dirty.bottom) { this.dirty.bottom = y; }
            let x = col * 14 - 2;
            if (x < this.dirty.left) { this.dirty.left = x; }
            x += 18;
            if (x > this.dirty.right) { this.dirty.right = x; }

            dy = rowA << 3 | rowB;
            if (this.oneSixtyMode && !this.vm.monoMode) {
                // 1 byte = two pixels, but 3:4 ratio
                const c3 = val & 0xf;
                const c4 = val >> 4;

                dx = col * 2 + (bank ^ 1);
                const offset = dx * 28 + dy * videoWidth * 4 + videoPad;

                this._draw3Pixel(data, offset, dcolors[c3]);
                this._draw4Pixel(data, offset + 12, dcolors[c4]);
            } else if (this.vm.doubleHiresMode) {
                // Every 4 bytes is 7 pixels
                // 2 bytes per bank

                // b0       b1       b2       b3
                //  c0  c1    c2  c3    c4  c5    c6
                // 76543210 76543210 76543210 76543210
                //  0000111  1222233  3344445  5556666

                // Find the beginning of the current 4 byte/7 pixel window
                const mod = col % 2;
                const modCol = col - mod;
                const baseOff = base - mod;

                // 4 bit look behind for sliding window mode
                const bz: byte = modCol > 0 ? this._buffer[0][baseOff - 1] : 0;
                // 4 bytes for 7 pixels
                const b0: byte = this._buffer[1][baseOff];
                const b1: byte = this._buffer[0][baseOff];
                const b2: byte = this._buffer[1][baseOff + 1];
                const b3: byte = this._buffer[0][baseOff + 1];
                // 4 bit lookahead for sliding window mode
                const b4: byte = modCol < 37 ? this._buffer[1][baseOff + 2] : 0;

                // Colors normalized
                const c = [
                    ((bz & 0x78) >> 3), // -1
                    ((b0 & 0x0f) >> 0), // 0
                    ((b0 & 0x70) >> 4) | ((b1 & 0x01) << 3), // 1
                    ((b1 & 0x1e) >> 1), // 2
                    ((b1 & 0x60) >> 5) | ((b2 & 0x03) << 2), // 3
                    ((b2 & 0x3c) >> 2), // 4
                    ((b2 & 0x40) >> 6) | ((b3 & 0x07) << 1), // 5
                    ((b3 & 0x78) >> 3), // 6
                    ((b4 & 0x0f) >> 0), // 7
                ];

                // High bits
                const hbs = [
                    bz & 0x80, // -1
                    b0 & 0x80, // 0
                    b0 & 0x80, // 1
                    b1 & 0x80, // 2
                    b2 & 0x80, // 3
                    b2 & 0x80, // 4
                    b3 & 0x80, // 5
                    b3 & 0x80, // 6
                    b4 & 0x80, // 7
                ];

                dx = modCol * 14;
                let offset = dx * 4 + dy * videoWidth * 4 + videoPad;

                let monoColor: Color | null = null;
                if (this.vm.monoMode || this.monoDHRMode) {
                    monoColor = whiteCol;
                }

                let bits = c[0];
                for (let idx = 0; idx < 8 && dx < (videoWidth - 4); idx++) {
                    const hb = hbs[idx];
                    bits |= c[idx + 1] << 4;
                    // Color for mixed and RGB mode
                    let dcolor;
                    for (let jdx = 0; jdx < 4; jdx++, offset += 4) {
                        if (monoColor) {
                            dcolor = bits & 0x01 ? monoColor : blackCol;
                        } else if (this.mixedDHRMode) {
                            if (hb) {
                                dcolor = dcolors[r4[bits & 0xf]];
                            } else {
                                dcolor = bits & 0x01 ? whiteCol : blackCol;
                            }
                        } else if (this.rgbDHRMode) {
                            dcolor = dcolors[r4[bits & 0xf]];
                        } else { // sliding window
                            // use 4 bit window to select color
                            let slide = bits & 0x0f;
                            // adjust for window position
                            slide = ((slide >> (4 - jdx)) | (slide << jdx)) & 0x0f;
                            dcolor = dcolors[r4[slide]];
                        }
                        this._drawHalfPixel(data, offset, dcolor);
                        dx += 1;
                        bits >>= 1;
                    }
                }
            } else {
                // Every byte is 3.5 pixels + high bit

                // b0       b1
                //  3c2c1c0  c6c5c4c
                // 76543210 76543210
                // H3221100 H6655443

                // 1 byte look behind
                const bz: byte = col > 0 ? this._buffer[0][base - 1] : 0;
                // 1 byte for 3.5 pixels
                const b0: byte = this._buffer[0][base];
                // 1 byte look ahead
                const b1: byte = col < 39 ? this._buffer[0][base + 1] : 0;

                const lookBehind = 7;
                const c: byte[] = [
                    bz & 0x7f, // -1
                    b0 & 0x7f, // 0
                    b1 & 0x7f, // 1
                ];
                const hbs: bit[] = [
                    (bz & 0x80) ? 1 : 0,
                    (b0 & 0x80) ? 1 : 0,
                    (b1 & 0x80) ? 1 : 0,
                ];

                let dx = col * 14;
                let offset = dx * 4 + dy * videoWidth * 4 - (lookBehind * 4);
                let odd = !(col & 0x1);

                const monoColor = this.vm.monoMode ? whiteCol : null;

                let color: Color;
                let bits = c[0];
                for (let idx = 0; idx < 2; idx++) {
                    const hb = hbs[idx];
                    bits |= c[idx + 1] << 7;
                    for (let jdx = 0; jdx < 7; jdx++) {
                        if (monoColor) {
                            color = bits & 0x1 ? monoColor : blackCol;
                        } else if (this.highColorHGRMode) {
                            const ba = this._buffer[1][base];
                            color = bits & 0x1 ? dcolors[ba >> 4] : dcolors[ba & 0x0f];
                        } else { // Sliding window
                            // use 2 bit window to select color
                            let slide = bits & 0x03;
                            if (odd) {
                                slide = ((slide >> 1) | (slide << 1)) & 0x03;
                            }
                            // adjust for window position
                            color = hcolors[hb][slide];
                            color = (bits & 0x1) ? color : dim(color);
                        }

                        if (dx >= lookBehind && dx < videoWidth) {
                            this._drawPixel(data, offset, color);
                        }

                        bits >>= 1;
                        dx += 2;
                        offset += 8;
                        odd = !odd;
                    }
                }
            }
        }
    }

    refresh() {
        this.highColorHGRMode = !this.vm.an3State && this.vm.hiresMode && !this.vm._80colMode;
        this.oneSixtyMode = this.vm.flag == 1 && this.vm.doubleHiresMode;
        this.mixedDHRMode = this.vm.flag == 2 && this.vm.doubleHiresMode;
        this.monoDHRMode = this.vm.flag == 3 && this.vm.doubleHiresMode;

        let addr = 0x2000 * this.page;
        this._refreshing = true;
        for (let idx = 0; idx < 0x2000; idx++, addr++) {
            const page = addr >> 8;
            const off = addr & 0xff;
            this._write(page, off, this._buffer[0][idx], 0);
            if (this.vm._80colMode) {
                this._write(page, off, this._buffer[1][idx], 1);
            }
        }
        this._refreshing = false;
    }

    start() {
        return this._start();
    }

    end() {
        return this._end();
    }

    read(page: byte, off: byte) {
        return this._read(page, off, 0);
    }

    write(page: byte, off: byte, val: byte) {
        return this._write(page, off, val, 0);
    }

    getState(): GraphicsState {
        return {
            buffer: [
                new Uint8Array(this._buffer[0]),
                new Uint8Array(this._buffer[1]),
            ]
        };
    }

    setState(state: GraphicsState) {
        this._buffer[0] = new Uint8Array(state.buffer[0]);
        this._buffer[1] = new Uint8Array(state.buffer[1]);

        this.refresh();
    }
}

export class VideoModes2D implements VideoModes {
    private _grs: LoresPage[] = [];
    private _hgrs: HiresPage[] = [];
    private _screenContext: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;
    private _left: number;
    private _top: number;
    private _refreshFlag: boolean = true;

    public ready = Promise.resolve();

    textMode: boolean;
    mixedMode: boolean;
    hiresMode: boolean;
    pageMode: pageNo;
    _80colMode: boolean;
    altCharMode: boolean;
    an3State: boolean;
    doubleHiresMode: boolean;

    flag = 0;
    monoMode = false;

    context: CanvasRenderingContext2D;

    constructor(
        private screen: HTMLCanvasElement,
        private e: boolean
    ) {
        this._canvas = document.createElement('canvas');
        const context = this._canvas.getContext('2d');
        const screenContext = this.screen.getContext('2d');
        if (!context || !screenContext) {
            throw new Error('No 2d context');
        }
        this.context = context;

        const { width, height } = { width: videoWidth, height: videoHeight };
        this._canvas.width = width;
        this._canvas.height = height;

        this._screenContext = screenContext;
        this._left = (this.screen.width - videoWidth) / 2;
        this._top = (this.screen.height - 384) / 2;
    }

    _refresh() {
        this.doubleHiresMode = !this.an3State && this.hiresMode && this._80colMode;

        this._refreshFlag = true;
    }

    refresh() {
        this._refresh();
    }

    reset() {
        this.textMode = true;
        this.mixedMode = false;
        this.hiresMode = true;
        this.pageMode = 1;

        this._80colMode = false;
        this.altCharMode = false;

        this.flag = 0;
        this.an3State = true;

        this._refresh();
    }

    setLoresPage(page: pageNo, lores: LoresPage) {
        this._grs[page - 1] = lores;
    }

    setHiresPage(page: pageNo, hires: HiresPage) {
        this._hgrs[page - 1] = hires;
    }

    text(on: boolean) {
        const old = this.textMode;
        this.textMode = on;

        if (old != on) {
            this.flag = 0;
            this._refresh();
        }
    }

    _80col(on: boolean) {
        if (!this.e) { return; }

        const old = this._80colMode;
        this._80colMode = on;

        if (old != on) {
            this._refresh();
        }
    }

    altChar(on: boolean) {
        if (!this.e) { return; }

        const old = this.altCharMode;
        this.altCharMode = on;
        if (old != on) {
            this._refresh();
        }
    }

    hires(on: boolean) {
        const old = this.hiresMode;
        this.hiresMode = on;

        if (old != on) {
            if (on) {
                this.flag = 0;
            }
            this._refresh();
        }
    }

    an3(on: boolean) {
        if (!this.e) { return; }

        const old = this.an3State;
        this.an3State = on;

        if (on) {
            this.flag = ((this.flag << 1) | (this._80colMode ? 0x0 : 0x1)) & 0x3;
        }

        if (old != on) {
            this._refresh();
        }
    }

    doubleHires(on: boolean) {
        this.an3(!on);
    }

    mixed(on: boolean) {
        const old = this.mixedMode;
        this.mixedMode = on;
        if (old != on) {
            this._refresh();
        }
    }

    page(pageNo: pageNo) {
        const old = this.pageMode;
        this.pageMode = pageNo;
        if (old != pageNo) {
            this._refresh();
        }
    }

    isText() {
        return this.textMode;
    }

    isMixed() {
        return this.mixedMode;
    }

    isPage2() {
        return this.pageMode == 2;
    }

    isHires() {
        return this.hiresMode;
    }

    isDoubleHires() {
        return this.doubleHiresMode;
    }

    is80Col() {
        return this._80colMode;
    }

    isAltChar() {
        return this.altCharMode;
    }

    buildScreen(mainData: ImageData, mixData?: ImageData | null) {
        // TODO(whscullin): - figure out 80 column offset
        const { x, y } = this._80colMode ? { x: 0, y: 0 } : { x: 0, y: 0 };

        if (mixData) {
            this.context.putImageData(mainData, x, y, 0, 0, videoWidth, 160);
            this.context.putImageData(mixData, x, y, 0, 160, videoWidth, 32);
        } else {
            this.context.putImageData(mainData, x, y);
        }
        return this._canvas;
    }

    updateImage(
        mainData: ImageData,
        mainDirty: Region,
        mixData?: ImageData | null,
        mixDirty?: Region | null
    ) {
        let blitted = false;

        if (mainDirty.bottom !== -1 || (mixDirty && mixDirty.bottom !== -1)) {
            const imageData = this.buildScreen(mainData, mixData);
            this._screenContext.drawImage(
                imageData,
                0, 0, videoWidth, videoHeight,
                this._left, this._top, videoWidth, 384
            );
            blitted = true;
        }
        return blitted;
    }

    blit(altData?: ImageData) {
        let blitted = false;
        const hgr = this._hgrs[this.pageMode - 1];
        const gr = this._grs[this.pageMode - 1];

        if (this._refreshFlag) {
            hgr.refresh();
            gr.refresh();
            this._refreshFlag = false;
        }

        if (altData) {
            blitted = this.updateImage(
                altData,
                { top: 0, left: 0, right: videoWidth, bottom: videoHeight }
            );
        } else if (this.hiresMode && !this.textMode) {
            blitted = this.updateImage(
                hgr.imageData,
                hgr.dirty,
                this.mixedMode ? gr.imageData : null,
                this.mixedMode ? gr.dirty : null
            );
        } else {
            blitted = this.updateImage(
                gr.imageData, gr.dirty
            );
        }
        hgr.dirty = {...notDirty};
        gr.dirty = {...notDirty};

        return blitted;
    }

    getState(): VideoModesState {
        return {
            grs: [this._grs[0].getState(), this._grs[1].getState()],
            hgrs: [this._hgrs[0].getState(), this._hgrs[1].getState()],
            textMode: this.textMode,
            mixedMode: this.mixedMode,
            hiresMode: this.hiresMode,
            pageMode: this.pageMode,
            _80colMode: this._80colMode,
            altCharMode: this.altCharMode,
            an3State: this.an3State,
            flag: this.flag
        };
    }

    setState(state: VideoModesState) {
        this.textMode = state.textMode;
        this.mixedMode = state.mixedMode;
        this.hiresMode = state.hiresMode;
        this.pageMode = state.pageMode;
        this._80colMode = state._80colMode;
        this.altCharMode = state.altCharMode;
        this.an3State = state.an3State;
        this.flag = state.flag;

        this._grs[0].setState(state.grs[0]);
        this._grs[1].setState(state.grs[1]);
        this._hgrs[0].setState(state.hgrs[0]);
        this._hgrs[1].setState(state.hgrs[1]);
        this._refresh();
    }

    mono(on: boolean) {
        if (on) {
            this.screen.classList.add('mono');
        } else {
            this.screen.classList.remove('mono');
        }
        this.monoMode = on;
        this._refresh();
    }

    scanlines(on: boolean) {
        // Can't apply scanline filter to canvas
        const parent = this.screen.parentElement;
        if (parent) {
            if (on) {
                parent.classList.add('scanlines');
            } else {
                parent.classList.remove('scanlines');
            }
        }
    }

    getText() {
        return this._grs[this.pageMode - 1].getText();
    }
}
