import { Component } from '@angular/core';
import { SearchformService } from 'src/app/services/forms/searchform.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  constructor(private searchFormSvc: SearchformService) {}

  searchedData: any;

  searchString: string = '';
  fetchInp(ev: any): void {
    this.searchString = ev.target.value;
    this.searchFormSvc.searchUsers(this.searchString).subscribe((res) => {
      this.searchedData = res.data;
    });
  }
}
