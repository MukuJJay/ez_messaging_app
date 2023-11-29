import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MainChatComponent } from './main-chat/main-chat.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [
    UserAuthComponent,
    DashboardComponent,
    ContactsComponent,
    MainChatComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PickerComponent,
  ],
  exports: [UserAuthComponent],
})
export class PagesModule {}
