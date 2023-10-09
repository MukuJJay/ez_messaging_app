import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { MessageSocketService } from 'src/app/services/socket/message-socket.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss'],
})
export class MainChatComponent implements OnInit {
  allContacts: any[] = [];
  userData: any;
  selectedContact: any;
  typedMessage: string = '';

  constructor(
    private contactsSvc: ContactsService,
    private messageSocketSvc: MessageSocketService
  ) {}

  ngOnInit(): void {
    this.contactsSvc.getUserInfo().subscribe((res) => {
      this.allContacts = res.contacts;
      this.userData = res.data;
    });

    //setting localContact value
    const localContact = localStorage.getItem('selectedContact');

    if (localContact)
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
    this.messageSocketSvc.sendMessage(
      this.typedMessage,
      this.userData._id,
      this.selectedContact._id
    );
    this.typedMessage = '';
    this.messageSocketSvc.allConvo();
  }
}
