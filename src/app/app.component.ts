import { Component, enableProdMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularTokenService } from 'angular-token';

enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aqis-new';
  constructor (private http: HttpClient,
               private authToken: AngularTokenService) {

    // this.authToken.signIn({ login: 'super@admin.org', password: 'super-password' }).subscribe(
    //   res => {
    //     console.log('auth-response - ', res);
    //   },
    //   err => {
    //     console.error('auth-error - ', err);
    //   }
    // );
  }
}
