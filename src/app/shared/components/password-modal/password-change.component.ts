import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
})
export class PasswordChangeComponent implements OnInit {
  pwdForm = this.formBuilder.group({
    currentPwd: ['', [Validators.required]],
    newPwd: ['', [Validators.required]],
    confirmPwd: ['', [Validators.required]],
  });
  constructor(
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private toast: ToastrService
  ) {
    this.pwdForm.valueChanges.subscribe(field => {
      if (field.newPwd !== field.confirmPwd) {
        this.confirmPwd.setErrors({ mismatch: true });
      } else {
        this.confirmPwd.setErrors(null);
      }
    });
  }

  ngOnInit(): void {}

  get currentPwd() {
    return this.pwdForm.get('currentPwd');
  }

  get newPwd() {
    return this.pwdForm.get('newPwd');
  }

  get confirmPwd() {
    return this.pwdForm.get('confirmPwd');
  }

  // pwdMatch(c: AbstractControl): { invalid: boolean } {
  //   if (c.get('newPwd').value !== c.get('confirmPwd').value) {
  //       return {invalid: true};
  //   }
  // }

  confirm() {
    this.authenticationService
      .changePwd(this.pwdForm.value.newPwd)
      .then((response: any) => {
        this.toast.success('Password Changed Successfully !');
        this.close();
      })
      .catch((error: any) => {
        this.toast.error(error.message);
      });
  }

  close() {
    this.bsModalRef.hide();
  }
}
