import { Injectable } from '@angular/core';
import * as gen from 'random-seed';

export const Algorithms: String[] = [
	"SimpleSubstitution",
	"One-Time-Pad"
];

@Injectable({
	providedIn: 'root'
})
export class CryptoAlgorithmsService {

	private shufledAlphabet = 'V=O5!&YSZayUP-*8`%<ql?+M"3khp/,jD6RX$#(Go.Kv}\\|BTb4~JgH;>nLcftdwmCIs)N^0Q[: \'WrieF]9x7_@1AE{z2u';
	private plainAlphabetMap: Map<string, string>;
	private shufledAlphabetMap: Map<string, string>;
	private counter: number;

	constructor() {
		this.generateAlphabetMap();
	}

	//#region SimpleSubsitution
	public generateAlphabetMap(): void {
		const plainAlphabetMap = new Map<string, string>();
		const shufledAlphabetMap = new Map<string, string>();

		let i = 32;
		[...this.shufledAlphabet].forEach(character => {
			plainAlphabetMap.set(String.fromCharCode(i), character);
			shufledAlphabetMap.set(character, String.fromCharCode(i));
			i++;
		});
		this.plainAlphabetMap = plainAlphabetMap;
		this.shufledAlphabetMap = shufledAlphabetMap;
	}

	public SimpleSubstitutionEncrypt(data: string): string {
		let output = '';
		[...data].forEach(x => {
			if (this.plainAlphabetMap.get(x))
				output += this.plainAlphabetMap.get(x);
			else
				output += x;
		});
		return output;
	}

	public SimpleSubstitutionDecrypt(data: string): string {
		let output = '';
		[...data].forEach(x => {
			if (this.shufledAlphabetMap.get(x))
				output += this.shufledAlphabetMap.get(x);
			else
				output += x;
		});
		return output;
	}
	//#endregion

	//#region OneTimePad
	private CircularTraverse(data: string): string {
		if (!this.counter) {
			this.counter = 0;
		}
		const retval = data[(this.counter) % data.length];
		this.counter++;
		return retval;
	}


	public OneTimePad(data: string, pad: string): string { //change to string.charcodeat
		let output = "";
		let rand = gen.create(pad);
		console.log(rand(255));
		this.counter = null;
		[...(data)].forEach((char, index) => output += String.fromCharCode(char.codePointAt(0) ^ gen.create(pad + index)(255)));
		return output;
	}


	//#endregion

	//#region SHA_1
	private dec2bin(dec, len) {
		let retval = (dec >>> 0).toString(2);
		let missing = len - retval.length;
		let leadingZeros = "";
		for (let i = 0; i < missing; i++) {
			leadingZeros += "0";
		}

		return (leadingZeros + retval);
	}

	/**
	 * Chunk input into 512bit items
	 * @param data - file contents
	 */
	private ChunkMessage(data: string): Array<any> {
		// Array of chunks initialized with the number of words
		// data.length is the number of 8bit characters
		let binary = new Array(data.length >> 2);
		binary.forEach(x => {
			x = 0;
		});

		for (let i = 0; i < data.length * 8; i += 8)
			// Conversion to big-endian from small-endian
			binary[i >> 5] |= (data.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);

		return binary;
	}

	private rawToBinary(raw) {
		var binary = new Array(raw.length >> 2);
		for (var i = 0, il = binary.length; i < il; i++) {
			binary[i] = 0;
		}
		for (i = 0, il = raw.length * 8; i < il; i += 8) {
			binary[i >> 5] |= (raw.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
		}
		return binary;
	}

	private BreakChunk(data: string): Array<number> {
		let retval = Array<number>();
		let counter = 0;
		let internal = "";
		[...data].forEach(x => {
			internal += x;
			counter += 8;
			if (counter == 32) {
				let innerRetVal = "";
				[...this.StringToBigEndian(internal)].forEach(x => {
					innerRetVal += this.dec2bin(x.charCodeAt(0), 32);
				});
				retval.push(parseInt(innerRetVal, 2));
				counter = 0;
				internal = "";
			}
		});
		return retval;
	}

	private StringToBigEndian(data: string): string {
		let charCodes = [];
		[...data].forEach(x => {
			charCodes.push(x.charCodeAt(0));
		});
		let retval = "";
		for (let i = 0; i < 4; i++) {
			retval += String.fromCharCode(charCodes[3 - i]);
		}
		return retval;
	}

	private LeftRotate(n: number, count: number): number {
		return (n << count) | (n >>> (32 - count));
	}

	private _add(x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}

	public SHA_1(data: string): string {
		let h0 = 1732584193; 	// h0 = 0x67452301
		let h1 = -271733879;  	// h1 = 0xEFCDAB89
		let h2 = -1732584194; 	// h2 = 0x98BADCFE
		let h3 = 271733878;  	// h3 = 0x10325476
		let h4 = -1009589776; 	// h4 = 0xC3D2E1F0
		let a, b, c, d, e, f, k, temp;
		let w = new Array(80);
		let len = data.length * 8;
		let bin = this.ChunkMessage(data);

		// Always append bit 1 to message when working with files
		bin[len >> 5] |= 0x80 << (24 - len % 32);
		// Appends k zeros using JS undefined and then appends message length in big-endian
		bin[((len + 64 >> 9) << 4) + 15] = len;

		for (let i = 0; i < bin.length; i += 16) {
			a = h0;
			b = h1;
			c = h2;
			d = h3;
			e = h4;

			for (var j = 0; j < 16; j++) //change this to be reasonable
				w[j] = bin[i + j];

			for (let j = 16; j < 80; j++)
				w[j] = (this.LeftRotate(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1));

			for (let j = 0; j < 80; j++) {
				if (0 <= j && j <= 19) {
					f = (b & c) | (~b & d);
					k = 1518500249; //0x5A827999
				} else if (20 <= j && j <= 39) {
					f = b ^ c ^ d;
					k = 1859775393;//0x6ED9EBA1
				} else if (40 <= j && j <= 59) {
					f = (b & c) | (b & d) | (c & d);
					k = -1894007588;//0x8F1BBCDC
				} else {
					f = b ^ c ^ d;
					k = -899497514;//0xCA62C1D6
				}
				temp = this._add(this._add(this._add(this._add(this.LeftRotate(a, 5), f), e), k), w[j]);
				e = d;
				d = c;
				c = this.LeftRotate(b, 30);
				b = a;
				a = temp;
			}
			h0 = this._add(h0, a);
			h1 = this._add(h1, b);
			h2 = this._add(h2, c);
			h3 = this._add(h3, d);
			h4 = this._add(h4, e);
		}
		return this.BinaryToHex(this.dec2bin(h0, 32) + this.dec2bin(h1, 32) + this.dec2bin(h2, 32) + this.dec2bin(h3, 32) + this.dec2bin(h4, 32));
	}

	private BinaryToHex(data: string): string {
		let retval = "";
		for (let i = 0; i < data.length; i += 4) {
			retval += (parseInt(data.substr(i, 4), 2).toString(16));
		}
		return retval;
	}
	//#endregion
}