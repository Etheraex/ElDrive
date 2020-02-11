import { Component, OnInit, Input, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { this.tmpdata=data;}
  mode = 'determinate';
  tmpdata;

  ngOnInit() {
    this.tmpdata.value=0;
  }

}
