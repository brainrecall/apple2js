import { ReadonlyUint8Array } from '../types';

const rmfont_charset = new Uint8Array([
    0x3c,0x42,0x59,0x55,0x55,0x39,0x02,0x3c,
    0x08,0x14,0x22,0x22,0x3e,0x22,0x22,0x00,
    0x1e,0x24,0x24,0x1c,0x24,0x24,0x1e,0x00,
    0x1c,0x22,0x02,0x02,0x02,0x22,0x1c,0x00,
    0x1e,0x24,0x24,0x24,0x24,0x24,0x1e,0x00,
    0x3e,0x02,0x02,0x1e,0x02,0x02,0x3e,0x00,
    0x3e,0x02,0x02,0x1e,0x02,0x02,0x02,0x00,
    0x1c,0x22,0x02,0x02,0x32,0x22,0x3c,0x00,
    0x22,0x22,0x22,0x3e,0x22,0x22,0x22,0x00,
    0x1c,0x08,0x08,0x08,0x08,0x08,0x1c,0x00,
    0x38,0x10,0x10,0x10,0x10,0x12,0x0c,0x00,
    0x22,0x12,0x0a,0x16,0x12,0x22,0x22,0x00,
    0x02,0x02,0x02,0x02,0x02,0x02,0x3e,0x00,
    0x22,0x36,0x2a,0x2a,0x22,0x22,0x22,0x00,
    0x22,0x22,0x26,0x2a,0x32,0x22,0x22,0x00,
    0x1c,0x22,0x22,0x22,0x22,0x22,0x1c,0x00,
    0x1e,0x22,0x22,0x1e,0x02,0x02,0x02,0x00,
    0x1c,0x22,0x22,0x22,0x2a,0x12,0x2c,0x00,
    0x1e,0x22,0x22,0x1e,0x0a,0x12,0x22,0x00,
    0x1c,0x22,0x02,0x1c,0x20,0x22,0x1c,0x00,
    0x3e,0x08,0x08,0x08,0x08,0x08,0x08,0x00,
    0x22,0x22,0x22,0x22,0x22,0x22,0x1c,0x00,
    0x22,0x22,0x22,0x22,0x14,0x14,0x08,0x00,
    0x22,0x22,0x22,0x2a,0x2a,0x36,0x22,0x00,
    0x22,0x22,0x14,0x08,0x14,0x22,0x22,0x00,
    0x22,0x22,0x14,0x08,0x08,0x08,0x08,0x00,
    0x3e,0x20,0x10,0x08,0x04,0x02,0x3e,0x00,
    0x3e,0x06,0x06,0x06,0x06,0x06,0x3e,0x00,
    0x00,0x02,0x04,0x08,0x10,0x20,0x00,0x00,
    0x3e,0x30,0x30,0x30,0x30,0x30,0x3e,0x00,
    0x00,0x00,0x08,0x14,0x22,0x00,0x00,0x00,
    0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x7f,
    0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
    0x08,0x1c,0x1c,0x08,0x08,0x00,0x08,0x00,
    0x36,0x36,0x14,0x00,0x00,0x00,0x00,0x00,
    0x14,0x14,0x3e,0x14,0x3e,0x14,0x14,0x00,
    0x08,0x3c,0x0a,0x1c,0x28,0x1e,0x08,0x00,
    0x06,0x26,0x10,0x08,0x04,0x32,0x30,0x00,
    0x04,0x0a,0x0a,0x04,0x2a,0x12,0x2c,0x00,
    0x18,0x10,0x08,0x00,0x00,0x00,0x00,0x00,
    0x08,0x04,0x02,0x02,0x02,0x04,0x08,0x00,
    0x08,0x10,0x20,0x20,0x20,0x10,0x08,0x00,
    0x08,0x2a,0x1c,0x3e,0x1c,0x2a,0x08,0x00,
    0x00,0x08,0x08,0x3e,0x08,0x08,0x00,0x00,
    0x00,0x00,0x00,0x00,0x00,0x08,0x08,0x04,
    0x00,0x00,0x00,0x3e,0x00,0x00,0x00,0x00,
    0x00,0x00,0x00,0x00,0x00,0x00,0x08,0x00,
    0x00,0x20,0x10,0x08,0x04,0x02,0x00,0x00,
    0x1c,0x22,0x22,0x2a,0x22,0x22,0x1c,0x00,
    0x08,0x0c,0x08,0x08,0x08,0x08,0x1c,0x00,
    0x1c,0x22,0x20,0x18,0x04,0x02,0x3e,0x00,
    0x3e,0x20,0x10,0x18,0x20,0x22,0x1c,0x00,
    0x10,0x18,0x14,0x12,0x3e,0x10,0x10,0x00,
    0x3e,0x02,0x1e,0x22,0x20,0x22,0x1c,0x00,
    0x38,0x04,0x02,0x1e,0x22,0x22,0x1c,0x00,
    0x3e,0x20,0x10,0x08,0x04,0x04,0x04,0x00,
    0x1c,0x22,0x22,0x1c,0x22,0x22,0x1c,0x00,
    0x1c,0x22,0x22,0x3c,0x20,0x10,0x08,0x00,
    0x00,0x00,0x08,0x00,0x08,0x00,0x00,0x00,
    0x00,0x00,0x08,0x00,0x00,0x08,0x08,0x04,
    0x10,0x08,0x04,0x02,0x04,0x08,0x10,0x00,
    0x00,0x00,0x3e,0x00,0x3e,0x00,0x00,0x00,
    0x04,0x08,0x10,0x20,0x10,0x08,0x04,0x00,
    0x1c,0x22,0x20,0x10,0x08,0x00,0x08,0x00,
    0xef,0xf7,0xc9,0x80,0xc0,0xc0,0x81,0xc9,
    0xef,0xf7,0xc9,0xbe,0xde,0xde,0xb5,0xc9,
    0xff,0xff,0xfd,0xf9,0xf1,0xe1,0xc9,0xbd,
    0x80,0xdd,0xeb,0xf7,0xf7,0xeb,0xd5,0x80,
    0xff,0xbf,0xdf,0xee,0xf5,0xfb,0xfb,0xff,
    0x80,0xc0,0xa0,0x93,0x8a,0x84,0x84,0x80,
    0x40,0x40,0x40,0x44,0x46,0x7f,0x06,0x04,
    0x00,0x7f,0x00,0x7f,0x00,0x7f,0x7f,0x00,
    0xf7,0xfb,0xfd,0x80,0xfd,0xfb,0xf7,0xff,
    0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xd5,
    0xf7,0xf7,0xf7,0xf7,0xb6,0xd5,0xe3,0xf7,
    0xf7,0xe3,0xd5,0xb6,0xf7,0xf7,0xf7,0xf7,
    0x80,0xff,0xff,0xff,0xff,0xff,0xff,0xff,
    0xbf,0xbf,0xbf,0xbb,0xb9,0x80,0xf9,0xfb,
    0xc0,0xc0,0xc0,0xc0,0xc0,0xc0,0xc0,0xc0,
    0xec,0xe7,0xe3,0x81,0xe3,0xe7,0xef,0x90,
    0x9b,0xf3,0xe3,0xc0,0xe3,0xf3,0xfb,0x84,
    0xbf,0xb7,0xf7,0x80,0xc1,0xe3,0xb7,0xbf,
    0xbf,0xb7,0xe3,0xc1,0x80,0xf7,0xb7,0xbf,
    0xff,0xff,0xff,0x80,0xff,0xff,0xff,0xff,
    0xfe,0xfe,0xfe,0xfe,0xfe,0xfe,0xfe,0x80,
    0xf7,0xef,0xdf,0x80,0xdf,0xef,0xf7,0xff,
    0xd5,0xaa,0xd5,0xaa,0xd5,0xaa,0xd5,0xaa,
    0xaa,0xd5,0xaa,0xd5,0xaa,0xd5,0xaa,0xd5,
    0xff,0xc1,0xbe,0xfe,0xfe,0xfe,0x80,0xff,
    0xff,0xff,0xc0,0xbf,0xbf,0xbf,0x80,0xff,
    0xbf,0xbf,0xbf,0xbf,0xbf,0xbf,0xbf,0xbf,
    0xf7,0xe3,0xc1,0x80,0xc1,0xe3,0xf7,0xff,
    0x80,0xff,0xff,0xff,0xff,0xff,0xff,0x80,
    0xeb,0xeb,0x88,0xff,0x88,0xeb,0xeb,0xff,
    0x80,0xbf,0xbf,0xb3,0xb3,0xbf,0xbf,0x80,
    0xfe,0xfe,0xfe,0xfe,0xfe,0xfe,0xfe,0xfe,
    0x04,0x08,0x10,0x00,0x00,0x00,0x00,0x00,
    0x00,0x00,0x1c,0x20,0x3c,0x22,0x3c,0x00,
    0x02,0x02,0x1e,0x22,0x22,0x22,0x1e,0x00,
    0x00,0x00,0x3c,0x02,0x02,0x02,0x3c,0x00,
    0x20,0x20,0x3c,0x22,0x22,0x22,0x3c,0x00,
    0x00,0x00,0x1c,0x22,0x3e,0x02,0x3c,0x00,
    0x18,0x24,0x04,0x1e,0x04,0x04,0x04,0x00,
    0x00,0x00,0x1c,0x22,0x22,0x3c,0x20,0x1c,
    0x02,0x02,0x1e,0x22,0x22,0x22,0x22,0x00,
    0x08,0x00,0x0c,0x08,0x08,0x08,0x1c,0x00,
    0x10,0x00,0x18,0x10,0x10,0x10,0x12,0x0c,
    0x02,0x02,0x22,0x12,0x0e,0x12,0x22,0x00,
    0x0c,0x08,0x08,0x08,0x08,0x08,0x1c,0x00,
    0x00,0x00,0x36,0x2a,0x2a,0x2a,0x22,0x00,
    0x00,0x00,0x1e,0x22,0x22,0x22,0x22,0x00,
    0x00,0x00,0x1c,0x22,0x22,0x22,0x1c,0x00,
    0x00,0x00,0x1e,0x22,0x22,0x1e,0x02,0x02,
    0x00,0x00,0x3c,0x22,0x22,0x3c,0x20,0x60,
    0x00,0x00,0x1a,0x26,0x02,0x02,0x02,0x00,
    0x00,0x00,0x3c,0x02,0x1c,0x20,0x1e,0x00,
    0x04,0x04,0x1e,0x04,0x04,0x24,0x18,0x00,
    0x00,0x00,0x22,0x22,0x22,0x32,0x2c,0x00,
    0x00,0x00,0x22,0x22,0x22,0x14,0x08,0x00,
    0x00,0x00,0x22,0x22,0x2a,0x2a,0x14,0x00,
    0x00,0x00,0x22,0x14,0x08,0x14,0x22,0x00,
    0x00,0x00,0x22,0x22,0x22,0x3c,0x20,0x1c,
    0x00,0x00,0x3e,0x10,0x08,0x04,0x3e,0x00,
    0x38,0x0c,0x0c,0x06,0x0c,0x0c,0x38,0x00,
    0x08,0x08,0x08,0x08,0x08,0x08,0x08,0x08,
    0x0e,0x18,0x18,0x30,0x18,0x18,0x0e,0x00,
    0x2c,0x1a,0x00,0x00,0x00,0x00,0x00,0x00,
    0x6f,0x77,0x41,0x00,0x40,0x40,0x00,0x49,
    0x43,0x3c,0x26,0x2a,0x2a,0x46,0x7d,0x43,
    0xf7,0xeb,0xdd,0xdd,0xc1,0xdd,0xdd,0xff,
    0xe1,0xdb,0xdb,0xe3,0xdb,0xdb,0xe1,0x7f,
    0xe3,0xdd,0xfd,0xfd,0xfd,0xdd,0xe3,0xff,
    0xe1,0xdb,0xdb,0xdb,0xdb,0xdb,0xe1,0x7f,
    0xc1,0xfd,0xfd,0xe1,0xfd,0xfd,0xc1,0xff,
    0xc1,0xfd,0xfd,0xe1,0xfd,0xfd,0xfd,0xff,
    0xe3,0xdd,0xfd,0xfd,0xcd,0xdd,0xc3,0x7f,
    0xdd,0xdd,0xdd,0xc1,0xdd,0xdd,0xdd,0xff,
    0xe3,0xf7,0xf7,0xf7,0xf7,0xf7,0xe3,0xff,
    0xc7,0xef,0xef,0xef,0xef,0xed,0xf3,0x7f,
    0xdd,0xed,0xf5,0xe9,0xed,0xdd,0xdd,0x7f,
    0xfd,0xfd,0xfd,0xfd,0xfd,0xfd,0xc1,0xff,
    0xdd,0xc9,0xd5,0xd5,0xdd,0xdd,0xdd,0xff,
    0xdd,0xdd,0xd9,0xd5,0xcd,0xdd,0xdd,0xff,
    0xe3,0xdd,0xdd,0xdd,0xdd,0xdd,0xe3,0xff,
    0xe1,0xdd,0xdd,0xe1,0xfd,0xfd,0xfd,0xff,
    0xe3,0xdd,0xdd,0xdd,0xd5,0xed,0xd3,0xff,
    0xe1,0xdd,0xdd,0xe1,0xf5,0xed,0xdd,0xff,
    0xe3,0xdd,0xfd,0xe3,0xdf,0xdd,0xe3,0xff,
    0xc1,0xf7,0xf7,0xf7,0xf7,0xf7,0xf7,0xff,
    0xdd,0xdd,0xdd,0xdd,0xdd,0xdd,0xe3,0xff,
    0xdd,0xdd,0xdd,0xdd,0xeb,0xeb,0xf7,0x7f,
    0xdd,0xdd,0xdd,0xd5,0xd5,0xc9,0xdd,0xff,
    0xdd,0xdd,0xeb,0xf7,0xeb,0xdd,0xdd,0xff,
    0xdd,0xdd,0xeb,0xf7,0xf7,0xf7,0xf7,0xff,
    0xc1,0xdf,0xef,0xf7,0xfb,0xfd,0xc1,0xff,
    0xc1,0xf9,0xf9,0xf9,0xf9,0xf9,0xc1,0xff,
    0xff,0xfd,0xfb,0xf7,0xef,0xdf,0xff,0xff,
    0xc1,0xcf,0xcf,0xcf,0xcf,0xcf,0xc1,0xff,
    0xff,0xff,0xf7,0xeb,0xdd,0xff,0xff,0xff,
    0xff,0xff,0xff,0xff,0xff,0xff,0xff,0x80,
    0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,
    0x77,0x63,0x63,0x77,0x77,0x7f,0x77,0x7f,
    0x49,0x49,0x6b,0x7f,0x7f,0x7f,0x7f,0x7f,
    0xeb,0xeb,0xc1,0xeb,0xc1,0xeb,0xeb,0xff,
    0xf7,0xc3,0xf5,0xe3,0xd7,0xe1,0xf7,0xff,
    0xf9,0xd9,0xef,0xf7,0xfb,0xcd,0xcf,0xff,
    0xfb,0xf5,0xf5,0xfb,0xd5,0xed,0xd3,0xff,
    0x67,0x6f,0x77,0x7f,0x7f,0x7f,0x7f,0x7f,
    0xf7,0xfb,0xfd,0xfd,0xfd,0xfb,0xf7,0xff,
    0xf7,0xef,0xdf,0xdf,0xdf,0xef,0xf7,0xff,
    0xf7,0xd5,0xe3,0xc1,0xe3,0xd5,0xf7,0xff,
    0xff,0xf7,0xf7,0xc1,0xf7,0xf7,0xff,0xff,
    0xff,0xff,0xff,0xff,0xff,0xf7,0xf7,0xfb,
    0xff,0xff,0xff,0xc1,0xff,0xff,0xff,0xff,
    0xff,0xff,0xff,0xff,0xff,0xff,0xf7,0xff,
    0xff,0xdf,0xef,0xf7,0xfb,0xfd,0xff,0xff,
    0x63,0x5d,0x5d,0x55,0x5d,0x5d,0x63,0x7f,
    0xf7,0xf3,0xf7,0xf7,0xf7,0xf7,0xe3,0xff,
    0xe3,0xdd,0xdf,0xe7,0xfb,0xfd,0xc1,0xff,
    0xc1,0xdf,0xef,0xe7,0xdf,0xdd,0xe3,0xff,
    0xef,0xe7,0xeb,0xed,0xc1,0xef,0xef,0xff,
    0x41,0x7d,0x61,0x5d,0x5f,0x5d,0x63,0x7f,
    0xc7,0xfb,0xfd,0xe1,0xdd,0xdd,0xe3,0xff,
    0xc1,0xdf,0xef,0xf7,0xfb,0xfb,0xfb,0xff,
    0xe3,0xdd,0xdd,0xe3,0xdd,0xdd,0xe3,0xff,
    0xe3,0xdd,0xdd,0xc3,0xdf,0xef,0xf7,0xff,
    0xff,0xff,0xf7,0xff,0xf7,0xff,0xff,0xff,
    0xff,0xff,0xf7,0xff,0xff,0xf7,0xf7,0xfb,
    0xef,0xf7,0xfb,0xfd,0xfb,0xf7,0xef,0xff,
    0xff,0xff,0xc1,0xff,0xc1,0xff,0xff,0xff,
    0xfb,0xf7,0xef,0xdf,0xef,0xf7,0xfb,0xff,
    0x63,0x5d,0x5f,0x6f,0x77,0x7f,0x77,0x7f,
    0x43,0x3c,0x26,0x2a,0x2a,0x46,0x7d,0x43,
    0xf7,0xeb,0xdd,0xdd,0xc1,0xdd,0xdd,0xff,
    0xe1,0xdb,0xdb,0xe3,0xdb,0xdb,0xe1,0xff,
    0xe3,0xdd,0xfd,0xfd,0xfd,0xdd,0xe3,0xff,
    0xe1,0xdb,0xdb,0xdb,0xdb,0xdb,0xe1,0xff,
    0xc1,0xfd,0xfd,0xe1,0xfd,0xfd,0xc1,0xff,
    0xc1,0xfd,0xfd,0xe1,0xfd,0xfd,0xfd,0xff,
    0xe3,0xdd,0xfd,0xfd,0xcd,0xdd,0xc3,0xff,
    0xdd,0xdd,0xdd,0xc1,0xdd,0xdd,0xdd,0xff,
    0xe3,0xf7,0xf7,0xf7,0xf7,0xf7,0xe3,0xff,
    0xc7,0xef,0xef,0xef,0xef,0xed,0xf3,0xff,
    0xdd,0xed,0xf5,0xe9,0xed,0xdd,0xdd,0xff,
    0xfd,0xfd,0xfd,0xfd,0xfd,0xfd,0xc1,0xff,
    0xdd,0xc9,0xd5,0xd5,0xdd,0xdd,0xdd,0xff,
    0xdd,0xdd,0xd9,0xd5,0xcd,0xdd,0xdd,0xff,
    0xe3,0xdd,0xdd,0xdd,0xdd,0xdd,0xe3,0xff,
    0xe1,0xdd,0xdd,0xe1,0xfd,0xfd,0xfd,0xff,
    0xe3,0xdd,0xdd,0xdd,0xd5,0xed,0xd3,0xff,
    0xe1,0xdd,0xdd,0xe1,0xf5,0xed,0xdd,0xff,
    0xe3,0xdd,0xfd,0xe3,0xdf,0xdd,0xe3,0xff,
    0xc1,0xf7,0xf7,0xf7,0xf7,0xf7,0xf7,0xff,
    0xdd,0xdd,0xdd,0xdd,0xdd,0xdd,0xe3,0xff,
    0xdd,0xdd,0xdd,0xdd,0xeb,0xeb,0xf7,0xff,
    0xdd,0xdd,0xdd,0xd5,0xd5,0xc9,0xdd,0xff,
    0xdd,0xdd,0xeb,0xf7,0xeb,0xdd,0xdd,0xff,
    0xdd,0xdd,0xeb,0xf7,0xf7,0xf7,0xf7,0xff,
    0xc1,0xdf,0xef,0xf7,0xfb,0xfd,0xc1,0xff,
    0xc1,0xf9,0xf9,0xf9,0xf9,0xf9,0xc1,0xff,
    0xff,0xfd,0xfb,0xf7,0xef,0xdf,0xff,0xff,
    0xc1,0xcf,0xcf,0xcf,0xcf,0xcf,0xc1,0xff,
    0xff,0xff,0xf7,0xeb,0xdd,0xff,0xff,0xff,
    0xff,0xff,0xff,0xff,0xff,0xff,0xff,0x80,
    0xfb,0xf7,0xef,0xff,0xff,0xff,0xff,0xff,
    0xff,0xff,0xe3,0xdf,0xc3,0xdd,0xc3,0xff,
    0xfd,0xfd,0xe1,0xdd,0xdd,0xdd,0xe1,0xff,
    0xff,0xff,0xc3,0xfd,0xfd,0xfd,0xc3,0xff,
    0xdf,0xdf,0xc3,0xdd,0xdd,0xdd,0xc3,0xff,
    0xff,0xff,0xe3,0xdd,0xc1,0xfd,0xc3,0xff,
    0xe7,0xdb,0xfb,0xe1,0xfb,0xfb,0xfb,0xff,
    0xff,0xff,0xe3,0xdd,0xdd,0xc3,0xdf,0xe3,
    0xfd,0xfd,0xe1,0xdd,0xdd,0xdd,0xdd,0xff,
    0xf7,0xff,0xf3,0xf7,0xf7,0xf7,0xe3,0xff,
    0xef,0xff,0xe7,0xef,0xef,0xef,0xed,0xf3,
    0xfd,0xfd,0xdd,0xed,0xf1,0xed,0xdd,0xff,
    0xf3,0xf7,0xf7,0xf7,0xf7,0xf7,0xe3,0xff,
    0xff,0xff,0xc9,0xd5,0xd5,0xd5,0xdd,0xff,
    0xff,0xff,0xe1,0xdd,0xdd,0xdd,0xdd,0xff,
    0xff,0xff,0xe3,0xdd,0xdd,0xdd,0xe3,0xff,
    0xff,0xff,0xe1,0xdd,0xdd,0xe1,0xfd,0xfd,
    0x7f,0x7f,0x43,0x5d,0x5d,0x43,0x5f,0x1f,
    0x7f,0x7f,0x65,0x59,0x7d,0x7d,0x7d,0x7f,
    0xff,0xff,0xc3,0xfd,0xe3,0xdf,0xe1,0xff,
    0xfb,0xfb,0xe1,0xfb,0xfb,0xdb,0xe7,0xff,
    0xff,0xff,0xdd,0xdd,0xdd,0xcd,0xd3,0xff,
    0xff,0xff,0xdd,0xdd,0xdd,0xeb,0xf7,0xff,
    0xff,0xff,0x5d,0x5d,0x55,0x55,0x6b,0x7f,
    0xff,0xff,0xdd,0xeb,0xf7,0xeb,0xdd,0xff,
    0xff,0xff,0xdd,0xdd,0xdd,0xc3,0xdf,0xe3,
    0xff,0xff,0xc1,0xef,0xf7,0xfb,0xc1,0xff,
    0xc7,0xf3,0xf3,0xf9,0xf3,0xf3,0xc7,0xff,
    0xf7,0xf7,0xf7,0xf7,0xf7,0xf7,0xf7,0xf7,
    0xf1,0xe7,0xe7,0xcf,0xe7,0xe7,0xf1,0xff,
    0xd3,0xe5,0xff,0xff,0xff,0xff,0xff,0xff,
    0x6f,0x77,0x49,0x3e,0x5e,0x5e,0x36,0x49,
    0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,
    0xfe,0xfe,0xee,0xbb,0xfe,0xfe,0xff,0xff,
    0xfd,0xfd,0xdd,0x77,0xfd,0xfd,0xff,0xff,
    0xfc,0xfc,0xcc,0x33,0xfc,0xfc,0xff,0xff,
    0xfb,0xfb,0xbb,0xee,0xfb,0xfb,0xff,0xff,
    0xfa,0xfa,0xaa,0xaa,0xfa,0xfa,0xff,0xff,
    0xf9,0xf9,0x99,0x66,0xf9,0xf9,0xff,0xff,
    0xf8,0xf8,0x88,0x22,0xf8,0xf8,0xff,0xff,
    0xf7,0xf7,0x77,0xdd,0xf7,0xf7,0xff,0xff,
    0xf6,0xf6,0x66,0x99,0xf6,0xf6,0xff,0xff,
    0xf5,0xf5,0x55,0x55,0xf5,0xf5,0xff,0xff,
    0xf4,0xf4,0x44,0x11,0xf4,0xf4,0xff,0xff,
    0xf3,0xf3,0x33,0xcc,0xf3,0xf3,0xff,0xff,
    0xf2,0xf2,0x22,0x88,0xf2,0xf2,0xff,0xff,
    0xf1,0xf1,0x11,0x44,0xf1,0xf1,0xff,0xff,
    0xf0,0xf0,0x00,0x00,0xf0,0xf0,0xff,0xff,
    0xef,0xef,0xff,0xff,0xef,0xef,0xee,0xbb,
    0xee,0xee,0xee,0xbb,0xee,0xee,0xee,0xbb,
    0xed,0xed,0xdd,0x77,0xed,0xed,0xee,0xbb,
    0xec,0xec,0xcc,0x33,0xec,0xec,0xee,0xbb,
    0xeb,0xeb,0xbb,0xee,0xeb,0xeb,0xee,0xbb,
    0xea,0xea,0xaa,0xaa,0xea,0xea,0xee,0xbb,
    0xe9,0xe9,0x99,0x66,0xe9,0xe9,0xee,0xbb,
    0xe8,0xe8,0x88,0x22,0xe8,0xe8,0xee,0xbb,
    0xe7,0xe7,0x77,0xdd,0xe7,0xe7,0xee,0xbb,
    0xe6,0xe6,0x66,0x99,0xe6,0xe6,0xee,0xbb,
    0xe5,0xe5,0x55,0x55,0xe5,0xe5,0xee,0xbb,
    0xe4,0xe4,0x44,0x11,0xe4,0xe4,0xee,0xbb,
    0xe3,0xe3,0x33,0xcc,0xe3,0xe3,0xee,0xbb,
    0xe2,0xe2,0x22,0x88,0xe2,0xe2,0xee,0xbb,
    0xe1,0xe1,0x11,0x44,0xe1,0xe1,0xee,0xbb,
    0xe0,0xe0,0x00,0x00,0xe0,0xe0,0xee,0xbb,
    0xdf,0xdf,0xff,0xff,0xdf,0xdf,0xdd,0x77,
    0xde,0xde,0xee,0xbb,0xde,0xde,0xdd,0x77,
    0xdd,0xdd,0xdd,0x77,0xdd,0xdd,0xdd,0x77,
    0xdc,0xdc,0xcc,0x33,0xdc,0xdc,0xdd,0x77,
    0xdb,0xdb,0xbb,0xee,0xdb,0xdb,0xdd,0x77,
    0xda,0xda,0xaa,0xaa,0xda,0xda,0xdd,0x77,
    0xd9,0xd9,0x99,0x66,0xd9,0xd9,0xdd,0x77,
    0xd8,0xd8,0x88,0x22,0xd8,0xd8,0xdd,0x77,
    0xd7,0xd7,0x77,0xdd,0xd7,0xd7,0xdd,0x77,
    0xd6,0xd6,0x66,0x99,0xd6,0xd6,0xdd,0x77,
    0xd5,0xd5,0x55,0x55,0xd5,0xd5,0xdd,0x77,
    0xd4,0xd4,0x44,0x11,0xd4,0xd4,0xdd,0x77,
    0xd3,0xd3,0x33,0xcc,0xd3,0xd3,0xdd,0x77,
    0xd2,0xd2,0x22,0x88,0xd2,0xd2,0xdd,0x77,
    0xd1,0xd1,0x11,0x44,0xd1,0xd1,0xdd,0x77,
    0xd0,0xd0,0x00,0x00,0xd0,0xd0,0xdd,0x77,
    0xcf,0xcf,0xff,0xff,0xcf,0xcf,0xcc,0x33,
    0xce,0xce,0xee,0xbb,0xce,0xce,0xcc,0x33,
    0xcd,0xcd,0xdd,0x77,0xcd,0xcd,0xcc,0x33,
    0xcc,0xcc,0xcc,0x33,0xcc,0xcc,0xcc,0x33,
    0xcb,0xcb,0xbb,0xee,0xcb,0xcb,0xcc,0x33,
    0xca,0xca,0xaa,0xaa,0xca,0xca,0xcc,0x33,
    0xc9,0xc9,0x99,0x66,0xc9,0xc9,0xcc,0x33,
    0xc8,0xc8,0x88,0x22,0xc8,0xc8,0xcc,0x33,
    0xc7,0xc7,0x77,0xdd,0xc7,0xc7,0xcc,0x33,
    0xc6,0xc6,0x66,0x99,0xc6,0xc6,0xcc,0x33,
    0xc5,0xc5,0x55,0x55,0xc5,0xc5,0xcc,0x33,
    0xc4,0xc4,0x44,0x11,0xc4,0xc4,0xcc,0x33,
    0xc3,0xc3,0x33,0xcc,0xc3,0xc3,0xcc,0x33,
    0xc2,0xc2,0x22,0x88,0xc2,0xc2,0xcc,0x33,
    0xc1,0xc1,0x11,0x44,0xc1,0xc1,0xcc,0x33,
    0xc0,0xc0,0x00,0x00,0xc0,0xc0,0xcc,0x33,
    0xbf,0xbf,0xff,0xff,0xbf,0xbf,0xbb,0xee,
    0xbe,0xbe,0xee,0xbb,0xbe,0xbe,0xbb,0xee,
    0xbd,0xbd,0xdd,0x77,0xbd,0xbd,0xbb,0xee,
    0xbc,0xbc,0xcc,0x33,0xbc,0xbc,0xbb,0xee,
    0xbb,0xbb,0xbb,0xee,0xbb,0xbb,0xbb,0xee,
    0xba,0xba,0xaa,0xaa,0xba,0xba,0xbb,0xee,
    0xb9,0xb9,0x99,0x66,0xb9,0xb9,0xbb,0xee,
    0xb8,0xb8,0x88,0x22,0xb8,0xb8,0xbb,0xee,
    0xb7,0xb7,0x77,0xdd,0xb7,0xb7,0xbb,0xee,
    0xb6,0xb6,0x66,0x99,0xb6,0xb6,0xbb,0xee,
    0xb5,0xb5,0x55,0x55,0xb5,0xb5,0xbb,0xee,
    0xb4,0xb4,0x44,0x11,0xb4,0xb4,0xbb,0xee,
    0xb3,0xb3,0x33,0xcc,0xb3,0xb3,0xbb,0xee,
    0xb2,0xb2,0x22,0x88,0xb2,0xb2,0xbb,0xee,
    0xb1,0xb1,0x11,0x44,0xb1,0xb1,0xbb,0xee,
    0xb0,0xb0,0x00,0x00,0xb0,0xb0,0xbb,0xee,
    0xaf,0xaf,0xff,0xff,0xaf,0xaf,0xaa,0xaa,
    0xae,0xae,0xee,0xbb,0xae,0xae,0xaa,0xaa,
    0xad,0xad,0xdd,0x77,0xad,0xad,0xaa,0xaa,
    0xac,0xac,0xcc,0x33,0xac,0xac,0xaa,0xaa,
    0xab,0xab,0xbb,0xee,0xab,0xab,0xaa,0xaa,
    0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,
    0xa9,0xa9,0x99,0x66,0xa9,0xa9,0xaa,0xaa,
    0xa8,0xa8,0x88,0x22,0xa8,0xa8,0xaa,0xaa,
    0xa7,0xa7,0x77,0xdd,0xa7,0xa7,0xaa,0xaa,
    0xa6,0xa6,0x66,0x99,0xa6,0xa6,0xaa,0xaa,
    0xa5,0xa5,0x55,0x55,0xa5,0xa5,0xaa,0xaa,
    0xa4,0xa4,0x44,0x11,0xa4,0xa4,0xaa,0xaa,
    0xa3,0xa3,0x33,0xcc,0xa3,0xa3,0xaa,0xaa,
    0xa2,0xa2,0x22,0x88,0xa2,0xa2,0xaa,0xaa,
    0xa1,0xa1,0x11,0x44,0xa1,0xa1,0xaa,0xaa,
    0xa0,0xa0,0x00,0x00,0xa0,0xa0,0xaa,0xaa,
    0x9f,0x9f,0xff,0xff,0x9f,0x9f,0x99,0x66,
    0x9e,0x9e,0xee,0xbb,0x9e,0x9e,0x99,0x66,
    0x9d,0x9d,0xdd,0x77,0x9d,0x9d,0x99,0x66,
    0x9c,0x9c,0xcc,0x33,0x9c,0x9c,0x99,0x66,
    0x9b,0x9b,0xbb,0xee,0x9b,0x9b,0x99,0x66,
    0x9a,0x9a,0xaa,0xaa,0x9a,0x9a,0x99,0x66,
    0x99,0x99,0x99,0x66,0x99,0x99,0x99,0x66,
    0x98,0x98,0x88,0x22,0x98,0x98,0x99,0x66,
    0x97,0x97,0x77,0xdd,0x97,0x97,0x99,0x66,
    0x96,0x96,0x66,0x99,0x96,0x96,0x99,0x66,
    0x95,0x95,0x55,0x55,0x95,0x95,0x99,0x66,
    0x94,0x94,0x44,0x11,0x94,0x94,0x99,0x66,
    0x93,0x93,0x33,0xcc,0x93,0x93,0x99,0x66,
    0x92,0x92,0x22,0x88,0x92,0x92,0x99,0x66,
    0x91,0x91,0x11,0x44,0x91,0x91,0x99,0x66,
    0x90,0x90,0x00,0x00,0x90,0x90,0x99,0x66,
    0x8f,0x8f,0xff,0xff,0x8f,0x8f,0x88,0x22,
    0x8e,0x8e,0xee,0xbb,0x8e,0x8e,0x88,0x22,
    0x8d,0x8d,0xdd,0x77,0x8d,0x8d,0x88,0x22,
    0x8c,0x8c,0xcc,0x33,0x8c,0x8c,0x88,0x22,
    0x8b,0x8b,0xbb,0xee,0x8b,0x8b,0x88,0x22,
    0x8a,0x8a,0xaa,0xaa,0x8a,0x8a,0x88,0x22,
    0x89,0x89,0x99,0x66,0x89,0x89,0x88,0x22,
    0x88,0x88,0x88,0x22,0x88,0x88,0x88,0x22,
    0x87,0x87,0x77,0xdd,0x87,0x87,0x88,0x22,
    0x86,0x86,0x66,0x99,0x86,0x86,0x88,0x22,
    0x85,0x85,0x55,0x55,0x85,0x85,0x88,0x22,
    0x84,0x84,0x44,0x11,0x84,0x84,0x88,0x22,
    0x83,0x83,0x33,0xcc,0x83,0x83,0x88,0x22,
    0x82,0x82,0x22,0x88,0x82,0x82,0x88,0x22,
    0x81,0x81,0x11,0x44,0x81,0x81,0x88,0x22,
    0x80,0x80,0x00,0x00,0x80,0x80,0x88,0x22,
    0xff,0xff,0xff,0xff,0xff,0xff,0x77,0xdd,
    0xfe,0xfe,0xee,0xbb,0xfe,0xfe,0x77,0xdd,
    0xfd,0xfd,0xdd,0x77,0xfd,0xfd,0x77,0xdd,
    0xfc,0xfc,0xcc,0x33,0xfc,0xfc,0x77,0xdd,
    0xfb,0xfb,0xbb,0xee,0xfb,0xfb,0x77,0xdd,
    0xfa,0xfa,0xaa,0xaa,0xfa,0xfa,0x77,0xdd,
    0xf9,0xf9,0x99,0x66,0xf9,0xf9,0x77,0xdd,
    0xf8,0xf8,0x88,0x22,0xf8,0xf8,0x77,0xdd,
    0xf7,0xf7,0x77,0xdd,0xf7,0xf7,0x77,0xdd,
    0xf6,0xf6,0x66,0x99,0xf6,0xf6,0x77,0xdd,
    0xf5,0xf5,0x55,0x55,0xf5,0xf5,0x77,0xdd,
    0xf4,0xf4,0x44,0x11,0xf4,0xf4,0x77,0xdd,
    0xf3,0xf3,0x33,0xcc,0xf3,0xf3,0x77,0xdd,
    0xf2,0xf2,0x22,0x88,0xf2,0xf2,0x77,0xdd,
    0xf1,0xf1,0x11,0x44,0xf1,0xf1,0x77,0xdd,
    0xf0,0xf0,0x00,0x00,0xf0,0xf0,0x77,0xdd,
    0xef,0xef,0xff,0xff,0xef,0xef,0x66,0x99,
    0xee,0xee,0xee,0xbb,0xee,0xee,0x66,0x99,
    0xed,0xed,0xdd,0x77,0xed,0xed,0x66,0x99,
    0xec,0xec,0xcc,0x33,0xec,0xec,0x66,0x99,
    0xeb,0xeb,0xbb,0xee,0xeb,0xeb,0x66,0x99,
    0xea,0xea,0xaa,0xaa,0xea,0xea,0x66,0x99,
    0xe9,0xe9,0x99,0x66,0xe9,0xe9,0x66,0x99,
    0xe8,0xe8,0x88,0x22,0xe8,0xe8,0x66,0x99,
    0xe7,0xe7,0x77,0xdd,0xe7,0xe7,0x66,0x99,
    0xe6,0xe6,0x66,0x99,0xe6,0xe6,0x66,0x99,
    0xe5,0xe5,0x55,0x55,0xe5,0xe5,0x66,0x99,
    0xe4,0xe4,0x44,0x11,0xe4,0xe4,0x66,0x99,
    0xe3,0xe3,0x33,0xcc,0xe3,0xe3,0x66,0x99,
    0xe2,0xe2,0x22,0x88,0xe2,0xe2,0x66,0x99,
    0xe1,0xe1,0x11,0x44,0xe1,0xe1,0x66,0x99,
    0xe0,0xe0,0x00,0x00,0xe0,0xe0,0x66,0x99,
    0xdf,0xdf,0xff,0xff,0xdf,0xdf,0x55,0x55,
    0xde,0xde,0xee,0xbb,0xde,0xde,0x55,0x55,
    0xdd,0xdd,0xdd,0x77,0xdd,0xdd,0x55,0x55,
    0xdc,0xdc,0xcc,0x33,0xdc,0xdc,0x55,0x55,
    0xdb,0xdb,0xbb,0xee,0xdb,0xdb,0x55,0x55,
    0xda,0xda,0xaa,0xaa,0xda,0xda,0x55,0x55,
    0xd9,0xd9,0x99,0x66,0xd9,0xd9,0x55,0x55,
    0xd8,0xd8,0x88,0x22,0xd8,0xd8,0x55,0x55,
    0xd7,0xd7,0x77,0xdd,0xd7,0xd7,0x55,0x55,
    0xd6,0xd6,0x66,0x99,0xd6,0xd6,0x55,0x55,
    0xd5,0xd5,0x55,0x55,0xd5,0xd5,0x55,0x55,
    0xd4,0xd4,0x44,0x11,0xd4,0xd4,0x55,0x55,
    0xd3,0xd3,0x33,0xcc,0xd3,0xd3,0x55,0x55,
    0xd2,0xd2,0x22,0x88,0xd2,0xd2,0x55,0x55,
    0xd1,0xd1,0x11,0x44,0xd1,0xd1,0x55,0x55,
    0xd0,0xd0,0x00,0x00,0xd0,0xd0,0x55,0x55,
    0xcf,0xcf,0xff,0xff,0xcf,0xcf,0x44,0x11,
    0xce,0xce,0xee,0xbb,0xce,0xce,0x44,0x11,
    0xcd,0xcd,0xdd,0x77,0xcd,0xcd,0x44,0x11,
    0xcc,0xcc,0xcc,0x33,0xcc,0xcc,0x44,0x11,
    0xcb,0xcb,0xbb,0xee,0xcb,0xcb,0x44,0x11,
    0xca,0xca,0xaa,0xaa,0xca,0xca,0x44,0x11,
    0xc9,0xc9,0x99,0x66,0xc9,0xc9,0x44,0x11,
    0xc8,0xc8,0x88,0x22,0xc8,0xc8,0x44,0x11,
    0xc7,0xc7,0x77,0xdd,0xc7,0xc7,0x44,0x11,
    0xc6,0xc6,0x66,0x99,0xc6,0xc6,0x44,0x11,
    0xc5,0xc5,0x55,0x55,0xc5,0xc5,0x44,0x11,
    0xc4,0xc4,0x44,0x11,0xc4,0xc4,0x44,0x11,
    0xc3,0xc3,0x33,0xcc,0xc3,0xc3,0x44,0x11,
    0xc2,0xc2,0x22,0x88,0xc2,0xc2,0x44,0x11,
    0xc1,0xc1,0x11,0x44,0xc1,0xc1,0x44,0x11,
    0xc0,0xc0,0x00,0x00,0xc0,0xc0,0x44,0x11,
    0xbf,0xbf,0xff,0xff,0xbf,0xbf,0x33,0xcc,
    0xbe,0xbe,0xee,0xbb,0xbe,0xbe,0x33,0xcc,
    0xbd,0xbd,0xdd,0x77,0xbd,0xbd,0x33,0xcc,
    0xbc,0xbc,0xcc,0x33,0xbc,0xbc,0x33,0xcc,
    0xbb,0xbb,0xbb,0xee,0xbb,0xbb,0x33,0xcc,
    0xba,0xba,0xaa,0xaa,0xba,0xba,0x33,0xcc,
    0xb9,0xb9,0x99,0x66,0xb9,0xb9,0x33,0xcc,
    0xb8,0xb8,0x88,0x22,0xb8,0xb8,0x33,0xcc,
    0xb7,0xb7,0x77,0xdd,0xb7,0xb7,0x33,0xcc,
    0xb6,0xb6,0x66,0x99,0xb6,0xb6,0x33,0xcc,
    0xb5,0xb5,0x55,0x55,0xb5,0xb5,0x33,0xcc,
    0xb4,0xb4,0x44,0x11,0xb4,0xb4,0x33,0xcc,
    0xb3,0xb3,0x33,0xcc,0xb3,0xb3,0x33,0xcc,
    0xb2,0xb2,0x22,0x88,0xb2,0xb2,0x33,0xcc,
    0xb1,0xb1,0x11,0x44,0xb1,0xb1,0x33,0xcc,
    0xb0,0xb0,0x00,0x00,0xb0,0xb0,0x33,0xcc,
    0xaf,0xaf,0xff,0xff,0xaf,0xaf,0x22,0x88,
    0xae,0xae,0xee,0xbb,0xae,0xae,0x22,0x88,
    0xad,0xad,0xdd,0x77,0xad,0xad,0x22,0x88,
    0xac,0xac,0xcc,0x33,0xac,0xac,0x22,0x88,
    0xab,0xab,0xbb,0xee,0xab,0xab,0x22,0x88,
    0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0x22,0x88,
    0xa9,0xa9,0x99,0x66,0xa9,0xa9,0x22,0x88,
    0xa8,0xa8,0x88,0x22,0xa8,0xa8,0x22,0x88,
    0xa7,0xa7,0x77,0xdd,0xa7,0xa7,0x22,0x88,
    0xa6,0xa6,0x66,0x99,0xa6,0xa6,0x22,0x88,
    0xa5,0xa5,0x55,0x55,0xa5,0xa5,0x22,0x88,
    0xa4,0xa4,0x44,0x11,0xa4,0xa4,0x22,0x88,
    0xa3,0xa3,0x33,0xcc,0xa3,0xa3,0x22,0x88,
    0xa2,0xa2,0x22,0x88,0xa2,0xa2,0x22,0x88,
    0xa1,0xa1,0x11,0x44,0xa1,0xa1,0x22,0x88,
    0xa0,0xa0,0x00,0x00,0xa0,0xa0,0x22,0x88,
    0x9f,0x9f,0xff,0xff,0x9f,0x9f,0x11,0x44,
    0x9e,0x9e,0xee,0xbb,0x9e,0x9e,0x11,0x44,
    0x9d,0x9d,0xdd,0x77,0x9d,0x9d,0x11,0x44,
    0x9c,0x9c,0xcc,0x33,0x9c,0x9c,0x11,0x44,
    0x9b,0x9b,0xbb,0xee,0x9b,0x9b,0x11,0x44,
    0x9a,0x9a,0xaa,0xaa,0x9a,0x9a,0x11,0x44,
    0x99,0x99,0x99,0x66,0x99,0x99,0x11,0x44,
    0x98,0x98,0x88,0x22,0x98,0x98,0x11,0x44,
    0x97,0x97,0x77,0xdd,0x97,0x97,0x11,0x44,
    0x96,0x96,0x66,0x99,0x96,0x96,0x11,0x44,
    0x95,0x95,0x55,0x55,0x95,0x95,0x11,0x44,
    0x94,0x94,0x44,0x11,0x94,0x94,0x11,0x44,
    0x93,0x93,0x33,0xcc,0x93,0x93,0x11,0x44,
    0x92,0x92,0x22,0x88,0x92,0x92,0x11,0x44,
    0x91,0x91,0x11,0x44,0x91,0x91,0x11,0x44,
    0x90,0x90,0x00,0x00,0x90,0x90,0x11,0x44,
    0x8f,0x8f,0xff,0xff,0x8f,0x8f,0x00,0x00,
    0x8e,0x8e,0xee,0xbb,0x8e,0x8e,0x00,0x00,
    0x8d,0x8d,0xdd,0x77,0x8d,0x8d,0x00,0x00,
    0x8c,0x8c,0xcc,0x33,0x8c,0x8c,0x00,0x00,
    0x8b,0x8b,0xbb,0xee,0x8b,0x8b,0x00,0x00,
    0x8a,0x8a,0xaa,0xaa,0x8a,0x8a,0x00,0x00,
    0x89,0x89,0x99,0x66,0x89,0x89,0x00,0x00,
    0x88,0x88,0x88,0x22,0x88,0x88,0x00,0x00,
    0x87,0x87,0x77,0xdd,0x87,0x87,0x00,0x00,
    0x86,0x86,0x66,0x99,0x86,0x86,0x00,0x00,
    0x85,0x85,0x55,0x55,0x85,0x85,0x00,0x00,
    0x84,0x84,0x44,0x11,0x84,0x84,0x00,0x00,
    0x83,0x83,0x33,0xcc,0x83,0x83,0x00,0x00,
    0x82,0x82,0x22,0x88,0x82,0x82,0x00,0x00,
    0x81,0x81,0x11,0x44,0x81,0x81,0x00,0x00,
    0x80,0x80,0x00,0x00,0x80,0x80,0x00,0x00
]) as ReadonlyUint8Array;

export default rmfont_charset;
