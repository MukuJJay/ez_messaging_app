import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grid-contacts',
  templateUrl: './grid-contacts.component.html',
  styleUrls: ['./grid-contacts.component.scss'],
})
export class GridContactsComponent {
  @Input() allContacts: any[] = [];
}
