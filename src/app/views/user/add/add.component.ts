import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../../../services/authentication.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
})
export class AddComponent implements OnInit {
  isLoading = false;

  userForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private toast: ToastrService,
    private dashboardService: DashboardService
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
    this.isLoading = true;
    const userDetail: any = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      role: environment.Role.User,
    };
    const password = '123456';

    this.authenticationService
      .SignUp(userDetail.email, password)
      .then((response: any) => {
        userDetail.uid = response.user.uid;
        this.userService
          .addUser(userDetail)
          .then((userResponse: any) => {
            this.dashboardService.addDashboardCount('users');
            this.userForm.reset();
            this.toast.success('User Created Successfully');
            this.isLoading = false;
            this.router.navigate(['user']);
          })
          .catch((dbError: any) => {
            this.toast.error(dbError.message);
            this.isLoading = false;
          });
      })

      .catch((authError: any) => {
        this.toast.error(authError.message); // says email already exists if used again
        this.isLoading = false;
      });
  }

  canDeactivate() {
    if (this.userForm.dirty) {
      return window.confirm('Discard Changes?');
    }
    return true;
  }
}
