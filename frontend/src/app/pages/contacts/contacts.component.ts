import { Component, OnInit, TemplateRef } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { SearchformService } from 'src/app/services/forms/searchform.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  constructor(
    private searchFormSvc: SearchformService,
    private contactsSvc: ContactsService,
    private modalSvc: ModalServiceService
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

  sendChatReq(modalTemplate: TemplateRef<any>, receivingUser: any): void {
    this.modalSvc
      .open(modalTemplate, {
        size: 'lg',
        tittle: 'Send Friend Request?',
        submitBtnName: 'Yes',
      })
      .subscribe((action: string) => {
        if (action === 'complete') {
          const payloadObj = { receiverId: receivingUser._id };
          this.contactsSvc.sendChatRequest(payloadObj).subscribe((res) => {
            console.log(res);
          });
        }
      });
  }

  addOrRemoveChatReq(bool: boolean, userWhosent: any): void {
    this.contactsSvc
      .acceptOrRemoveChatRequest(bool, userWhosent._id)
      .subscribe();
  }
}
