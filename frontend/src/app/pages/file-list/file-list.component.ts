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

	displayFiles: MatTableDataSource<ZIFile>;
	displayedColumns: string[] = ["id", "name", "lastModified", "action"];

	constructor(private fileService: FileService) {
		this.fileService.files.subscribe(response => {
			this.displayFiles = new MatTableDataSource(response);
		});
	}

	ngOnInit() {
		this.fileService.getFiles();
	}

	applyFilter(filterValue: string) {
		this.displayFiles.filter = filterValue.trim().toLowerCase();
	}

	onDownload() {
		console.log("download");
	}

	onDelete(id: number) {
		this.fileService.deleteFile(id).subscribe(() => this.fileService.getFiles());
	}
}
