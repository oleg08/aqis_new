import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { GetKeywordService } from '../google-signin/get-keyword.service';

export interface LoginData {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private getKeywordSrv: GetKeywordService,
    public authService: AuthService
  ) { }

  GoogleAuth() {
    // return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  AuthLogin(provider) {
    const self = this;
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        if (result.additionalUserInfo) {
          const email: string = result.additionalUserInfo.profile['email'];
          let psw: string;
          self.getKeywordSrv.get(email).then(keyword => psw = keyword).then(res => {
            self.freeLogin({ login: email, password: psw });
          });
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  freeLogin(data: LoginData) {
    this.authService.logInUser(data)
      .subscribe(res => {
        window.location.reload(); }
      );
  }
}
