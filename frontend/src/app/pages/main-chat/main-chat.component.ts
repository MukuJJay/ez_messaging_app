import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss'],
})
export class MainChatComponent implements OnInit {
  allContacts: any[] = [];
  selectedContact: any;
  typedMessage: string = '';

  constructor(private contactsSvc: ContactsService) {}

  ngOnInit(): void {
    this.contactsSvc.getUserInfo().subscribe((res) => {
      this.allContacts = res.contacts;
    });

    //setting localContact value
    const localContact = localStorage.getItem('selectedContact');
    this.selectedContact = JSON.parse(localContact ? localContact : '');
  }

  setActiveIndex(contact: any): void {
    this.selectedContact = contact;
    localStorage.setItem(
      'selectedContact',
      JSON.stringify(this.selectedContact)
    );
  }

  clearSelectedContact(): void {
    this.selectedContact = null;
    localStorage.removeItem('selectedContact');
  }

  fetchingTypedMessage(): void {
    console.log(this.typedMessage);
    this.typedMessage = '';
  }
}
