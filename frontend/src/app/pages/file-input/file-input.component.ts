import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { CryptoAlgorithmsService } from 'src/app/services/crypto.service';

@Component({
    selector: 'app-file-input',
    templateUrl: './file-input.component.html',
    styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {

    fileData: File = null;
    byteArray: ArrayBuffer;
    encryptedMessage: string;

    set message(value) {
        this.encryptMessage(value);
    }

    constructor(private fileService: FileService, private cryptoService: CryptoAlgorithmsService) { }

    fileProgress(fileInput: any) {
        this.fileData = fileInput.target.files[0] as File;

        const reader = new FileReader();
        reader.readAsArrayBuffer(this.fileData);
        reader.onloadend = () => {
            this.byteArray = reader.result as ArrayBuffer;
        };
    }

    onSubmit() {
        this.fileService.postFile(this.byteArray)
            .subscribe(response => {
                console.log(response);
                alert('SUCCESS !!');
            });
    }
    
    encryptMessage(msg: string){
        this.encryptedMessage = this.cryptoService.SimpleSubstitution(msg);
    }

    ngOnInit() {
    }
}
