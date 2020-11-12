/* ============================================
 ; Title:  sign-in.component.ts
 ; Author: Professor Krasso
 ; Date:   21 October 2020
 ; Modified By: Diandra McKenzie
 ; Description: sign-in component
 ===========================================*/


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';




@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  error: string;

  constructor(private router: Router, private cookieService: CookieService,
    private fb: FormBuilder, private http: HttpClient) {

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

    this.http.post('/api/session/signin', { userName,password}).subscribe(res => {
      console.log(res['data']);
       if(res['data'].userName) {
         /**
          * User is authenticated and access can to granted
          */
        this.cookieService.set('session_user', res['data'].userName, 1); // set the user name to the cookie, session_user name
        this.cookieService.set('session_role', res['data'].role.role, 1); // Set user role to use to hide nav based on role
        this.router.navigate(['/']);

        }
      }, err => {
      console.log(err);
      this.error = 'Invalid username and/or password, please try again';

    });
  }
}
