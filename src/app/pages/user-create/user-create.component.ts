/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/23/2020
; Modified By: Ashleigh Lyman
; Description: E2E MEAN Stack Application
;===========================================
*/


import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})


export class UserCreateComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) { }


  // This will validate input form data in each field
  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null,[
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{8,}')
      ]],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
    });
  }

  // Create new user instance for input data values
  // tslint:disable-next-line: typedef
  createUser() {
    const newUser = {} as User;
    newUser.userName = this.form.controls.userName.value,
    newUser.password = this.form.controls.password.value,
    newUser.firstName = this.form.controls.firstName.value,
    newUser.lastName = this.form.controls.lastName.value,
    newUser.phoneNumber = this.form.controls.phoneNumber.value,
    newUser.address = this.form.controls.address.value,
    newUser.email = this.form.controls.email.value,

    this.http.post('/api/session/register', newUser).subscribe(res => {
      debugger;
      if (res['data']) {
        this.router.navigate(['/users']);
      } else {
        this.errorMessage = res['message'];
      }
    }, err => {
      console.log(err);
      this.errorMessage = err;
    })
  }

  // Cancel navigation link
  // tslint:disable-next-line: typedef
  cancel() {
    this.router.navigate(['/users']);
  }

}
