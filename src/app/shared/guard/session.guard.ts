/**
 * Title: session.guard.ts
 * Author: Diandra McKenzie
 * Date: 21 October 2020
 * Description: Auth Guard file
 */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private router: Router, private cookieServer: CookieService) {
  }
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const sessionUser = this.cookieServer.get('session_user');

    if (sessionUser) {
      return true;
  } else {

    this.router.navigate(['/session/sign-in']);

    return false;
  }

}

}

