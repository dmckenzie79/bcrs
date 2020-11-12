/* ============================================
 ; Title:  base-layout.component.ts
 ; Author: Zach Dahir, Jeff Lintel, Diandra McKenzie
 ; Date:   19 October 2020
 ; Description: base layout component
 ===========================================*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService} from 'ngx-cookie-service'
import { RoleService } from '../services/role.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();
  sessionRole: string;

  constructor(private cookieService: CookieService, private router: Router, private roleService: RoleService) {
    this.sessionRole = this.cookieService.get('session_role');
    console.log(this.sessionRole);
   }

  ngOnInit(): void {
  }


  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/sign-in'])
  }

}
