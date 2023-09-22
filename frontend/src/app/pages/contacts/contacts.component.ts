import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { SearchformService } from 'src/app/services/forms/searchform.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  constructor(
    private searchFormSvc: SearchformService,
    private contactsSvc: ContactsService
  ) {}

  ngOnInit(): void {
    this.contactsSvc.checkChatRequests().subscribe((res) => {
      console.log(res);
      this.senderObjs = res.data;
    });
  }

  searchedData: any;
  senderObjs: any;

  searchString: string = '';
  fetchInp(ev: any): void {
    this.searchString = ev.target.value;
    this.searchFormSvc.searchUsers(this.searchString).subscribe((res) => {
      this.searchedData = res.data;
      console.log(this.searchedData);
    });
  }

  sendChatReq(receivingUser: any): void {
    // const payloadObj = { receiverId: receivingUser._id };
    // this.contactsSvc.sendChatRequest(payloadObj).subscribe((res) => {
    //   console.log(res);
    // });
  }
}
