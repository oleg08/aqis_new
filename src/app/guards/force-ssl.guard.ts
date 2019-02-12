import { Injectable, isDevMode } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForceSslGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if ((!isDevMode()) && (location.protocol !== 'https:')) {
      location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
      return false;
    }
    return true;
  }
}
