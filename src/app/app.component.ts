import { Component, enableProdMode } from '@angular/core';
import {AuthService} from './services/auth.service';
import {HttpClient} from '@angular/common/http';
import {AngularTokenService} from 'angular-token';
import { CurrentUserService } from './services/current-user.service';
import { CookieService } from 'ngx-cookie-service';

import {Message, MessageService} from 'primeng/primeng';
import {User} from './interfaces/user';
import {Project} from './interfaces/project';

// enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CookieService]
})
export class AppComponent {

  title = 'aqis-new';
  current_user: User;
  projects: Project[];
  msgs:                Message[] = [];
  constructor (public authService: AuthService,
               public tokenService: AngularTokenService,
               private currentUser: CurrentUserService,
               private cookieService: CookieService) {
  }

  ngOnInit() {
    this.tokenService.validateToken().subscribe(
      response => {
        if (response.success) {
          this.current_user = response.data;
          this.currentUser.changeUser(String(this.current_user.id));
          this.cookieService.set('current_user_id', String(this.current_user.id));
          this.authService.isUserLoggedIn(true);

          setTimeout(() => {
            this.authService.userSuperAdmin$.next(this.current_user.super_admin);
            this.authService.userAdmin$.next(this.current_user.admin);
          });
        } else {
          this.authService.isUserLoggedIn(false);
          this.msgs = [{severity: 'warning', summary: 'Warning', detail: `You are unauthorized`}];
        }
      }
    );
    document.body.classList.add('bg-img');
  }
}
