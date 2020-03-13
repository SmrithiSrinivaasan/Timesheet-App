import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required, Validators.minLength(3)]]
  });

  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {}

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  onLogin() {
      console.log('values', this.loginForm.value );
      this.submitted = true ;
  }
}
