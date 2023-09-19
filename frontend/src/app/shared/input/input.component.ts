import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() value: any = '';
  @Input() error: any = '';
  @Output() inputEmitter = new EventEmitter<string>();

  inputEmit(ev: any) {
    this.inputEmitter.emit(ev);
  }
}
