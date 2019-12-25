import { Injectable } from '@angular/core';

import { ZIFile } from '../models/zifile.model';
import { appUser } from '../models/appuser.model';
import { FileService } from './file.service';
import { CryptoAlgorithmsService } from './crypto.service';
import { EncryptionAlgorithms } from '../models/encryptionalgorithms.enum';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class UploadService {

	fileData: File = null;
	byteArray: ArrayBuffer;

	constructor(private fileService: FileService, private cryptoService: CryptoAlgorithmsService, private authService: AuthService) { }

	chooseFile() {
		const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
		fileUpload.click();
	}

	beginUpload(fileInput: any) {
		this.fileData = fileInput.target.files[0] as File;
		if (this.check()) {
			const reader = new FileReader();
			reader.readAsArrayBuffer(this.fileData);
			reader.onloadend = () => {
				this.byteArray = reader.result as ArrayBuffer;
				this.upload();
			};
		}
	}

	upload() {
		appUser.usedSpace += this.fileData.size / 1000000000;
		const file = new ZIFile();
		file.name = this.fileData.name;
		file.lastModified = new Date(this.fileData.lastModified);
		file.hash = appUser.hash;
		file.size = this.fileData.size / 1000000000;
		/* should be based on user choice not hard coded to SimpleSubstitution */
		file.encryption = EncryptionAlgorithms.SimpleSubsitution;
		const uint8 = new Uint8Array(this.byteArray);
		uint8.forEach(x => {
			file.data += String.fromCharCode(x);
		});
	
		file.data = this.cryptoService.SHA_1(file.data);
		console.log(file.data);
		// this.fileService.postFile(file)
		// 	.subscribe(() => {
		// 		this.fileService.getFiles();
		// 		this.authService.updateUser(appUser).subscribe();
		// 		file.data = "";
		// 	});
	}

	check(): boolean {
		if (appUser.usedSpace + (this.fileData.size / 1000000000) > appUser.plan.space)
			return false;
		return true;
	}
}