import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Contact } from 'src/app/Dtos/Contact';

@Component({
  selector: 'app-contacts-directory',
  templateUrl: './contacts-directory.component.html',
  styleUrls: ['./contacts-directory.component.css']
})
export class ContactsDirectoryComponent {

  users: Array<Contact> = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Contact[]>("http://localhost:8000/contacts")
    .subscribe(response=>{this.users=response; console.log(response)});
  }
}
