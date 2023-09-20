import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private apiSvc: ApiService) {}

  base_url = environment.base_url;

  checkChatRequests(token: any) {
    const path = `${this.base_url}/user/checkChatRequests?token=${token}`;
    return this.apiSvc.get(path);
  }
}
