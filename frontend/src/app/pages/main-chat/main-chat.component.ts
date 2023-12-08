import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
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
export class MainChatComponent implements OnInit {
  allContacts: any[] = [];
  userData: any;
  selectedContact: any;
  typedMessage: string = '';
  allConvo: any[] = [];
  isEmojiMartOpen: boolean = false;
  regexSendMsg: RegExp = /^\s*$/;
  showScrollDownButton: boolean = false;

  selectedEmoji: EmojiData['native'] = '😘';
  @ViewChild('chatroom') chatroom!: ElementRef;
  @ViewChild('emojiMart') emojiMart!: ElementRef;
  @ViewChild('emojiMartBtn') emojiMartBtn!: ElementRef;

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
      console.log('received ms');
    }
    //listen socket for messages
    this.messageSocketSvc.listenMessage('allConvo', (data: any) => {
      console.log(data, 'DATA');
      this.allConvo = data;
    });
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (
      !this.emojiMart?.nativeElement.contains(event.target) &&
      !this.emojiMartBtn?.nativeElement.contains(event.target) &&
      this.isEmojiMartOpen
    ) {
      this.isEmojiMartOpen = false;
    }
  }

  scrollHandler(event: Event, divtowatch: Element, threshold: number) {
    if (divtowatch.scrollTop < -threshold) {
      this.showScrollDownButton = true;
    } else {
      this.showScrollDownButton = false;
    }
  }

  initFn(): void {
    this.contactsSvc.getUserInfo().subscribe((res) => {
      this.allContacts = res.contacts;
      this.userData = res.data;
      this.receivedMessages(this.userData._id, this.selectedContact._id);
    });
  }

  scrollToBottom(divtowatch: ElementRef | Element): void {
    try {
      if (divtowatch) {
        if ('nativeElement' in divtowatch) {
          const element = divtowatch.nativeElement;
          element.scrollTop = element.scrollHeight;
        } else {
          divtowatch.scrollTop = divtowatch.scrollHeight;
        }
      }
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
    this.receivedMessages(this.userData._id, this.selectedContact._id);
    this.scrollToBottom(this.chatroom);
  }

  receivedMessages(senderId: string, receiverId: string): void {
    this.messageSocketSvc.receiveMessage(senderId, receiverId);
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
      this.scrollToBottom(this.chatroom);
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
