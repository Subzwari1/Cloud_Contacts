import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Contact } from 'src/app/Dtos/Contact';
import { AuthService } from 'src/app/Services/auth.service';
import { ContactService } from 'src/app/Services/contact.service';
import Swal from 'sweetalert2';

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
    this.getContacts();
  }
  getContacts()
  {
    const id = this.authService.getLoginInfo();
    if (id)
    this.contactsService.getContacts(parseInt(id))
    .subscribe(response=>{this.users=response; console.log(response)});
  }

  clear(table: Table) {
    this.searchInput = '';
    table.clear();
  }
  passToTrash(contactId:number)
  {
    Swal.fire({
      title: "Are you sure you want delete the contact?",
      text: "This contact will be move it to the trash can in case you want to revert it",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, move to trash!"
    }).then((result) => {
      if (result.isConfirmed) {
       const userId = this.authService.getLoginInfo();
        if (userId)
        this.contactsService.moveContactToTrash(parseInt(userId),contactId)
      .subscribe(response=>{
        this.contactsService.getContacts(parseInt(userId))
        .subscribe(response=>{this.users=response; });
          Swal.fire({
            title: "Deleted!",
            text: "Your contact has been moved to the trash can .",
            icon: "success"
          });
      })
        
      }
    });
  }
  
}
