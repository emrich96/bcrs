/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/20/2020
; Modified By: Mike Goldberg
; Description: E2E MEAN Stack Application
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RoleService } from '../../shared/services/role.service';
import { Role } from '../../shared/interfaces/role.interface';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {
  form: FormGroup;
  role: Role;
  roleId: string;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private roleService: RoleService) {
    this.roleId = this.route.snapshot.paramMap.get('roleId');

    this.roleService.findRoleById(this.roleId).subscribe(res => {
      this.role = res['data'];
    }, err => {
        console.log(err);
    }, () => {
        this.form.controls['text'].setValue(this.role.text);
    })
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    });
  }
  save() {
    const updatedRole = {
      text: this.form.controls['text'].value
    } as Role;

    this.roleService.updateRole(this.roleId, updatedRole).subscribe(res => {
      this.router.navigate(['/roles']);
    }, err => {
      console.log(err);
    });
  }
  cancel() {
    this.router.navigate(['/roles']);
  }

}
