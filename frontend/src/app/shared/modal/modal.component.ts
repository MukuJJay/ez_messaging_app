import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(private elementRef: ElementRef) {}

  @Input() size? = 'md';
  @Input() tittle? = '';
  @Input() submitBtnName?: string;

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit(): void {
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit();
  }
}
