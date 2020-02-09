import { Injectable } from '@angular/core';

import { ZIFile } from '../models/zifile.model';
import { appUser } from '../models/appuser.model';
import { FileService } from './file.service';
import { CryptoAlgorithmsService } from './crypto.service';
import { EncryptionAlgorithms } from '../models/encryptionalgorithms.enum';
import { AuthService } from './auth.service';
import { StatisticsService } from './statistics.service';

@Injectable({
	providedIn: 'root'
})
export class UploadService {

	fileData: File = null;
	byteArray: ArrayBuffer;
	userInput: { algorithm: string, key: string };

	constructor(private fileService: FileService
		, private cryptoService: CryptoAlgorithmsService
		, private authService: AuthService
		,private statisticsService : StatisticsService) { }

	chooseFile(data) {
		this.userInput = data;
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
		appUser.usedSpace += this.fileData.size / 1000000000;
		const file = new ZIFile();
		file.name = this.fileData.name;
		file.lastModified = new Date(this.fileData.lastModified);
		file.hash = appUser.hash;
		file.size = this.fileData.size / 1000000000;
		const uint8 = new Uint8Array(this.byteArray);
		uint8.forEach(x => {
			file.data += String.fromCharCode(x);
		});
		this.encrypt(file);
		file.encryptionKey = this.userInput.key;
		file.filehash = this.cryptoService.SHA_2(file.data);
		this.fileService.postFile(file)
			.subscribe(() => {
				this.fileService.getFiles(appUser.hash);
				this.authService.updateUser(appUser).subscribe();
				file.data = "";
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