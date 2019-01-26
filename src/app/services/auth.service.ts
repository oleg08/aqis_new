import { Injectable } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { CurrentUserService } from './current-user.service';
import { Subject, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {

  userSignedIn$: Subject<boolean> = new Subject();
  userSuperAdmin$: Subject<boolean> = new Subject();
  userAdmin$: Subject<boolean> = new Subject();

  constructor(public authService: AngularTokenService, private currentUser: CurrentUserService, private cookieService: CookieService) {}

  logOutUser(): Observable <HttpResponse<any>> {

    return this.authService.signOut().pipe(
      map(res => {
        this.currentUser.changeUser(null);
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
        if (res.body.data.super_admin) this.userSuperAdmin$.next(true);
        if (res.body.data.admin) this.userAdmin$.next(true);
        this.currentUser.changeUser(res.body.data.id);
        this.cookieService.set('current_user_id', res.body.data.id);
        this.userSignedIn$.next(true);
        return res;
      })
    );

  }

  isUserLoggedIn(loggedIn: boolean) { this.userSignedIn$.next(loggedIn); }

}
