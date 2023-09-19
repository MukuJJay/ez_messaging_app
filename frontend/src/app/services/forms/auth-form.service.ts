import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthFormService {
  constructor(private apiSvc: ApiService) {}
  variant = new BehaviorSubject<string>('Login');
  token = new BehaviorSubject<string>('');

  base_url: string = environment.base_url;

  onlyCharPattern = '^[a-zA-Z ]*$';

  //forms
  authFormRegister = new FormGroup({
    username: new FormControl('', [
      Validators.pattern(this.onlyCharPattern),
      Validators.required,
    ]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  authFormLogin = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  //apis
  register(body: any) {
    const path = `${this.base_url}/auth/register`;
    return this.apiSvc.post(path, body);
  }

  login(body: any) {
    const path = `${this.base_url}/auth/login`;
    return this.apiSvc.post(path, body);
  }
}
