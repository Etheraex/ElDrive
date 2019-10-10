import { Component } from '@angular/core';
import { FileService } from './services/file.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	fileName: string;

	constructor(private fileService: FileService) {

	}

	onClick() {
		this.fileService.getFiles()
			.subscribe((response) => {
				this.fileName = response;
				console.log(response);
			},
			(error) => {
				console.log(error);
			});
	}
}
