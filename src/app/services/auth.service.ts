import { Injectable } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { CurrentUserService } from './current-user.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable()
export class AuthService {

  userSignedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userSuperAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userAssistant$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userEditBasicData$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  redirectUrl: string;

  constructor(public authService: AngularTokenService,
              private currentUser: CurrentUserService,
              private router: Router) {
    this.authService.validateToken().subscribe((res) => {
      if (res.success) {
        this.userSignedIn$.next(true);

        const current_user: User = res.data;
        this.currentUser.changeUser(String(current_user.id));

        this.userSuperAdmin$.next(res.data.super_admin);
        this.userAdmin$.next(res.data.admin);
        this.userAssistant$.next(res.data.assistant);
        this.userEditBasicData$.next(res.data.edit_basic_data);

        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl]);
        }
      } else {
        this.userSignedIn$.next(false);
        this.userAdmin$.next(false);
        this.userSuperAdmin$.next(false);
        this.userAssistant$.next(false);
        this.userEditBasicData$.next(false);
      }
    });
  }

  logOutUser(): Observable <HttpResponse<any>> {

    return this.authService.signOut().pipe(
      map(res => {
        this.currentUser.changeUser(null);
        this.userAdmin$.next(false);
        this.userSuperAdmin$.next(false);
        this.userSignedIn$.next(false);
        this.userAssistant$.next(false);
        this.userEditBasicData$.next(false);
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
          if (res.body.data.assistant) {
            this.userAssistant$.next(true);
            this.userSuperAdmin$.next(false);
          }
          if (res.body.data.edit_basic_data) {
            this.userEditBasicData$.next(true);
            this.userSuperAdmin$.next(false);
          }
        });
        this.currentUser.changeUser(res.body.data.id);
        this.userSignedIn$.next(true);

        return res;
      })
    );

  }

  isUserLoggedIn(loggedIn: boolean) { this.userSignedIn$.next(loggedIn); }

}
