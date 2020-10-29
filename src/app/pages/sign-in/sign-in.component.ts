/* ============================================
 ; Title:  sign-in.component.ts
 ; Author: Professor Krasso
 ; Date:   21 October 2020
 ; Modified By: Diandra McKenzie
 ; Description: sign-in component
 ===========================================*/

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';




@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;

  constructor(private router: Router, private cookieService: CookieService,
    private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar) {

    }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])]
    });
  }


  signIn() {
    const userName = this.form.controls.userName.value;
    const password = this.form.controls.password.value;

    this.http.post('/api/session/signin', {
      userName,
      password
    }).subscribe(res => {
      console.log(res['data']);
       if(res['data'].userName) {
         /**
          * User is authenticated and access can to granted
          */
        this.cookieService.set('session_user', res['data'].userName, 1); // set the user name to the cookie, session_user name
        this.router.navigate(['/']);

        }
      }, err => {
      console.log(err);
      this.errorMessage = err.error.message;
    });
  }
}
