import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { FileService } from 'src/app/services/file.service';
import { ZIFile } from 'src/app/models/zifile.model';
import { CryptoAlgorithmsService } from 'src/app/services/crypto.service';
import { AuthService } from 'src/app/services/auth.service';
import { appUser, AppUser } from 'src/app/models/appuser.model';
import { EncryptionAlgorithms } from 'src/app/models/encryptionalgorithms.enum';
import { StatisticsService } from 'src/app/services/statistics.service';
import { CookieService } from 'src/app/services/cookie.service';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from 'src/app/components/share-dialog/share-dialog.component';

@Component({
	selector: 'app-file-list',
	templateUrl: './file-list.component.html',
	styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

	myFiles: MatTableDataSource<ZIFile>;
	sharedFiles: MatTableDataSource<ZIFile>;
	displayedColumns: string[] = ["name", "lastModified", "size", "action"];

	constructor(private fileService: FileService, private cryptoService: CryptoAlgorithmsService, private authService: AuthService,
		private statisticsService : StatisticsService, private cookieService: CookieService, private dialog: MatDialog) {
		this.fileService.files.subscribe(response => {
			this.myFiles = new MatTableDataSource(response);
		});
	}

	ngOnInit() {
		this.authService.getUserFromName(this.cookieService.getCookie()).subscribe((user: AppUser) => {
			appUser.name = user.name;
			appUser.id = user.id;
			appUser.plan = user.plan;
			appUser.usedSpace = user.usedSpace;
			appUser.hash = user.hash;
			appUser.password = user.password;
			appUser.planChosen = user.planChosen;
			appUser.planExpires = user.planExpires;
			this.fileService.getFiles(appUser.hash);
			this.fileService.getSharedFiles(appUser.hash).subscribe(response => {
				console.log(response)
				this.sharedFiles = new MatTableDataSource(response);
			});
		});
	}

	decrypt(file: ZIFile) {
		switch (file.encryption) {
			case EncryptionAlgorithms.SimpleSubstitution:
				return this.cryptoService.SimpleSubstitutionDecrypt(file.data);
			case EncryptionAlgorithms.OneTimePad:
				return this.cryptoService.OneTimePad(file.data, file.encryptionKey);
			case EncryptionAlgorithms.TEA:
				return this.cryptoService.TEADecrypt(file.data, this.cryptoService.SHA_2(file.encryptionKey).substr(0, 64));
			case EncryptionAlgorithms.Knapsack:
				return this.cryptoService.KnapsackDecrypt(file.data);
		}
	}

	applyFilter(filterValue: string) {
		this.myFiles.filter = filterValue.trim().toLowerCase();
	}

	onDownload(id: string) {
		this.fileService.downloadFile(id).subscribe(response => {
			const arrayBuffer = this.decrypt(response);
			this.createAndDownloadBlobFile(arrayBuffer, response.name);
		}, error => {
			alert("File has been deleted by its owner");
			this.fileService.getSharedFiles(appUser.hash).subscribe(response => {
				this.sharedFiles = new MatTableDataSource(response);
			});
		});
	}

	base64ToArrayBuffer(base64: string) {
		const bytes = new Uint8Array(base64.length);
		return bytes.map((byte, i) => base64.charCodeAt(i));
	}

	createAndDownloadBlobFile(body, fileName) {
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

	onShare(file: ZIFile) {
		const dialogRef = this.dialog.open(ShareDialogComponent, { data: file });
	}

	onDelete(file :ZIFile ) {
		this.fileService.deleteFile(file.id).subscribe(() => {
			this.fileService.getFiles(appUser.hash);
			this.updateUserFreeSpace(file.size);
		});
		this.statisticsService.deleteFile(file).subscribe();
	}

	updateUserFreeSpace(size: number) {
		appUser.usedSpace -= size;
		if (appUser.usedSpace < 0)
			appUser.usedSpace = 0;
		this.authService.updateUser(appUser).subscribe();
	}
}
