import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';
import { Project } from '../interfaces/project';
import { PassProjectIdService } from '../services/pass-project-id.service';
import { CookieService } from 'ngx-cookie-service';
import { CallAlertService } from '../services/call-alert.service';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  providers: [CallAlertService]
})
export class ToolbarComponent implements OnInit {
  options: any;
  current_user: User;
  projects: Project[] = [];
  current_project: Project;
  alert = false;
  alertType: string;
  alertMessage: string;

  @ViewChild('authDialog') authDialog: AuthDialogComponent;

  constructor(public authService: AuthService,
              private http: HttpClient,
              private tokenAuthService: AngularTokenService,
              private router: Router,
              private passProjectId: PassProjectIdService,
              private callAlert: CallAlertService,
              private cookieService: CookieService) {}

  ngOnInit() {
    if (this.tokenAuthService.userSignedIn()) {
      this.getUserProps();
    } else {
      this.alert = true;
      this.alertType = 'warning';
      this.alertMessage = `You haven't rights on requested page. Please log in`;
    }
  }

  setCurrentProject(project) {
    this.current_project = project;
    this.passProjectId.changeProject(project);
    this.cookieService.set('project_id', String(project.id));
    this.router.navigate(['/customers']);
  }

  logOut() {
    this.cookieService.delete('project_id');
    this.cookieService.delete('current_user_id');
    this.projects = [];
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

  presentAuthDialog() {
    this.authDialog.openDialog();
  }

  getUserProps() {
    this.alert = false;
    this.http.get(environment.serverUrl + '/user_properties.json').subscribe(
      res => { this.projects = res['projects']; },
      err => { console.log(err.message); }
    );
  }

}
