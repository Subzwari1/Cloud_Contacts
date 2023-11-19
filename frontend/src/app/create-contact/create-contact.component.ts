import { Component } from '@angular/core';
import { Contact } from '../Dtos/Contact';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Message } from 'primeng/api';
import { ContactService } from '../Services/contact.service';
import { CreateContact } from '../Dtos/CreateContact';
import { NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent {
  contact: CreateContact={};
  messages: Message[]=[];
  constructor(private contactService:ContactService,
    private auth:AuthService){}
  phoneNumberPattern: string = '^[0-9]{10}$';
  addContact(contactForm:NgForm)
  {
   if(contactForm.valid)
   {
    const id=this.auth.getLoginInfo();
    if (id)
    this.contact.user_id=parseInt(id)
    this.contactService.addContact(this.contact)
    .subscribe(response=>
     {
       this.messages = [{ severity: 'success', summary: 'Contact added'}]; 
       contactForm.resetForm();
     },(error: HttpErrorResponse) => {
       console.log(error);
     })
   }
  
  }
}
