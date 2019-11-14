import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { MatTableDataSource } from '@angular/material/table';
import { ZIFile } from 'src/app/models/zifile.model';

@Component({
	selector: 'app-file-list',
	templateUrl: './file-list.component.html',
	styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

	files: ZIFile[];
	displayFiles: MatTableDataSource<ZIFile>;
	displayedColumns: string[] = ["id", "name", "action"];

	constructor(private fileService: FileService) { }

	ngOnInit() {
		this.getFiles();
	}

	getFiles() {
		this.fileService.getFiles().subscribe(
			response => {
				this.files = response;
				this.displayFiles = new MatTableDataSource(response as ZIFile[]);
			});
	}

	applyFilter(filterValue: string) {
		this.displayFiles.filter = filterValue.trim().toLowerCase();
	}

	onDownload() {
		console.log("download");
	}

	onDelete() {
		console.log("delete");
	}
}
