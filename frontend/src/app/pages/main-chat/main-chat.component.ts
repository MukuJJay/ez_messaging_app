import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EmojiData } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { ContactsService } from 'src/app/services/contacts.service';
import { MessageSocketService } from 'src/app/services/socket/message-socket.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss'],
})
export class MainChatComponent implements OnInit, AfterViewChecked {
  allContacts: any[] = [];
  userData: any;
  selectedContact: any;
  typedMessage: string = '';
  allConvo: any[] = [];
  isEmojiMartOpen: boolean = false;
  regexSendMsg: RegExp = /^\s*$/;

  selectedEmoji: EmojiData['native'] = '😘';
  @ViewChild('chatroom') chatroom!: ElementRef;

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
      this.receivedMessages(this.selectedContact._id);
    }
    //listen socket for messages
    this.messageSocketSvc.listenMessage('allConvo', (data: any) => {
      console.log(data, 'DATA');
      this.allConvo = data;
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  initFn(): void {
    this.contactsSvc.getUserInfo().subscribe((res) => {
      this.allContacts = res.contacts;
      this.userData = res.data;
    });
  }

  scrollToBottom(): void {
    try {
      const element = this.chatroom.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (error) {
      console.error('Error scrolling to bottom:', error);
    }
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

  fetchingTypedMessage(ev?: Event): void {
    ev?.preventDefault();
    if (!this.regexSendMsg.test(this.typedMessage)) {
      this.messageSocketSvc.sendMessage(
        this.typedMessage.trim(),
        this.userData._id,
        this.selectedContact._id
      );
      this.typedMessage = '';
    }
  }

  isSendBtnDisabled(): boolean {
    return this.regexSendMsg.test(this.typedMessage);
  }

  handleEmojiSelection(ev: { emoji: EmojiData }): void {
    console.log(ev.emoji.native);
    this.selectedEmoji = ev.emoji.native;

    this.typedMessage = this.typedMessage + this.selectedEmoji;
  }

  emojiBtnFn(): void {
    this.isEmojiMartOpen = !this.isEmojiMartOpen;
  }
}
