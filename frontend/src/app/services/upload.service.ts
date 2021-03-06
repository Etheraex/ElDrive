import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ZIFile } from '../models/zifile.model';
import { appUser } from '../models/appuser.model';
import { FileService } from './file.service';
import { CryptoAlgorithmsService } from './crypto.service';
import { EncryptionAlgorithms } from '../models/encryptionalgorithms.enum';
import { AuthService } from './auth.service';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar.component';
import { StatisticsService } from './statistics.service';

@Injectable({
	providedIn: 'root'
})
export class UploadService {

	fileData: File = null;
	byteArray: any;
	userInput: { algorithm: string, key: string };
	dialogRef;

	constructor(private fileService: FileService, private cryptoService: CryptoAlgorithmsService, private authService: AuthService, public dialog: MatDialog, private statisticsService: StatisticsService) { }

	chooseFile(data) {  //this is a bit confusing, maybe change to chooseAlgorithm or dialogResult
		this.userInput = data;
		const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
		fileUpload.click();
	}

	beginUpload(fileInput: any) {
		this.fileData = fileInput.target.files[0] as File;
		//progressbar here

		//when complete upload?
		if (this.check()) {
			setTimeout(() => this.showProgressBar(), 10);
			setTimeout(() => this.loadFile(), 15);
		}
	}

	showProgressBar(): void {
		this.dialogRef = this.dialog.open(ProgressBarComponent, {
			width: '300px',
			height: '120px',
			data: { value: 1, title: 'Reading file' }
		});
	}

	loadFile(): void {
		const reader = new FileReader();
		reader.readAsBinaryString(this.fileData);
		reader.onloadend = () => {
			// 20 MB
			this.fileService.getFiles(appUser.hash).subscribe(response => {
				if (!response.find(x => x.name == this.fileData.name)) {
					if (this.fileData.size < 20_971_520)
						setTimeout(() => this.upload(), 10);
					else {
						this.dialogRef.close();
						setTimeout(() => alert("Only files that are less than 20MB are currently supported"), 10);
					}
				}
				else {
					this.dialogRef.close();
					setTimeout(() => alert("File already uploaded"), 10);
				}
			});
		//	console.log(reader.result);
			this.byteArray = reader.result;
			this.dialogRef.componentInstance.data = { value: 10, title: 'Encrypting file' };
		}
	}

	encrypt(file) {
		switch (this.userInput.algorithm) {
			case "SimpleSubstitution":
				file.encryption = EncryptionAlgorithms.SimpleSubstitution;
				file.data = this.cryptoService.SimpleSubstitutionEncrypt(file.data);
				break;
			case "One-Time-Pad":
				file.encryption = EncryptionAlgorithms.OneTimePad;
				file.data = this.cryptoService.OneTimePad(file.data, this.userInput.key);
				break;
			case "TEA":
				file.encryption = EncryptionAlgorithms.TEA;
				file.data = this.cryptoService.TEAEncrypt(file.data, this.cryptoService.SHA_2(this.userInput.key).substr(0, 64));
				break;
			case "Knapsack":
				file.encryption = EncryptionAlgorithms.Knapsack;
				file.data = this.cryptoService.KnapsackEncrypt(file.data);
				break;
		}
	}

	upload() {
		appUser.usedSpace += this.fileData.size / 1_000_000_000;
		const file = new ZIFile();
		file.name = this.fileData.name;
		file.lastModified = new Date(this.fileData.lastModified);
		file.hash = appUser.hash;
		file.size = this.fileData.size / 1_000_000_000;
		file.haveAccess = new Array<string>();
		// const uint8 = new Uint8Array(this.byteArray);
		// uint8.forEach(x => {
		// 	file.data += String.fromCharCode(x);
		// });
		//this.fileData=this.byteArray;
		file.data=this.byteArray;
		this.encrypt(file);
		file.encryptionKey = this.userInput.key;
		file.filehash = this.cryptoService.SHA_2(file.data);
		this.dialogRef.componentInstance.data = { value: 60, title: 'Uploading file' };
		setTimeout(() => this.actualUpload(file), 1);
	}

	actualUpload(file: ZIFile) {
		this.fileService.postFile(file)
			.subscribe(() => {
				this.fileService.fileStream(appUser.hash);
				this.authService.updateUser(appUser).subscribe();
				file.data = "";
				this.dialogRef.componentInstance.data = { value: 100, title: 'Upload complete' };
				setTimeout(() => this.dialogRef.close(), 200);
			});
		this.statisticsService.postFile(file)
			.subscribe();
	}

	check(): boolean {
		if (appUser.usedSpace + (this.fileData.size / 1000000000) > appUser.plan.space)
			return false;
		return true;
	}
}

