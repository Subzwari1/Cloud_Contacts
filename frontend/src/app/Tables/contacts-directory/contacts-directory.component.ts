import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Contact } from 'src/app/Dtos/Contact';
import { AuthService } from 'src/app/Services/auth.service';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-contacts-directory',
  templateUrl: './contacts-directory.component.html',
  styleUrls: ['./contacts-directory.component.css']
})
export class ContactsDirectoryComponent {

  users: Contact[] = [];
  searchInput:string=''
  constructor(private contactsService:ContactService,
    private authService:AuthService) { }

  ngOnInit() {
    const id = this.authService.getLoginInfo();
    if (id)
    this.contactsService.getContacts(parseInt(id))
    .subscribe(response=>{this.users=response; console.log(response)});
  }

  clear(table: Table) {
    this.searchInput = '';
    table.clear();
  }
  
}
