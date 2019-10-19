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
	serverResponse: string;

	constructor(private fileService: FileService, private authService: AuthService) { }

	getFiles() {
		this.fileService.getFiles()
			.pipe(map(
				(response) => {
					return atob(response);
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

}
