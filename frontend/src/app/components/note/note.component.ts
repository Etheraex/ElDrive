import { EventEmitter,Component, OnInit, Input, Output } from '@angular/core';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

	constructor() { }

	@Input()
	note : Note;
	reedonly : boolean = true;

	@Output()
	saveEvent : EventEmitter<void> = new EventEmitter();

	@Output()
	deleteEvent : EventEmitter<Note> = new EventEmitter();
	ngOnInit() {
	}


	onSave(){
		this.saveEvent.emit();
	}
	onDelete(){
		this.deleteEvent.emit(this.note)
	}
}
