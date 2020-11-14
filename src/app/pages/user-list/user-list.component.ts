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
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecordDialogComponent } from 'src/app/shared/delete-record-dialog/delete-record-dialog.component';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user.service.service';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  displayedColumns: string[] = ['userName','firstName','lastName','phoneNumber','address','email', 'role', 'functions'];

  constructor(private dialog: MatDialog, private userService: UserService) {

    this.userService.findAllUsers().subscribe(res => {
      this.users = res.data;
      console.log(this.users);
    }, err => {
      console.log(err)
    })
  }

  ngOnInit(): void {
  }

  edit(id, user) {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      data: {
        userData: user
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log(data)
        this.userService.updateUser(id, data).subscribe(() => {
          console.log('User Updated');
          this.userService.findAllUsers().subscribe(res => {
            this.users = res.data;
            console.log(this.users);
            location.reload();
          }, err => {
            console.log(err)
          })
        })
      }
    })
  }

  delete(userId, recordId) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Delete User',
        dialogBody: `Are you sure you want to delete user ${recordId}?`
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.userService.deleteUser(userId).subscribe(() => {
          console.log('User delete');
          this.users = this.users.filter(u => u._id !== userId)
        })
      }
    })
  }

}
