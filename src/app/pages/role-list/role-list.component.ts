/* ============================================
 ; Title:  role-list.component.ts
 ; Author: Professor Krasso
 ; Date:   5 November 2020
 ; Modified By: Diandra McKenzie, Jeff Lintel, Zach Dahir
 ; Description: Role configuration page
 ===========================================*/

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoleService } from '../../shared/services/role.service';
import { Role } from '../../shared/interfaces/role.interface';
import { DeleteRecordDialogComponent } from 'src/app/shared/delete-record-dialog/delete-record-dialog.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})

export class RoleListComponent implements OnInit {

  roles: Role[];
  displayedColumns = ['role', 'functions'];

  constructor(private dialog: MatDialog, private roleService: RoleService) {
    this.roleService.findAllRoles().subscribe( res => {
      this.roles = res['data'];
    }, err => {
      console.log(err);
    })
   }

  ngOnInit() {
  }

  delete(roleId, text) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        roleId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete role: ${text}?`
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.roleService.deleteRole(roleId).subscribe(res => {
          console.log('Role deleted');
          this.roles = this.roles.filter(role => role._id !== roleId);
        });
      }
    });
  }
}
