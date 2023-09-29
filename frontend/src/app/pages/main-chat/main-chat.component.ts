import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss'],
})
export class MainChatComponent implements OnInit {
  allContacts: any[] = [];
  activeIndex: number = 0;

  constructor(private contactsSvc: ContactsService) {}

  ngOnInit(): void {
    this.contactsSvc.getUserInfo().subscribe((res) => {
      this.allContacts = res.contacts;
    });
  }

  setActiveIndex(index: number) {
    this.activeIndex = index;
  }
}
