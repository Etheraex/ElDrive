import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { FileService } from 'src/app/services/file.service';
import { ZIFile } from 'src/app/models/zifile.model';
import { CryptoAlgorithmsService } from 'src/app/services/crypto.service';
import { AuthService } from 'src/app/services/auth.service';
import { appUser, AppUser } from 'src/app/models/appuser.model';
import { EncryptionAlgorithms } from 'src/app/models/encryptionalgorithms.enum';
import { StatisticsService } from 'src/app/services/statistics.service';
import { CookieService } from 'src/app/services/cookie.service';
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
			appUser.updateUser(user);
			this.fileService.fileStream(appUser.hash);
			this.fileService.getSharedFiles(appUser.hash).subscribe(response => {
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
			default:
				return file.data;
		}
	}

	myFilesFilter(filterValue: string) {
		this.myFiles.filter = filterValue.trim().toLowerCase();
	}

	sharedFilesFilter(filterValue: string) {
		this.sharedFiles.filter = filterValue.trim().toLowerCase();
	}

	onDownload(id: string) {
		this.fileService.downloadFile(id).subscribe(response => {
			console.log(response);
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

	string2uint8(data){
		let retval = new Uint8Array(data.length);
		let i=0;
		[...data].forEach(element => {
			retval[i++]= element.charCodeAt(0);
		});
		console.log(retval);
		return retval;
	}
	createAndDownloadBlobFile(body, fileName) {
		const blob = new Blob([this.string2uint8(body)]);
		
		//console.log(blob.arrayBuffer());
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
		this.authService.getUsers().subscribe(response => {
			// filter to ignore currently logged in user
			const users = response.filter(x => x.hash != appUser.hash);
			if (users.length) {
				const dialogRef = this.dialog.open(ShareDialogComponent, { data: { file: file, users: users } });
			}
		});
	}

	onDelete(file :ZIFile ) {
		this.fileService.deleteFile(file.id).subscribe(() => {
			this.fileService.fileStream(appUser.hash);
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
