import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../Dtos/Contact';
import { CreateContact } from '../Dtos/CreateContact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) {}
  addContact(contact:CreateContact) {
    return this.http.post("http://localhost:8000/contacts",contact);
  }

  getContacts(user_id:number) {
    return this.http.get<Contact[]>(`http://localhost:8000/contacts/${user_id}`);
  }

  getTrashContacts(user_id:number) {
    return this.http.get<Contact[]>(`http://localhost:8000/contacts/trash/${user_id}`);
  }

  moveContactToTrash(user_id:number,contactId:number) {
    return this.http.delete(`http://localhost:8000/contacts/soft/${user_id}/${contactId}`);
  }

  recoverContactFromTrash(user_id:number,contactId:number) {
    return this.http.put(`http://localhost:8000/contacts/recover/${user_id}/${contactId}`,null);
  }
  deleteContact(user_id:number,contactId:number) {
    return this.http.delete(`http://localhost:8000p`);
  }


}
