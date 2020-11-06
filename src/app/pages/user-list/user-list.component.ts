/* ============================================
 ; Title:  user-list.component.ts
 ; Author: Jeff Lintel, Zach Dahir, Diandra McKenzie
 ; Date:   23 October 2020
 ; Description: user list component
 ===========================================*/

 import { Component, OnInit } from '@angular/core';
 import { MatDialog } from '@angular/material/dialog';
 import { HttpClient } from '@angular/common/http';
 import { UserService } from './../../shared/services/user.service';
 import { User } from './../../shared/interfaces/user.interface';
 import { DeleteRecordDialogComponent } from 'src/app/shared/delete-record-dialog/delete-record-dialog.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';



 @Component({
   selector: 'app-user-list',
   templateUrl: './user-list.component.html',
   styleUrls: ['./user-list.component.css']
 })
 export class UserListComponent implements OnInit {

   users: User[];

   //columns of user data to be displayed
   displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'phoneNumber', 'address', 'email', 'functions'];

    //reorder columns with drag/drop
    drop(event: CdkDragDrop<string[]> ) {
      moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
    }

   constructor(private http: HttpClient, private dialog: MatDialog, private userService: UserService) {

     this.userService.findAllUsers().subscribe(res => {
       this.users = res['data'];
       console.log(this.users);
     }, err => {
       console.log(err)
     });
   }

   ngOnInit(): void {
   }

   delete(userId, recordId) {
     const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
       data: {
         recordId,
         dialogHeader: 'Delete Record?',
         dialogBody: `Are you sure you want to delete user ${recordId}`
       },
       disableClose: true,
       width: '720px'
     });

     dialogRef.afterClosed().subscribe(result => {
       if (result === 'confirm') {
         this.userService.deleteUser(userId).subscribe(res => {
           console.log('User delete');
           this.users = this.users.filter(u => u._id !== userId);
         })
       }
     });
   }
 }
