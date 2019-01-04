import { Injectable } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Subject, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  userSignedIn$: Subject<boolean> = new Subject();

  constructor(public authService: AngularTokenService) {

    this.authService.validateToken().subscribe(
      res => res.status === 200 ? this.userSignedIn$.next(res.json().success) : this.userSignedIn$.next(false)
    );
  }

  logOutUser(): Observable <HttpResponse<any>> {

    return this.authService.signOut().pipe(
      map(res => {
          this.userSignedIn$.next(false);
          return res;
        }
      )
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
        this.userSignedIn$.next(true);
        return res;
      })
    );

  }

}
