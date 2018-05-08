import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:Http) { }

  //retreving contacts
  getContacts()
  {
    return this.http.get('http://localhost:3000/api/contacts');
  }

   //add contact
   addContact(contact)
   {
    return this.http.post('http://localhost:3000/api/contact',contact);
   }

   //delete contact
   deleteContact(contactId)
   {
    return this.http.delete('http://localhost:3000/api/contact/'+contactId);
   }
}
