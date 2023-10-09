import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

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

  allConvo(): void {
    this.socket.connect();
    this.socket.on('allConvo', (allConvo: any) => {
      console.log(allConvo);
    });
  }
}
