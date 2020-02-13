import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class RoundingUtility {
    
    round(value: number, numberOfDigits: number): number {
        return Number((value).toFixed(numberOfDigits));
    }

    
}