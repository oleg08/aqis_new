import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CallAlertService } from '../../services/call-alert.service';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { Project } from '../../interfaces/project';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [CallAlertService, FlashHighlightsService]
})
export class UserDetailsComponent implements OnInit {

  id: any;
  user: object;
  projects: Project[];
  projects_1: Project[];
  users_projects: Project[];
  users_projects_1: Project[];
  draggedProject: Project;
  draggedUserProject: Project;

  @ViewChild('projectsForm', { static: true }) el: ElementRef;

  constructor(private activatedRoute:  ActivatedRoute,
              private http:            HttpClient,
              private callAlert:       CallAlertService,
              private flashHighlights: FlashHighlightsService,
              public rd:       Renderer2) { }

  ngOnInit() {
    const self = this;

    const observableFailed = function (response) {
      self.callAlert.handler(self, 'warning', `Can't edit event`, 2000);
    };

    const userGetSuccess = function (response) {
      self.user           = response['user'];
      self.projects       = response['projects'];
      self.users_projects = response['users_projects'];

    };

    const routeSuccess = function (params) {
      self.http.get(environment.serverUrl + '/users/' + params['id'] + '.json'
      ).subscribe(
        userGetSuccess,
        observableFailed
      );
    };

    self.activatedRoute.params.subscribe(routeSuccess, observableFailed);
  }

  dragProjectStart(event, project: Project) {
    this.draggedProject = project;
  }

  dragUserProjectStart(event, project: Project) {
    this.draggedUserProject = project;
  }

  dropProject(event) {
    const self = this;
    if (self.draggedProject) {
      self.http.post(
        environment.serverUrl + '/projects/' + self.draggedProject.id + '/add.json', {user_id: self.user['id']}
      ).subscribe(
        (response) => {
          if (response['code'] === 500) {
            self.callAlert.handler(self, 'warning', response['message'], 2000);
          }
        },
        (response) => {
          self.callAlert.handler(self, 'warning', `Can't load data`, 2000);
        }
      );
      const draggedProjectIndex = self.findProjectIndex(self.draggedProject);
      self.users_projects = [...self.users_projects, self.draggedProject];
      self.projects = self.projects.filter((val, i) => i !== draggedProjectIndex);
      self.draggedProject = null;
    }
  }

  dropUserProject(event) {
    const self = this;
    if (self.draggedUserProject) {
      self.http.post(
        environment.serverUrl + '/projects/' + self.draggedUserProject.id + '/subtract.json', {user_id: self.user['id']}
      ).subscribe(
        (response) => {
          if (response['code'] === 500) {
            self.callAlert.handler(self, 'warning', response['message'], 2000);
          }
        },
        (response) => {
          self.callAlert.handler(self, 'warning', `Can't load data`, 2000);
        }
      );
      const draggedUserProjectIndex = self.findUserProjectIndex(self.draggedUserProject);
      self.projects = [...self.projects, self.draggedUserProject];
      self.users_projects = self.users_projects.filter((val, i) => i !== draggedUserProjectIndex);
      self.draggedUserProject = null;
    }
  }

  dragProjectEnd(event) {
    this.draggedProject = null;
  }

  dragUserProjectEnd(event) {
    this.draggedUserProject = null;
  }

  findProjectIndex(project: Project) {
    let index = -1;
    for (let i = 0; i < this.projects.length; i++) {
      if (project.id === this.projects[i].id) {
        index = i;
        break;
      }
    }
    return index;
  }

  findUserProjectIndex(project: Project) {
    let index = -1;
    for (let i = 0; i < this.users_projects.length; i++) {
      if (project.id === this.users_projects[i].id) {
        index = i;
        break;
      }
    }
    return index;
  }

  setRange (object) {
    const self = this;
    const project_id = object['project_id'];
    const label = object['label'];

    object['user_id'] = self.user['id'];

    self.http.patch(environment.serverUrl + '/projects/' + project_id + '/set_range.json', object
    ).subscribe(
      (response) => {

        if (response['project']) {
          self.flashHighlights.handler(self, '#' + label +  'Id_', String(project_id),
            'success-updated'
          );
        } else {
          self.flashHighlights.handler(self, '#' + label +  'Id_', String(project_id),
            'failed-update'
          );
        }
      },
      (response) => {
        self.flashHighlights.handler(self, '#' + label +  'Id_', String(project_id),
          'failed-update'
        );
      }
    );
  }

}
