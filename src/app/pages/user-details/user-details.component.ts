/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/23/2020
; Modified By: Ashleigh Lyman
; Description: E2E MEAN Stack Application
;===========================================
*/


import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../shared/services/role.service';
import { Role } from '../../shared/interfaces/role.interface';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userData: User;
  userForm: FormGroup
  roles: Role[];

  constructor(private roleService: RoleService, private fb: FormBuilder,private dialogRef: MatDialogRef<UserDetailsComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.userData = data.userData
  }

  ngOnInit(): void {
    // set the default values to the database
    this.roleService.findAllRoles().subscribe(res => {
      this.roles = res['data'];
    }, err => {
      console.log(err)
    });

    this.userForm =  new FormGroup({
      firstName: new FormControl(this.userData.firstName, Validators.required),
      lastName: new FormControl(this.userData.lastName, Validators.required),
      phoneNumber: new FormControl(this.userData.phoneNumber, Validators.required),
      address: new FormControl(this.userData.address, Validators.required),
      email: new FormControl(this.userData.email, Validators.required),
      role: new FormControl(this.userData.role['role'], Validators.required )
    })
  }

  updateUser() {
    // pass the updated values to back to the parent
    this.dialogRef.close(this.userForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }

}
