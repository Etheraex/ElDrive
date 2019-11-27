import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CryptoAlgorithmsService {
	/*ABCDEFGHIJKLMNOPQRSTUVWXYZ*/
	private scrambledAlphabet = 'DGUASMZERBCIHVYPKXQNTFWLOJ';
	private counter: number;
	public SimpleSubstitution(plainMessage: string): string {
		const scrambledAlphabetArray: string[] = [...this.scrambledAlphabet];
		let output = '';
		[...(plainMessage.toUpperCase())].forEach(x => output += scrambledAlphabetArray[x.codePointAt(0) - 65]);
		return output;
	}
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
		this.counter = null;
		[...(data)].forEach(char => output += String.fromCharCode(char.codePointAt(0) ^ this.CircularTraverse(pad).codePointAt(0)));
		return output;
	}
}