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
    this.socket.emit('sendMsg', {
      msg: msg,
      senderId: senderId,
      receiverId: receiverId,
    });
  }

  listenMessage(eventName: string, callBack: any) {
    this.socket.on(eventName, callBack);
  }

  receiveMessage(senderId: string, receiverId: string) {
    this.socket.emit('receiveMsg', {
      senderId: senderId,
      receiverId: receiverId,
    });
  }

  msgConnect(userId: string) {
    this.socket.emit('msgConnected', userId);
  }
}
