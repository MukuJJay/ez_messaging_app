import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [InputComponent, ButtonComponent, NavbarComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, ButtonComponent, NavbarComponent],
})
export class SharedModule {}
