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
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import { Role } from '../../shared/interfaces/role.interface';
import { RoleService } from '../../shared/services/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  roles: Role[];
  displayedColumns = ['role', 'functions'];

  constructor(private http: HttpClient, private dialog: MatDialog, private roleService: RoleService) {
    this.roleService.findAllRoles().subscribe(res => {
      this.roles = res.data;
    }, err => {
      console.log(err);
    });

   }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  delete(roleId, text) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        roleId,
        dialogHeader: `Delete Record Dialog`,
        dialogBody: `Are you sure you want to delete role: ${text}?`
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.roleService.deleteRole(roleId).subscribe(res => {
          console.log('Role deleted')
          this.roles = this.roles.filter(role => role._id !== roleId);
        });
      }
    });
  }

}
