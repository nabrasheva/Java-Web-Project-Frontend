import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-info-email',
  templateUrl: './info-email.component.html',
  styleUrls: ['./info-email.component.css']
})
export class InfoEmailComponent {
  @Input() infoMessage!: string;
  @Output() closeModal = new EventEmitter<void>();

  public close(): void {
    this.closeModal.emit();
  }
}
