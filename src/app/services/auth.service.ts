import { Injectable } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { CurrentUserService } from './current-user.service';
import {Subject, Observable, BehaviorSubject} from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {

  userSignedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userSuperAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(public authService: AngularTokenService, private currentUser: CurrentUserService, private cookieService: CookieService) {}

  logOutUser(): Observable <HttpResponse<any>> {

    return this.authService.signOut().pipe(
      map(res => {
        this.currentUser.changeUser(null);
        this.userAdmin$.next(false);
        this.userSuperAdmin$.next(false);
        this.userSignedIn$.next(false);
        return res;
      })
    );
  }

  registerUser(signUpData:  {login: string, password: string, passwordConfirmation: string}): Observable<HttpResponse<any>> {
    return this.authService.registerAccount(signUpData).pipe(
      map(res => {
        this.userSignedIn$.next(true);
        return res;
        }
      )
    );
  }

  logInUser(signInData: {login: string, password: string}): Observable<HttpResponse<any>> {

    return this.authService.signIn(signInData).pipe(
      map(res => {
        setTimeout(() => {
          if (res.body.data.super_admin) {
            this.userSuperAdmin$.next(true);
            this.userAdmin$.next(false);
          }
          if (res.body.data.admin) {
            this.userAdmin$.next(true);
            this.userSuperAdmin$.next(false);
          }
        });
        this.currentUser.changeUser(res.body.data.id);
        this.cookieService.set('current_user_id', res.body.data.id);
        this.userSignedIn$.next(true);
        return res;
      })
    );

  }

  isUserLoggedIn(loggedIn: boolean) { this.userSignedIn$.next(loggedIn); }

}
