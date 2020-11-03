/* ============================================
 ; Title:  reset-password-form.component.ts
 ; Author: Professor Krasso
 ; Date:   29 October 2020
 ; Modified By: Diandra McKenzie, Jeff Lintel, Zach Dahir
 ; Description: Reset password form component
 ===========================================*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {

  isAuthenticated: string;
  userName: string;
  form: FormGroup;
  //frmStepThree: FormGroup; may be necessary for stepper

  constructor(private http: HttpClient,  private route: ActivatedRoute, private fb: FormBuilder, private cookieService: CookieService, private router: Router) {
    this.isAuthenticated = this.route.snapshot.queryParamMap.get('isAuthenticated');
    this.userName = this.route.snapshot.queryParamMap.get('userName');

  }

  ngOnInit(): void {
    if(!this.isAuthenticated) {
      this.router.navigate(['/session/sign-in']);
    }

    this.form = this.fb.group({
      password: [null, Validators.compose([Validators.required])]
    });

    //stepper form
    /*this.frmStepThree = this.fb.group({
      password: [null, Validators.compose([Validators.required])]
    });*/
  }

  resetPassword() {
    this.http.post('/api/session/users/' + this.userName + '/reset-password', {
      password: this.form.controls['password'].value
    }).subscribe(res => {
      //user has been authenticated - we can allow access
      this.cookieService.set('session_user', this.userName, 1);
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
    })
  }

}
