import { Component, OnInit } from '@angular/core';
import { AuthFormService } from './services/forms/auth-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authFormSvc: AuthFormService, private router: Router) {}

  ngOnInit() {
    document.getElementsByTagName('style')[0].innerHTML = `* {
      --primaryColor: #1e2124;
      --secondaryColor: #009e70;
      --tertiaryColor: #71736c;
      --dangerColor: crimson;
      --darkestPrimaryColor: #121314;
      --darkestPrimaryColorHover: #12131480;
      --online: green;
    }`;

    const token = localStorage.getItem('token');
    this.addingTokenToHeader(token);
    this.forceRoutingToAuth(token);
  }

  title: string = 'ez_messaging';

  addingTokenToHeader(token: any) {
    if (token) {
      this.authFormSvc.token.next(token);
    }
  }

  forceRoutingToAuth(token: any) {
    if (!token) {
      this.router.navigate(['/auth']);
    }
  }
}
