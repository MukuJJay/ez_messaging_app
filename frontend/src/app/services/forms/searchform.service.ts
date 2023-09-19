import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchformService {
  constructor(private apiSvc: ApiService) {}

  base_url = environment.base_url;

  searchUsers(searchString: string) {
    const path = `${this.base_url}/user/searchUsers?usernameOrEmail=${searchString}`;
    return this.apiSvc.get(path);
  }
}
