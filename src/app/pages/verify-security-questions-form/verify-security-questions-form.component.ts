/* ============================================
 ; Title:  verify-security-questions-form.component.ts
 ; Author: Professor Krasso
 ; Date:   29 October 2020
 ; Modified By: Diandra McKenzie, Jeff Lintel, Zach Dahir
 ; Description: Verify Security Questions component
 ===========================================*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SecurityQuestion } from '../../shared/interfaces/security-question.interface';

@Component({
  selector: 'app-verify-security-questions-form',
  templateUrl: './verify-security-questions-form.component.html',
  styleUrls: ['./verify-security-questions-form.component.css']
})
export class VerifySecurityQuestionsFormComponent implements OnInit {

  selectedSecurityQuestions: SecurityQuestion[]; //create interface
  question1: string;
  question2: string;
  question3: string;
  userName: string;
  form: FormGroup;
  //frmStepTwo: FormGroup; may be necessary for stepper

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private fb: FormBuilder) {
    this.userName = this.route.snapshot.queryParamMap.get('userName');
    console.log(this.userName);

    this.http.get('api/users/' + this.userName + '/security-questions').subscribe(res => {
      this.selectedSecurityQuestions = res['data'];
      console.log(this.selectedSecurityQuestions);
      console.log(res);

    }, err => {
      console.log(err);
    }, () => {
      this.question1 = this.selectedSecurityQuestions[0].questionText;
      this.question2 = this.selectedSecurityQuestions[1].questionText;
      this.question3 = this.selectedSecurityQuestions[2].questionText;


      console.log(this.question1);
      console.log(this.question2);
      console.log(this.question3);
    });
   }

  ngOnInit() {
    this.form = this.fb.group({
      answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion3: [null, Validators.compose([Validators.required])]
    });

    //stepper form
    /*this.frmStepTwo = this.fb.group({
      answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion3: [null, Validators.compose([Validators.required])]
    });*/
  }

   verifySecurityQuestions() {
    const answerToSecurityQuestion1 = this.form.controls['answerToSecurityQuestion1'].value;
    const answerToSecurityQuestion2 = this.form.controls['answerToSecurityQuestion2'].value;
    const answerToSecurityQuestion3 = this.form.controls['answerToSecurityQuestion3'].value;

    console.log(answerToSecurityQuestion1);
    console.log(answerToSecurityQuestion2);
    console.log(answerToSecurityQuestion3);

    this.http.post('/api/session/verify/users/' + this.userName + '/security-questions', {
      questionText1: this.question1,
      questionText2: this.question2,
      questionText3: this.question3,
      answerText1: answerToSecurityQuestion1,
      answerText2: answerToSecurityQuestion2,
      answerText3: answerToSecurityQuestion3
    }).subscribe( res => {
      console.log(res);
      if(res['message'] === 'success') {
        this.router.navigate(['/session/reset-password'], {queryParams: {isAuthenticated: 'true', userName: this.userName}, skipLocationChange: true})
      } else {
        console.log('Unable to verify security question responses')
      }
    })
  }
}
