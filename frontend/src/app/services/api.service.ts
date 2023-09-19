import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  post(path: string, body: any) {
    return this.http.post(path, body) as Observable<any>;
  }

  get(path: string) {
    return this.http.get(path) as Observable<any>;
  }
}
