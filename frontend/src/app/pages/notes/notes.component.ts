import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CryptoAlgorithmsService } from 'src/app/services/crypto.service';
import { AuthService } from 'src/app/services/auth.service';
import { appUser, AppUser } from 'src/app/models/appuser.model';
import { CookieService } from 'src/app/services/cookie.service';
import { NoteService } from 'src/app/services/note.service';
import { NoteCollection } from 'src/app/models/noteCollecion.model';
import { Note } from 'src/app/models/note.model';

@Component({
	selector: 'app-notes',
	templateUrl: './notes.component.html',
	styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

	notesCollecion: NoteCollection;


	constructor(private cryptoService: CryptoAlgorithmsService, private authService: AuthService, private cookieService: CookieService,
		private noteService: NoteService, private cd: ChangeDetectorRef) {
		this.notesCollecion = new NoteCollection();
	}

	ngOnInit() {
		this.authService.getUserFromName(this.cookieService.getCookie()).subscribe((user: AppUser) => {
			appUser.name = user.name;
			appUser.id = user.id;
			appUser.plan = user.plan;
			appUser.usedSpace = user.usedSpace;
			appUser.hash = user.hash;
			appUser.password = user.password;
			appUser.noteCollecionId = user.noteCollecionId;
			this.noteService.getNotes(appUser.noteCollecionId).subscribe(response => {
				this.notesCollecion = response
				console.log(this.notesCollecion);
			});
		});
	}
	saveChanges() {
		this.noteService.updateNotes(this.notesCollecion).subscribe();
	}

	deleteNote(note: Note) {
		let index = this.notesCollecion.notes.indexOf(note);
		if (index !== -1) {
			this.notesCollecion.notes.splice(index, 1);
		}
		this.saveChanges();
	}

	addNote() {
		this.notesCollecion.notes.unshift(new Note());
		this.saveChanges();
	}

}
