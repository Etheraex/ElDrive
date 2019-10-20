import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileService } from './services/file.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { FileInputComponent } from './components/file-input/file-input.component';

@NgModule({
    declarations: [
        AppComponent,
        FileInputComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [FileService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }
