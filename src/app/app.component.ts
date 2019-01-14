import { Component, enableProdMode } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { AngularTokenService } from 'angular-token';

import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/primeng';
import {environment} from '../environments/environment';
import { User } from './interfaces/user';

enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aqis-new';
  current_user: User;
  msgs:                Message[] = [];
  constructor (public authService: AuthService,
               public tokenService: AngularTokenService,
               private http: HttpClient,
               private messageService: MessageService) {
  }
  ngOnInit() {
    this.tokenService.validateToken().subscribe(
      response => {
        if (response.success) {
          this.current_user = response.data;
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
