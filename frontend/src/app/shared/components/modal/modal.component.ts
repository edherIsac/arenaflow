import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px) scale(0.98)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(10px) scale(0.98)' }))
      ])
    ])
  ]
})
export class ModalComponent {
  @Input() title: string = 'Modal';
  @Input() isVisible: boolean = false;
  @Input() closeOnBackdrop: boolean = true;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.isVisible && this.closeOnBackdrop) {
      this.closeModal();
    }
  }

  closeModal() {
    this.isVisible = false;
    this.isVisibleChange.emit(false);
    this.onClose.emit();
  }
}
