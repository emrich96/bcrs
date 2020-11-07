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
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { RoleService } from '../services/role.service';
import { Role } from '../../shared/interfaces/role.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
  userName: string;
  userIsAdmin: Boolean;
  year: number = Date.now();

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private roleService: RoleService
  ) {

    this.userName = this.cookieService.get('sessionUser');
    this.roleService.findUserRole(this.userName).subscribe(res => {
      console.log('success', res['data'].role)
      this.userIsAdmin = res['data'].role === "Admin"
        ? true
        : false;
    }, err => {
      console.log('error getting role: ', err);
    })
  }

  ngOnInit(): void {
  }

  resetPass() {
    const username = this.cookieService.get('sessionUser');
    this.router.navigate(['/session/verify-security-questions'], {queryParams: {username: username}, skipLocationChange: true});
  }

  signOut() {
    this.cookieService.deleteAll()
    this.router.navigate(['/session/signin']);
  }

}
