/* ============================================
 ; Title:  password-rest.component.ts
 ; Author: Jeff Lintel
 ; Date:   29 October 2020
 ; Description: password reset component
 ===========================================*/



/*import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SecurityQuestion } from '../../shared/interfaces/security-question.interface';
import { VerifyUsernameFormComponent } from '../verify-username-form/verify-username-form.component';
import { VerifySecurityQuestionsFormComponent } from '../verify-security-questions-form/verify-security-questions-form.component';
import { ResetPasswordFormComponent } from '../reset-password-form/reset-password-form.component';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  //idea to use ViewChild came from here https://stackblitz.com/edit/angular-vpoj5j?file=app%2Fcreate-profile.component.ts

  @ViewChild('VerifyUsernameFormComponent') VerifyUsernameFormComponent: VerifyUsernameFormComponent;
  @ViewChild('VerifySecurityQuestionsFormComponent') VerifySecurityQuestionsComponent: VerifySecurityQuestionsFormComponent;
  @ViewChild('ResetPasswordFormComponent') ResetPasswordFormComponent: ResetPasswordFormComponent;

  getfrmStepOne() {
    return this.VerifyUsernameFormComponent ? this.VerifyUsernameFormComponent.form : null;
  }

  getfrmStepTwo() {
    return this.VerifySecurityQuestionsComponent ? this.VerifySecurityQuestionsComponent.form : null;
  }

  getfrmStepThree() {
    return this.ResetPasswordFormComponent ? this.ResetPasswordFormComponent.form : null;
  }

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {

  }



  }




*/
