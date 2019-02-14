import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularTokenService } from 'angular-token';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminOrSuperAdminGuard implements CanActivate {

  constructor (private authTokenService: AngularTokenService, private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authTokenService.userSignedIn() && (this.authService.userSuperAdmin$.getValue() || this.authService.userAdmin$.getValue())) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
  
}
