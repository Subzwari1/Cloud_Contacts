import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ContactService } from '../../Services/contact.service';

import { Contact } from '../../Dtos/Contact';
import { Message } from 'primeng/api';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent {

  phoneNumbers:string[]=[]
  messages: Message[]=[];
  areInputsDisabled=true;
  contactId:number=0;
  contact: Contact={ };
  phoneNumberPattern: string = '^[0-9]{10}$';

  constructor(private route: ActivatedRoute,
    private auth:AuthService,
    private contactService:ContactService,
    private router: Router) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.contactId= params['id'];
        const userId=this.auth.getLoginInfo();
        if (userId)
       this.contactService.getContactsByUserIdAndContactId(parseInt(userId),this.contactId)
      .subscribe(response=>{
        console.log(response);
        this.contact=response
        if (this.contact.phone_number2!=null)
        {
          this.phoneNumbers.push(this.contact.phone_number2)
        }

        if (this.contact.phone_number3!=null)
        {
          this.phoneNumbers.push(this.contact.phone_number3)
        }
      })
    });
  }

  goToContacts()
  {
    this.router.navigate(["/dashboard/contacts"])
  }
  
  trackByFn(index:number, item:string) {
    return index;  
  }

  addPhoneNumber() {
    if (this.phoneNumbers.length>1)
    {
      Swal.fire({
        title: "Oops",
        text: "You cannot add more than 3 phone numbers!",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    this.phoneNumbers?.push('');

  }
  deletePhoneNumber(index:number)
  {
    if(index >= 0 && index < this.phoneNumbers.length) 
    {
      this.phoneNumbers.splice(index, 1);
    }
  }
  validatePhoneNumbers(): boolean {
    if (this.phoneNumbers.length>0)
      return  this.phoneNumbers.every(phoneNumber => /^\d{10}$/.test(phoneNumber));
    else 
      return true
   
  }
  addContact(contactForm:NgForm)
  {

   if(contactForm.valid && this.validatePhoneNumbers())
   {
    const id=this.auth.getLoginInfo();
    if (id)
    this.contact.user_id=parseInt(id)
    this.contact.phone_number2=this.phoneNumbers.length>0?this.phoneNumbers[0]:undefined
    this.contact.phone_number3=this.phoneNumbers.length>=1?this.phoneNumbers[1]:undefined
    this.contactService.editContact(this.contactId,this.contact)
    .subscribe(response=>
     {
       this.messages = [{ severity: 'success', summary: 'Contact updated'}]; 
     },(error: HttpErrorResponse) => {
       console.log(error);
     })
   }
  
  }
}
