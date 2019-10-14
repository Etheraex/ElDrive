import { Component } from '@angular/core';
import { FileService } from './services/file.service';
import { map } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	fileName: string;

	constructor(private fileService: FileService, private authService: AuthService) { }

	onClick() {
		this.fileService.getFiles()
			.pipe(map(
				(response) => {
					return this.shiftByNRight([...atob(response)].slice(), 4);
				}))
			.subscribe(
				(response) => {
					this.fileName = response.toString();
				},
				(error) => {
					console.log('Error' + error);
				});
	}

	onAuthentication() {
		this.authService.authenticateUser()
			.subscribe((response) => console.log(response));
	}

	private shiftByNRight(input: string[], n: number): string {
		if (n === 0) {
			return input.join('');
		}
		const tmp = input[input.length - 1];
		for (let i = input.length - 1; i > 0; i--) {
			input[i] = input[i - 1];
		}
		input[0] = tmp;
		return this.shiftByNRight(input.slice(), --n);
	}

}
