import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CryptoAlgorithmsService {
                               /*ABCDEFGHIJKLMNOPQRSTUVWXYZ*/
    private scrambledAlphabet = 'DGUASMZERBCIHVYPKXQNTFWLOJ';

    public SimpleSubstitution(plainMessage: string): string {
        const scrambledAlphabetArray: string[] = [...this.scrambledAlphabet];
        let output = '';
        [...(plainMessage.toUpperCase())].forEach(x => output += scrambledAlphabetArray[x.codePointAt(0) - 65]);
        return output;
    }
}