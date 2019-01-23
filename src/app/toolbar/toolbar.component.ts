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

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  options: any;
  current_user: User;
  projects: Project[] = [];
  current_project: Project;

  @ViewChild('authDialog') authDialog: AuthDialogComponent;

  constructor(public authService: AuthService,
              private http: HttpClient,
              private router: Router,
              private passProjectId: PassProjectIdService,
              private cookieService: CookieService) {}

  ngOnInit() {
    this.http.get(environment.serverUrl + '/user_properties.json').subscribe(
      res => {
        this.projects = res['projects'];
      },
      err => {
        alert(err.message);
      }
    );
  }

  googleAuthenticate() {
    window.location.href = `${environment.serverUrl}/request_to_google`;
  }

  setCurrentProject(project) {
    this.current_project = project;
    this.passProjectId.changeProjectID(project.id);
    this.cookieService.set('project_id', String(project.id));
    this.router.navigate(['/customers']);
  }

  logOut() {
    this.cookieService.delete('project_id');
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

  presentAuthDialog(mode?: 'login'| 'register') {
    this.authDialog.openDialog(mode);

  }

}
