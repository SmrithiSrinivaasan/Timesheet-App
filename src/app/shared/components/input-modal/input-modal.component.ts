import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { upperFirst } from 'lodash';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
})
export class InputModalComponent implements OnInit {
  title: string;
  inputLabel: string;
  saveButtonText: string;
  loadingText: string;
  type: string;
  initialValue: string;
  isLoading: boolean;

  inputForm = this.formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
    ],
  });

  @Output() save = new EventEmitter(); // communication to parent
  constructor(
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.type === 'Edit') {
      this.inputForm.patchValue({
        name: this.initialValue,
      });
    }
  }

  get name() {
    return this.inputForm.get('name');
  }

  confirm() {
    this.isLoading = true;
    this.inputForm.value.name = upperFirst(this.inputForm.value.name);
    this.save.emit(this.inputForm.value); // to send data to list.ts
  }

  close() {
    this.bsModalRef.hide();
  }
}
