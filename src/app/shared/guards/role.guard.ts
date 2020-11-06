/**
 * Title: role.guard.ts
 * Author: Professor Krasso
 * Date: 5 November 2020
 * Modified By: Diandra McKenzie
 * Description: Auth Guard file
 */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RoleService } from './../services/role.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService, private roleService: RoleService) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.roleService.findUserRole(this.cookieService.get('session_user')).pipe(map(res =>
      {
        if (res['data'].role === 'admin')
        {
          return true;
        }
        else
        {
          this.router.navigate(['/']);
          return false;
        }
      }
      ));
  }

}
