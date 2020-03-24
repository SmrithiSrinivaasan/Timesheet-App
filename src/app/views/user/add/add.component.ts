import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { AuthenticationService } from '../../../services/authentication.service';
import { SharedModule } from '../../../shared/shared/shared.module';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
})
export class AddComponent implements OnInit {
  userForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  onBack() {
    this.router.navigate(['user']);
  }

  onSave() {
    console.log('user details', this.userForm.value);
    const userDetail: any = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      role: 'User',
    };
    const password = '123456';

    this.authenticationService
      .SignUp(userDetail.email, password)
      .then((response: any) => {
        userDetail.uid = response.user.uid;
        this.userService
          .addUser(userDetail)
          .then((userResponse: any) => {
            this.toast.success('User Created Successfully');
            this.router.navigate(['user']);
          })
          .catch((dbError: any) => {
            this.toast.error(dbError.message);
          });
      })

      .catch((authError: any) => {
        this.toast.error(authError.message); // says email already exists if used again
      });
  }
}
