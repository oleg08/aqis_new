import { Component, enableProdMode, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';

enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aqis-new';
  constructor (private http: HttpClient,
               public authToken: AuthService,
               public cookieService: CookieService) {
  }
  ngOnInit() {
    if (this.cookieService.get('login')) {
      const val: string = this.cookieService.get('login');
      this.authToken.logInUser({ login: val.split(';')[0], password: val.split(';')[1] }).subscribe(
        res => {},
        err => {
          console.error('auth-error - ', err);
        }
      );
    }
    document.body.classList.add('bg-img');
  }
}
