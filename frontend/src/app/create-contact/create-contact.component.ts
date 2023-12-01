import { Component, OnInit } from '@angular/core';
import { Contact } from '../Dtos/Contact';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Message } from 'primeng/api';
import { ContactService } from '../Services/contact.service';
import { CreateContact } from '../Dtos/CreateContact';
import { NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent  {
  contact: CreateContact={ };
  phoneNumbers:string[]=[]
  messages: Message[]=[];
  constructor(private contactService:ContactService,
    private auth:AuthService){}
 
  phoneNumberPattern: string = '^[0-9]{10}$';
  
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
    debugger;
    this.contact.phone_number2=this.phoneNumbers.length>0?this.phoneNumbers[0]:undefined
    this.contact.phone_number3=this.phoneNumbers.length>=1?this.phoneNumbers[1]:undefined
    this.contactService.addContact(this.contact)
    .subscribe(response=>
     {
       this.messages = [{ severity: 'success', summary: 'Contact added'}]; 
       contactForm.resetForm();
       this.phoneNumbers.splice(0,this.phoneNumbers.length)
     },(error: HttpErrorResponse) => {
       console.log(error);
     })
   }
  
  }
}
