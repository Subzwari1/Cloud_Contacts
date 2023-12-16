import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FilterMetadata } from 'primeng/api';
import { Table } from 'primeng/table';
import { BehaviorSubject } from 'rxjs';
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
  isShareDialogOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  contactName:string=""
  contactId?:number;
  relationships:string[]=[]
  constructor(private contactsService:ContactService,
              private authService:AuthService,
              private router: Router) { }

  ngOnInit() {
    this.relationships= this.contactsService.getRelationShipTypes();
    this.relationships.push('None')
    this.getContacts();
  }
  filterRelationship(value: any, filter: FilterMetadata): boolean {
    if (filter.value === undefined || filter.value === null) {
      return true;
    }
  
    return value === filter.value;
  }
  getContacts()
  {
    const id = this.authService.getLoginInfo();
    if (id)
    this.contactsService.getContacts(parseInt(id))
    .subscribe(response=>{
      this.users=response;
      this.users[0].relationship="Family";
      this.users[1].relationship="Coworker";
      this.users[3].relationship="Friend";


     this.users.forEach(user=>{
      if (user.relationship===null||user.relationship===undefined)
        user.relationship='None';
      });
    console.log(response)
  });
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

  viewContact(contact_id:number)
  {
    this.router.navigate(['/dashboard/view-contact',contact_id]);
  }

  editContact(contact_id:number)
  {
    this.router.navigate(['/dashboard/edit-contact',contact_id]);
  }
  openShareDialog(contact:Contact)
  {
    this.contactName=contact.first_name +" "+contact.last_name;
    this.contactId=contact.id;
    this.isShareDialogOpen.next(true);
  }
  getSeverity(relationshipType: string) {
    switch (relationshipType) {
        case 'None':
            return 'danger';

        case 'Family':
            return 'success';

        case 'Coworker':
            return 'info';

        case 'School':
            return 'warning';

        case 'Friend':
            return 'info';
        

    }
    return undefined;
}
}
