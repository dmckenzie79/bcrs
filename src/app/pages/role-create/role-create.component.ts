/* ============================================
 ; Title:  role-create.component.ts
 ; Author: Professor Krasso
 ; Date:   6 November 2020
 ; Modified By: Diandra McKenzie, Jeff Lintel, Zach Dahir
 ; Description: Role creation page
 ===========================================*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../shared/services/role.service';
import { Role } from '../../shared/interfaces/role.interface';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {

   form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private roleService: RoleService) { }

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    });
  }

  //create new role
  create() {
    const newRole = {
      text: this.form.controls['text'].value
    } as Role

    this.roleService.createRole(newRole).subscribe(res => {
      this.router.navigate(['/roles']);
    }, err => {
      console.log(err);
    })
  }

  //cancel role creation
  cancel() {
    this.router.navigate(['/roles']);
  }
}
