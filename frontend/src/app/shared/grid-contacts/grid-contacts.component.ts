import { Component, Input } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-grid-contacts',
  templateUrl: './grid-contacts.component.html',
  styleUrls: ['./grid-contacts.component.scss'],
})
export class GridContactsComponent {
  constructor(private contactsSvc: ContactsService) {}

  @Input() allContacts: any[] = [];

  deleteContact(contactId: string): void {
    this.contactsSvc.deleteContacts(contactId).subscribe();
    window.location.reload();
  }
}
