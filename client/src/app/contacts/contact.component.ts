import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers :[ContactService]
})
export class ContactsComponent implements OnInit {

  contacts:Contact[];
  contact:Contact;
  first_name:string;
  last_name:string;
  phone_number:string;

  constructor(private contactService:ContactService) { }

  ngOnInit() {
   this.getContacts();
  }

  getContacts()
  {
    this.contactService.getContacts().subscribe(contacts=>{
      this.contacts=contacts.json();
    });
  }

  deleteContact(id)
  {
    this.contactService.deleteContact(id).subscribe(data=>{
      let res=data.json();
      if(res.n==1)
      {
        for(let i=0;i<this.contacts.length;i++)
        {
          if(this.contacts[i]._id==id)
          {
            this.contacts.splice(i,1);
          }
        }
      }
    });
  }

  addContact()
  {
    let newContact = {
        first_name: this.first_name,
        last_name: this.last_name,
        phone_number : this.phone_number
    }

    this.contactService.addContact(newContact).subscribe(contact=>{
      this.contacts.push(contact.json());
    })
    
  }

}
