import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  allConvo: any[] = [];
  @ViewChild('chatroom', { static: false }) chatroom: any;

  constructor(
    private contactsSvc: ContactsService,
    private messageSocketSvc: MessageSocketService
  ) {}

  ngOnInit(): void {
    this.initFn();

    //setting localContact value
    const localContact = sessionStorage.getItem('selectedContact');
    if (localContact) {
      this.selectedContact = JSON.parse(localContact ? localContact : '');
      this.receivedMessages(this.selectedContact);
    }

    //listen socket for messages
    this.messageSocketSvc.listenMessage('allConvo', (data: any) => {
      console.log(data, 'DATA');
      this.allConvo = data;
    });
  }

  initFn(): void {
    this.contactsSvc.getUserInfo().subscribe((res) => {
      this.allContacts = res.contacts;
      this.userData = res.data;
    });
  }

  setActiveIndex(contact: any): void {
    this.selectedContact = contact;
    sessionStorage.setItem(
      'selectedContact',
      JSON.stringify(this.selectedContact)
    );

    //calling the receive messges api
    this.receivedMessages(this.selectedContact._id);
  }

  receivedMessages(receiverId: string): void {
    this.messageSocketSvc.receiveMessage(receiverId).subscribe((res: any) => {
      console.log(res.data);
      this.allConvo = res.data;
    });
  }

  clearSelectedContact(): void {
    this.selectedContact = null;
    sessionStorage.removeItem('selectedContact');
  }

  fetchingTypedMessage(): void {
    this.messageSocketSvc.sendMessage(
      this.typedMessage.trim(),
      this.userData._id,
      this.selectedContact._id
    );
    this.typedMessage = '';
  }

  isSendBtnDisabled(): boolean {
    const regex = /^\s*$/;
    return regex.test(this.typedMessage);
  }
}
