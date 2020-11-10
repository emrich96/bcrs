/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/20/2020
; Modified By: Mike Goldberg
; Description: E2E MEAN Stack Application
;===========================================
*/

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from '../../shared/interfaces/role.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {

  roleData: Role;
  form: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<RoleDetailsComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.roleData = data.roleData
  }

  ngOnInit() {
    console.log(this.roleData.text);
    this.form = new FormGroup({
      text: new FormControl(this.roleData.text, Validators.required)
    });
  }

  updateRole() {
    // pass the updated values to back to the parent
    this.dialogRef.close(this.form.value);
  }

  cancel() {
    this.dialogRef.close();
  }

}
