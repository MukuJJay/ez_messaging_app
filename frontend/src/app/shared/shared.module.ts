import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalComponent } from './modal/modal.component';
import { GridContactsComponent } from './grid-contacts/grid-contacts.component';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    NavbarComponent,
    ModalComponent,
    GridContactsComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    InputComponent,
    ButtonComponent,
    NavbarComponent,
    GridContactsComponent,
  ],
})
export class SharedModule {}
