import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class MessageSocketService {
  base_url = environment.base_url;

  constructor(private socket: Socket, private apiSvc: ApiService) {}

  sendMessage(msg: string, senderId: string, receiverId: string): void {
    this.socket.connect();
    this.socket.emit('chatMsg', {
      msg: msg,
      senderId: senderId,
      receiverId: receiverId,
    });
  }

  listenMessage(eventName: string, callBack: any) {
    this.socket.on(eventName, callBack);
  }

  receiveMessage(receiverId: string) {
    const path = `${this.base_url}/message/receiveMessage`;
    const payloadObj = { receiverId: receiverId };
    return this.apiSvc.post(path, payloadObj);
  }
}
