/* ============================================
 ; Title:  verify-username-form.component.ts
 ; Author: Professor Krasso
 ; Date:   29 October 2020
 ; Modified By: Diandra McKenzie, Jeff Lintel, Zach Dahir
 ; Description: Verify User Name component
 ===========================================*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-verify-username-form',
  templateUrl: './verify-username-form.component.html',
  styleUrls: ['./verify-username-form.component.css']
})
export class VerifyUsernameFormComponent implements OnInit {

  form: FormGroup;
  //frmStepOne: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])]
    });

    //stepper form
    /*this.frmStepOne = this.fb.group({
      userName: [null, Validators.compose([Validators.required])]
  });*/
}

  validateUserName() {
    const userName = this.form.controls['userName'].value;

    this.http.get('/api/session/verify/users/' + userName).subscribe(res => { // corrected typo
      if(res) {
        this.router.navigate(['/session/verify-security-questions'], {queryParams: {userName: userName}, skipLocationChange: true});
      } else {
        this.snackbar.open(`${userName} is not a valid username`);
      }
    }, err => {
      console.log(err);
    });
  }
}

