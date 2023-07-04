import {Component, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent {
  @Input() errorMessage!: string;
  @Output() closeModal = new EventEmitter<void>();

  public close(): void {
    this.closeModal.emit();
  }
}
