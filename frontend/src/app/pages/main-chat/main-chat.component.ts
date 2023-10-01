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
  }

  setActiveIndex(contact: any): void {
    this.selectedContact = contact;
  }

  // mainChatWindowSwitcher():void{

  // }

  fetchingTypedMessage(): void {
    console.log(this.typedMessage);
    this.typedMessage = '';
  }
}
