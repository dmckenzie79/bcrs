/* ============================================
 ; Title:  role-details.component.ts
 ; Author: Professor Krasso
 ; Date:   6 November 2020
 ; Modified By: Diandra McKenzie, Jeff Lintel, Zach Dahir
 ; Description: Role update page
 ===========================================*/

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleService } from 'src/app/shared/services/role.service';
import { Role } from '../../shared/interfaces/role.interface';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {

  form: FormGroup;
  role: Role;
  roleId: string;

  constructor(private fb: FormBuilder, private router: Router, private RoleService: RoleService, private route: ActivatedRoute) {
    this.roleId = this.route.snapshot.paramMap.get('roleId');

    //call findrole api and pass in role id
    this.RoleService.findRoleById(this.roleId).subscribe(res => {
      this.role = res['data'];
      console.log(this.role)
    }, err => {
      console.log(err);
    }, () => {
      this.form.controls['text'].setValue(this.role.text);
    })
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    });
  }

  //save updated role
  save() {
    const updatedRole = {
      text: this.form.controls['text'].value
    } as Role;

    this.RoleService.updateRole(this.roleId, updatedRole).subscribe(res => {
      this.router.navigate(['/roles']);
    }, err => {
      console.log(err);
    })
  }

  //cancel updated role
  cancel() {
    this.router.navigate(['/roles']);
  }

}
