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
import { SwitchProjectService } from '../services/switch-project.service';

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
  tenant_id: number;
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
              private cookieService: CookieService,
              private switchProject: SwitchProjectService) {}

  ngOnInit() {
    const self = this;
    if (self.tokenAuthService.userSignedIn()) {
      self.getUserProps();
    } else {
      self.alert = true;
      self.alertType = 'warning';
      self.alertMessage = `You haven't rights on requested page. Please log in`;
    }
  }

  setCurrentProject(project) {
    this.current_project = project;
    this.passProjectId.changeProject(project);
    this.cookieService.set('project_id', String(project.id));
    if (window.location.href.split(environment.clientUrl)[1] === '/customers') {
      this.switchProject.switchProject(true);
    } else {
      this.router.navigate(['/customers']);
    }
  }

  logOut() {
    this.passProjectId.changeProject(null);
    this.cookieService.delete('project_id');
    this.cookieService.delete('current_user_id');
    this.projects = [];
    this.current_project = null;
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

  presentAuthDialog() {
    this.authDialog.openDialog();
  }

  getUserProps() {
    const self = this;
    self.alert = false;
    self.http.get(environment.serverUrl + '/user_properties.json').subscribe(
      res => {
        self.projects = res['projects'];
        self.tenant_id = res['tenant_id'];
        const project_id = self.cookieService.get('project_id');
        if (project_id) {
          self.current_project = self.projects.find(p => p.id === Number(project_id));
        }
        },
      err => { console.log(err.message); }
    );
  }

}
