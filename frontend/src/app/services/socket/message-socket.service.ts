import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageSocketService {
  constructor(private socket: Socket) {}

  sendMessage(msg: string, senderId: string, receiverId: string): void {
    this.socket.connect();
    this.socket.emit('chatMsg', {
      msg: msg,
      senderId: senderId,
      receiverId: receiverId,
    });
  }

  updateAllConvo(): Observable<any> {
    this.socket.connect();
    return this.socket.fromEvent('allConvo');
  }
}
