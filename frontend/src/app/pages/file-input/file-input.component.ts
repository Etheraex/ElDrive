import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
    selector: 'app-file-input',
    templateUrl: './file-input.component.html',
    styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {

    fileData: File = null;
    byteArray: ArrayBuffer;

    constructor(private fileService: FileService) { }

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

    ngOnInit() {
    }
}
