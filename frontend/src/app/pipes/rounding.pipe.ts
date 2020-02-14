import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'round' })
export class RoundPipe implements PipeTransform {
	transform(value: number, digits: number = 2): string {
		let rounds: number = 0;
		
		while (value < 1) {
			value = value * 1000;
			rounds++;
		}
		value = Number((value).toFixed(digits));
		let toReturn: string;
		switch(rounds) {
			case 0:
				toReturn = value.toString() + " GB";
				break;
			case 1:
				toReturn = value.toString() + " MB";
				break;
			case 2:
				toReturn = value.toString() + " KB";
				break;
			case 3:
				toReturn = value.toString() + " B";
				break;
		}
		return toReturn;
	}
}