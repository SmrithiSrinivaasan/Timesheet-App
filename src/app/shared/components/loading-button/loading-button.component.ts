import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
})
export class LoadingButtonComponent {
  constructor() {}

  @Input() isLoading: boolean;
  @Input() text: string;
  @Input() loadingText: string;
  @Input() isFormInvalid: boolean;
  @Input() buttonSize: string;
  @Input() buttonIcon: string;

  @Output() formSubmit = new EventEmitter();

  onFormSubmit(): void {
    this.formSubmit.emit();
  }
}
