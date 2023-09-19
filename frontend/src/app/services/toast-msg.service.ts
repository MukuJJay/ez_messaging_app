import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastMsgService {
  constructor(private toastr: ToastrService) {}

  success(msg: string): void {
    this.toastr.success(msg, '', {
      timeOut: 5000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'decreasing',
      tapToDismiss: true,
    });
  }

  error(msg: string): void {
    this.toastr.error(msg, '', {
      timeOut: 5000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'decreasing',
      tapToDismiss: true,
    });
  }
}
