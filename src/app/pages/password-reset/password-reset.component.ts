import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SecurityQuestion } from '../../shared/interfaces/security-question.interface';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  form: FormGroup;
  passwordResetForm: FormGroup;
  username: string;
  selectedSecurityQuestions: SecurityQuestion[];
  question1: string;
  question2: string;
  question3: string;
  errorMessage: string;


  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private cookieService: CookieService) {

    this.http.get('api/users/' + this.username + '/security-questions').subscribe(res => {
      this.selectedSecurityQuestions = res['data'];
      console.log(this.selectedSecurityQuestions);
      console.log(res);
    }, err => {
      console.log(err);
    }, () => {
      this.question1 = this.selectedSecurityQuestions[0].text;
      this.question2 = this.selectedSecurityQuestions[1].text;
      this.question3 = this.selectedSecurityQuestions[2].text;

      console.log(this.question1);
      console.log(this.question2);
      console.log(this.question3);
    });
  }

  ngOnInit(): void {
    this.passwordResetForm = new FormGroup({
      userName: new FormGroup({
        username: new FormControl(null, Validators.required)
      }),
      securityQuestionVerification: new FormGroup({
        answerToSecurityQuestion1: new FormControl(null, Validators.required),
        answerToSecurityQuestion2: new FormControl(null, Validators.required),
        answerToSecurityQuestion3: new FormControl(null, Validators.required)
      }),
      password: new FormGroup({
        password: new FormControl(null, Validators.required)
      })
    });
  }

}


