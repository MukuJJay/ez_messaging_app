import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFormService } from 'src/app/services/forms/auth-form.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss'],
})
export class UserAuthComponent implements OnInit {
  constructor(private authFormSvc: AuthFormService, private router: Router) {}

  ngOnInit(): void {
    this.authFormSvc.variant.subscribe((res) => {
      this.variant = res;
      if (res === 'Login') {
        this.authForm = this.authFormSvc.authFormLogin;
      } else {
        this.authForm = this.authFormSvc.authFormRegister;
      }
    });
  }

  variant: string = '';

  authForm: any;

  switchVariant(variant: string): void {
    this.authFormSvc.variant.next(variant);
  }

  fetchingInput(ev: any, formControlName: string) {
    this.authForm.get(formControlName)?.setValue(ev.target.value);
  }

  submit() {
    switch (this.variant) {
      case 'Register':
        this.register();
        break;
      case 'Login':
        this.login();
        break;
    }
  }

  register() {
    this.authFormSvc.register(this.authForm.value).subscribe((res) => {
      localStorage.setItem('token', res.token);
      this.authFormSvc.token.next(res.token);
      if (res.status) {
        this.router.navigate(['/']);
      }
    });
  }
  login() {
    this.authFormSvc.login(this.authForm.value).subscribe((res) => {
      localStorage.setItem('token', res.token);
      this.authFormSvc.token.next(res.token);
      if (res.status) {
        this.router.navigate(['/']);
      }
    });
  }
}
