/* ============================================
 ; Title:  user-details.component.ts
 ; Author: Zach Dahir, Jeff Lintel, Diandra McKenzie
 ; Date:   24 October 2020
 ; Description: user details component
 ===========================================*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from './../../shared/services/user.service';
import { User } from './../../../user.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  userId: string;
  form: FormGroup;
  roles: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.userId = this.route.snapshot.paramMap.get('userId');

    this.userService.findUserById(this.userId).subscribe(res => {
      this.user = res['data'];
    }, err => {
      console.log(err)
    }, () => {
      this.form.controls.firstName.setValue(this.user.firstName);
      this.form.controls.lastName.setValue(this.user.lastName);
      this.form.controls.phoneNumber.setValue(this.user.phoneNumber);
      this.form.controls.address.setValue(this.user.phoneNumber);
      this.form.controls.email.setValue(this.user.email);
    })
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])]
    })
  }

  saveUser() {
    const updatedUser = {} as User;
    updatedUser.firstName = this.form.controls.firstName.value;
    updatedUser.lastName = this.form.controls.lastName.value;
    updatedUser.phoneNumber = this.form.controls.phoneNumber.value;
    updatedUser.address = this.form.controls.address.value;
    updatedUser.email = this.form.controls.email.value;

    this.userService.updateUser(this.userId, updatedUser).subscribe(res => {
      this.router.navigate(['/users'])
    })
  }

  cancel() {
    this.router.navigate(['/users'])
  }

}
