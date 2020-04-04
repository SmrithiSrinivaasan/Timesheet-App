import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { upperFirst } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  isLoading = false;
  isPageLoading = false;

  userForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
    email: [
      { value: '', disabled: true },
      [Validators.required, Validators.email],
    ],
  });
  uid: string;
  userDetail: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private toast: ToastrService
  ) {}
  // activated router is for params n current routes

  ngOnInit(): void {
    this.isPageLoading = true;
    this.route.params.subscribe(params => {
      this.uid = params.id;
    });
    this.userService
      .selectedUserByUID(this.uid)
      .then((response: any) => {
        this.userDetail = Object.values(response.val())[0];
        this.userForm.patchValue({
          name: this.userDetail.name,
          email: this.userDetail.email,
        });
        this.isPageLoading = false;
      })
      .catch((error: any) => {
        this.isPageLoading = false;
      });
  }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  hasData() {
    return this.userDetail && this.userDetail.email ? true : false;
  }

  onBack() {
    this.router.navigate(['user']);
  }

  canDeactivate() {
    if (this.userForm.dirty) {
      return window.confirm('Discard Changes?');
    }
    return true;
  }

  onSave() {
    this.isLoading = true;
    const userDetail: any = {
      name: upperFirst(this.userForm.getRawValue().name),
      email: this.userForm.getRawValue().email,
    };
    this.userService
      .editUser(userDetail)
      .then((userResponse: any) => {
        this.userForm.reset();
        this.toast.success('User Updated Successfully');
        this.router.navigate(['user']);
        this.isLoading = false;
      })
      .catch((dbError: any) => {
        this.toast.error(dbError.message);
        this.isLoading = false;
      });
  }
}
