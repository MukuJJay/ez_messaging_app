import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private apiSvc: ApiService) {}

  base_url = environment.base_url;

  checkChatRequests() {
    const path = `${this.base_url}/user/checkChatRequests`;
    return this.apiSvc.get(path);
  }

  sendChatRequest(receivingUserId: any) {
    const path = `${this.base_url}/user/sendChatRequest`;
    return this.apiSvc.post(path, receivingUserId);
  }

  acceptOrRemoveChatRequest(decesion: boolean, userWhoSentId: string) {
    const path = `${this.base_url}/user/addOrRemoveContactsRequests`;
    const payloadObj = { decesion: decesion, userWhoSentId: userWhoSentId };
    return this.apiSvc.post(path, payloadObj);
  }

  getUserInfo() {
    const path = `${this.base_url}/user/userInfo`;
    return this.apiSvc.get(path);
  }

  deleteContacts(contactId: string) {
    const path = `${this.base_url}/user/deleteContacts`;
    const payloadObj = { contactId: contactId };
    return this.apiSvc.put(path, payloadObj);
  }
}
