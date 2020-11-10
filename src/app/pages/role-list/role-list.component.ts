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
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import { Role } from '../../shared/interfaces/role.interface';
import { RoleService } from '../../shared/services/role.service';
import { RoleDetailsComponent } from '../role-details/role-details.component'

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  roles: Role[];
  displayedColumns = ['role', 'functions'];

  constructor(private dialog: MatDialog, private roleService: RoleService) {
    this.roleService.findAllRoles().subscribe(res => {
      this.roles = res.data;
      console.log(this.roles);
    }, err => {
      console.log(err);
    });

   }

  ngOnInit(): void {
  }

  // edit role modal
  edit(id, role) {
    const dialogRef = this.dialog.open(RoleDetailsComponent, {
      data: {
        roleData: role
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log(data)
        this.roleService.updateRole(id, data).subscribe(() => {
          console.log('role updated');
          this.roleService.findAllRoles().subscribe(res => {
            this.roles = res.data;
            console.log(this.roles);
          }, err => {
            console.log(err);
          });
        })
      }
    })
  }

  // tslint:disable-next-line: typedef
  delete(roleId, text) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        roleId,
        dialogHeader: `Delete Role`,
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
