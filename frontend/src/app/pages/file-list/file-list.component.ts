import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { FileService } from 'src/app/services/file.service';
import { ZIFile } from 'src/app/models/zifile.model';
import { CryptoAlgorithmsService } from 'src/app/services/crypto.service';
import { AuthService } from 'src/app/services/auth.service';
import { appUser } from 'src/app/models/appuser.model';

@Component({
	selector: 'app-file-list',
	templateUrl: './file-list.component.html',
	styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

	displayFiles: MatTableDataSource<ZIFile>;
	displayedColumns: string[] = ["name", "lastModified", "size", "action"];

	constructor(private fileService: FileService, private cryptoService: CryptoAlgorithmsService, private authService: AuthService) {
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

	onDownload(id: string) {
		this.fileService.downloadFile(id).subscribe(response => {
			// decryption should be based on the `encryption` property of `response` not hard coded to `SimpleSubstitution`
			const arrayBuffer = this.base64ToArrayBuffer(this.cryptoService.SimpleSubstitutionDecrypt(response.data));
			this.createAndDownloadBlobFile(arrayBuffer, response.name);
		});
	}

	base64ToArrayBuffer(base64: string) { /* check wtf is base64/binaryStrin/string in js */
		// const binaryString = atob(base64);
		const bytes = new Uint8Array(base64.length);
		return bytes.map((byte, i) => base64.charCodeAt(i));
	}

	createAndDownloadBlobFile(body, fileName/*, extension = 'pdf'*/) {
		const blob = new Blob([body]);
		//const fileName = `${filename}.${extension}`;
		if (navigator.msSaveBlob) {
			// IE 10+
			navigator.msSaveBlob(blob, fileName);
		} else {
			const link = document.createElement('a');
			// Browsers that support HTML5 download attribute
			if (link.download !== undefined) {
				const url = URL.createObjectURL(blob);
				link.setAttribute('href', url);
				link.setAttribute('download', fileName);
				link.style.visibility = 'hidden';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		}
	}

	onDelete(id: string, size: number) {
		this.fileService.deleteFile(id).subscribe(() => {
			this.fileService.getFiles();
			this.updateUserFreeSpace(size);
		});
	}

	updateUserFreeSpace(size: number) {
		appUser.usedSpace -= size;
		if (appUser.usedSpace < 0)
			appUser.usedSpace = 0;
		this.authService.updateUser(appUser).subscribe();
	}
}
