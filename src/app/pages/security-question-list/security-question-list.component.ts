/* ============================================
 ; Title:  security-question-list.ts
 ; Author: Professor Krasso
 ; Date:   24 October 2020
 ; Modified By: Diandra McKenzie
 ; Description: Security Question List file
 ===========================================*/


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SecurityQuestionService } from 'src/app/shared/services/security-question.service';
import { SecurityQuestion } from '../../shared/interfaces/security-question.interface';
import { DeleteRecordDialogComponent } from 'src/app/shared/delete-record-dialog/delete-record-dialog.component';



@Component({
  selector: 'app-security-question-list',
  templateUrl: './security-question-list.component.html',
  styleUrls: ['./security-question-list.component.css']
})
export class SecurityQuestionListComponent implements OnInit {

  securityQuestions: SecurityQuestion[];
  displayedColumns = ['question', 'functions'];

  constructor(private http: HttpClient, private dialog: MatDialog, private securityQuestionService: SecurityQuestionService) {
    this.securityQuestionService.findAllSecurityQuestions().subscribe(res => {
      this.securityQuestions = res['data'];
    }, err =>{
      console.log(err);
    })
   }

  ngOnInit() {
  }

  delete(recordId) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete security question ${recordId}?`
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'confirm') {
        this.securityQuestionService.deleteSecurityQuestion(recordId).subscribe(res => {
          console.log('Security question deleted');
          this.securityQuestions = this.securityQuestions.filter(q => q._id !== recordId);
        })
      }

    });
  }

}
