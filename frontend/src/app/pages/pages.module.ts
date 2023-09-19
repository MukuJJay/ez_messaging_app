import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  declarations: [UserAuthComponent, DashboardComponent, ContactsComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  exports: [UserAuthComponent],
})
export class PagesModule {}
