/* ============================================
 ; Title:  security-question-details.ts
 ; Author: Professor Krasso
 ; Date:   24 October 2020
 ; Modified By: Diandra McKenzie
 ; Description: Security Question Details file
 ===========================================*/

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityQuestion } from 'src/app/shared/interfaces/security-question.interface';
import { SecurityQuestionService } from 'src/app/shared/services/security-question.service';

@Component({
  selector: 'app-security-question-details',
  templateUrl: './security-question-details.component.html',
  styleUrls: ['./security-question-details.component.css']
})
export class SecurityQuestionDetailsComponent implements OnInit {
  question: SecurityQuestion;
  questionId: string;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router, private securityQuestionService: SecurityQuestionService) {
    this.questionId = this.route.snapshot.paramMap.get('questionId');
    this.securityQuestionService.findSecurityQuestionById(this.questionId).subscribe(res => {
      this.question = res['data'];
    }, err => {
      console.log(err);
    }, () => {
      this.form.controls.text.setValue(this.question.text);
    })
   }

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  saveQuestion() {
    const updatedSecurityQuestion = {} as SecurityQuestion;
    updatedSecurityQuestion.text = this.form.controls.text.value;

    this.securityQuestionService.updateSecurityQuestion(this.questionId, updatedSecurityQuestion).subscribe(res => {
      this.router.navigate(['/security-questions'])
    })
  }

  cancel() {
    this.router.navigate(['/security-questions/']);
  }
}
