import {
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  TemplateRef,
} from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';
import { Observable, Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ModalServiceService {
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  private modalNotifier?: Subject<string>;

  open(
    content: TemplateRef<any>,
    options?: { size?: string; tittle?: string; submitBtnName?: string }
  ): Observable<string> {
    const modalComponentFactory =
      this.resolver.resolveComponentFactory(ModalComponent);
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = modalComponentFactory.create(this.injector, [
      contentViewRef.rootNodes,
    ]);

    modalComponent.instance.size = options?.size;
    modalComponent.instance.tittle = options?.tittle;
    modalComponent.instance.submitBtnName = options?.submitBtnName;
    modalComponent.instance.closeEvent.subscribe(() => this.closeModal());
    modalComponent.instance.submitEvent.subscribe(() => this.submitModal());

    modalComponent.hostView.detectChanges();

    this.document.body.appendChild(modalComponent.location.nativeElement);

    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();
  }

  closeModal(): void {
    this.modalNotifier?.complete();
  }
  submitModal(): void {
    this.modalNotifier?.next('complete');
    this.closeModal();
  }
}
