import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
})
export class DeleteModalComponent implements OnInit {
  title: string;
  saveButtonText: string;
  message: string;

  @Output() delete = new EventEmitter(); // communication to parent

  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit(): void {}
  confirm() {
    this.delete.emit(true); // to send data to list.ts
  }

  close() {
    this.bsModalRef.hide();
  }
}
