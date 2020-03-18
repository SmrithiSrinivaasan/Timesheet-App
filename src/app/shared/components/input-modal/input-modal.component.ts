import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
})
export class InputModalComponent implements OnInit {
  title: string;
  inputLabel: string;
  saveButtonText: string;

  inputForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  @Output() save = new EventEmitter(); // communication to parent
  constructor(
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  get name() {
    return this.inputForm.get('name');
  }

  confirm() {
    this.save.emit(this.inputForm.value); // to send data to list.ts
  }

  close() {
    this.bsModalRef.hide();
  }
}
