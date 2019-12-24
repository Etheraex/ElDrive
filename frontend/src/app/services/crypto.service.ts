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


	public OneTimePad(data: string, pad: string): string { //do not accept pad, create random
		let output = "";
		let rand = gen.create(pad);
		console.log(rand(255));
		this.counter = null;
		[...(data)].forEach((char, index) => output += String.fromCharCode(char.codePointAt(0) ^ gen.create(pad+index)(255)));
		return output;
	}
	//#endregion

}