import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { appUser } from '../../models/appuser.model'

@Component({
	selector: 'app-file-list',
	templateUrl: './file-list.component.html',
	styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

	files: any;

	constructor(private fileService: FileService) {

	}

	ngOnInit() {
		this.fileService.getFiles().subscribe(
			response => {
				this.files = response;
			});
	}

}
