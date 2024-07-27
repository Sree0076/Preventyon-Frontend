import { Component, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  constructor() {}
  @Output() dialogResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  visible: boolean = true;

  closeDialog(confirm: boolean) {
    this.visible = false;
    console.log(confirm);
    this.dialogResult.emit(confirm);
  }
}
