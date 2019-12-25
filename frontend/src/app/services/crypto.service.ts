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
	public OneTimePad(data: string, pad: string): string { //change to string.charcodeat
		let output = "";
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

	private LeftRotate(n: number, count: number): number {
		return (n << count) | (n >>> (32 - count));
	}

	private RightRotate(n: number, count: number): number {
		return ((n >>> count) | (n << 32 - count));
	}

	private _add(x, y) {
		const lsw = (x & 0xFFFF) + (y & 0xFFFF);
		const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
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

			for (let j = 0; j < 16; j++)
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

	//#region SHA-2
	public SHA_2(data: string): string {
		let h0 = 0x6a09e667;
		let h1 = 0xbb67ae85;
		let h2 = 0x3c6ef372;
		let h3 = 0xa54ff53a;
		let h4 = 0x510e527f;
		let h5 = 0x9b05688c;
		let h6 = 0x1f83d9ab;
		let h7 = 0x5be0cd19;

		const k =
			[
				0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
				0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
				0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
				0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
				0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
				0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
				0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
				0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
			];

		let a, b, c, d, e, f, g, h, ch, temp1, temp2, s0, s1, maj;
		let w = new Array(64);
		let len = data.length * 8;
		let bin = this.ChunkMessage(data);

		// Always append bit 1 to message when working with files
		bin[len >> 5] |= 0x80 << (24 - len % 32);
		// Appends k zeros using JS undefined and then appends message length in big-endian
		bin[((len + 64 >> 9) << 4) + 15] = len;

		// For each 512bit chunk
		for (let i = 0; i < bin.length; i += 16) {
			for (let j = 0; j < 64; j++)
				if (w[j] === undefined)
					w[j] = 0;

			for (let j = 0; j < 16; j++)
				w[j] = bin[i + j];

			for (let j = 16; j < 64; j++) {
				s0 = this.RightRotate(w[j - 15], 7) ^ this.RightRotate(w[j - 15], 18) ^ (w[j - 15] >>> 3);
				s1 = this.RightRotate(w[j - 2], 17) ^ this.RightRotate(w[j - 2], 19) ^ (w[j - 2] >>> 10);
				w[j] = this._add(this._add(this._add(w[j - 16], s0), w[j - 7]), s1);
			}

			a = h0;
			b = h1;
			c = h2;
			d = h3;
			e = h4;
			f = h5;
			g = h6;
			h = h7;

			for (let j = 0; j < 64; j++) {
				s1 = this.RightRotate(e, 6) ^ this.RightRotate(e, 11) ^ this.RightRotate(e, 25);
				ch = (e & f) ^ ((~e) & g);
				temp1 = this._add(this._add(this._add(h, s1), this._add(ch, k[j])), w[j]);
				s0 = this.RightRotate(a, 2) ^ this.RightRotate(a, 13) ^ this.RightRotate(a, 22);
				maj = (a & b) ^ (a & c) ^ (b & c);
				temp2 = this._add(s0, maj);

				h = g;
				g = f;
				f = e;
				e = this._add(d, temp1);
				d = c;
				c = b;
				b = a;
				a = this._add(temp1, temp2);
			}

			h0 = this._add(h0, a);
			h1 = this._add(h1, b);
			h2 = this._add(h2, c);
			h3 = this._add(h3, d);
			h4 = this._add(h4, e);
			h5 = this._add(h5, f);
			h6 = this._add(h6, g);
			h7 = this._add(h7, h)
		}

		return this.BinaryToHex(this.dec2bin(h0, 32) +
			this.dec2bin(h1, 32) +
			this.dec2bin(h2, 32) +
			this.dec2bin(h3, 32) +
			this.dec2bin(h4, 32) +
			this.dec2bin(h5, 32) +
			this.dec2bin(h6, 32) +
			this.dec2bin(h7, 32));
	}
	//#region

	//#region TEA
	private TEAChunk(data: string): Array<any> {
		let binary = new Array(data.length >> 2);
		binary.forEach(x => {
			x = 0;
		});

		for (let i = 0; i < data.length * 8; i += 8)
			binary[i >> 5] |= (data.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);

		return binary;
	}

	public TEADecrypt(data, k) {
		k = this.TEAChunk(k);
		let delta = 0x9e3779b9;
		let chunks = this.TEAChunk(data);
		
		for (let j = 0; j < chunks.length; j += 2) {
			let sum = 0xc6ef3720;
			let v0 = chunks[j], v1 = chunks[j + 1];
			let k0 = k[0], k1 = k[1], k2 = k[2], k3 = k[3];
			for (let i = 0; i < 32; i++) {
				v1 -= this._add((v0 << 4), k2) ^ this._add(v0, sum) ^ this._add((v0 >>> 5), k3);
				v0 -= this._add((v1 << 4), k0) ^ (this._add(v1, sum)) ^ (this._add((v1 >>> 5), k1));
				sum -= delta;
			}
			chunks[j] = v0;
			chunks[j + 1] = v1;
		}
	
		if(chunks[chunks.length-1]==0)
			chunks.pop();

		return this.ReturnToString(chunks);
	};

	public TEAEncrypt(data, k): string {
		k = this.TEAChunk(k);
		let delta = 0x9e3779b9;
		
		let chunks = this.TEAChunk(data);
		if (chunks.length % 2)
			chunks.push(0);

		for (let j = 0; j < chunks.length; j += 2) {
			let sum = 0;
			let v0 = chunks[j], v1 = chunks[j + 1];
			let k0 = k[0], k1 = k[1], k2 = k[2], k3 = k[3];
			for (let i = 0; i < 32; i++) {
				sum = this._add(sum, delta);
				v0 = this._add(v0, (this._add((v1 << 4), k0)) ^ (this._add(v1, sum)) ^ (this._add((v1 >>> 5), k1)));
				v1 = this._add(v1, (this._add((v0 << 4), k2) ^ this._add(v0, sum) ^ this._add((v0 >>> 5), k3)));
			}
			chunks[j] = v0;
			chunks[j + 1] = v1;
		}
		return this.ReturnToString(chunks);
	};

	private ReturnToString(chunks): string {
		let data = "";
		chunks.forEach(x => {
			let tmp = this.dec2bin(x, 32);
			for (let i = 0; i < 4; i++) {
				data += String.fromCharCode(parseInt(tmp.substr(i * 8, 8), 2));
			}
		});
		return data;
	}
	//#region 
}