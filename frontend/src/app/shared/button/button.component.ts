import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() type: string = '';
  @Input() disabled: boolean = false;
  @Input() icon: string = '';
  @Input() size: string = '';
  @Input() typeBtn: boolean = true;
  @Input() width: string = '';
}
