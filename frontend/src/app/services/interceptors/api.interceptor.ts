import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { ToastMsgService } from '../toast-msg.service';
import { AuthFormService } from '../forms/auth-form.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private toastrSvc: ToastMsgService,
    private authFormSvc: AuthFormService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let modifiedReq = request.clone();
    this.authFormSvc.token.subscribe((res) => {
      if (res) {
        modifiedReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${res}`,
          },
        });
      }
    });

    return next.handle(modifiedReq).pipe(
      tap((event) => {
        this.apiHanndler(event);
      }),
      catchError((error: HttpErrorResponse) => {
        this.apiHanndler(error);
        return of(
          new HttpResponse({ status: error.status, body: error.error })
        );
      })
    );
  }

  apiHanndler(ev: any) {
    if ((ev.status === 500 || ev.status === 400) && ev?.error.message) {
      this.toastrSvc.error(ev?.error.message);
    }
    if (ev.status === 201 || (ev.status === 200 && ev?.body.message)) {
      this.toastrSvc.success(ev?.body.message);
    }
  }
}
