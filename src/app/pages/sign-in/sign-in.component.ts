/* ============================================
 ; Title:  sign-in.component.ts
 ; Author: Diandra McKenzie
 ; Date:   20 October 2020
 ; Description: sign-in component
 ===========================================*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

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
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    });
  }


  signIn() {
    const empId = this.form.controls['userName'].value;
    console.log(empId);


    this.http.get('/api/employees/' + empId).subscribe(res => {
      if(res) {
        this.cookieService.set('session_user', empId, 1); // set the employee id to the cookie, session_user name
        this.router.navigate(['/']);
      } else {
        this.error = 'The employee ID you entered is invalid, please try again.';
      }
    })
  }
}
