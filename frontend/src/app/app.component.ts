import { Component } from '@angular/core';
import { RoundingUtility } from './utilities/rounding.utility';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(private roundingUtility: RoundingUtility) {
		console.log(roundingUtility.round(0.0190000234, 2));
	}

}
