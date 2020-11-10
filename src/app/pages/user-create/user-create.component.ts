/* ============================================
 ; Title:  security-question-create.ts
 ; Author: Professor Krasso
 ; Date:   24 October 2020
 ; Modified By: Diandra McKenzie
 ; Description: Security Question Create file
 ===========================================*/

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from './../../shared/interfaces/user.interface';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user: User;
  userId: string;
  form: FormGroup;
  roles: any;


  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])]
    });
  }
    createUser() {
      const newUser = {} as User;
      newUser.userName = this.form.controls.userName.value,
      newUser.password = this.form.controls.password.value,
      newUser.firstName = this.form.controls.firstName.value,
      newUser.lastName = this.form.controls.lastName.value,
      newUser.phoneNumber = this.form.controls.phoneNumber.value,
      newUser.address = this.form.controls.address.value,
      newUser.email = this.form.controls.email.value,

      this.userService.createUser(newUser).subscribe(res => {
        this.router.navigate(['/users'])
      }, err => {
        console.log(err);
      })
    }

      cancel() {
        this.router.navigate(['/users']);
      }

}
