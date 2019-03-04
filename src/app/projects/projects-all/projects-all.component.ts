import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CallAlertService } from '../../services/call-alert.service';
import { IsEmptyStringService } from '../../services/is-empty-string.service';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { ShareBusinessesService } from '../../services/share-businesses.service';

import { Project } from '../../interfaces/project';
import { Businesses } from '../../interfaces/businesses';
import { BusinessDomain } from '../../interfaces/business-domain';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-projects-all',
  templateUrl: './projects-all.component.html',
  styleUrls: ['./projects-all.component.scss'],
  providers: [
    CallAlertService,
    IsEmptyStringService,
    FlashHighlightsService,
    ShareBusinessesService
  ]
})
export class ProjectsAllComponent implements OnInit {

  projects:            Project[];
  selectedProject:     Project;
  copySelectedProject: Project;
  displayDialog:       boolean;
  new_project:         string;
  warning              = false;
  warning_text:        string;
  businesses:          Businesses[] = [];
  business_domains:    BusinessDomain[];

  accounts: object[];
  alert: boolean;
  alertType: string;
  alertMessage: string;

  @ViewChild('projectDetails') el: ElementRef;

  constructor(private http: HttpClient,
              private router: Router,
              public rd: Renderer2,
              public isEmptyString: IsEmptyStringService,
              private flashHighlights: FlashHighlightsService,
              private callAlert: CallAlertService) { }

  ngOnInit() {
    const self = this;
    self.http.get(
      environment.serverUrl + '/projects.json'
    ).subscribe(
      (response) => {
        if (response['code'] !== 500) {
          self.projects = response['projects'];
        } else {
          self.callAlert.handler(self, 'warning', response['message'], 2000);
        }
      },
      (response) => {
        self.callAlert.handler(self, 'warning', `Can't load data`, 2000);
      }
    );

    self.http.get(environment.serverUrl + '/business_domains.json'
    ).subscribe(
      response => {
        if (response['business_domains']) {
          self.business_domains = response['business_domains'];

          self.business_domains.forEach(bd => {
            bd.businesses.forEach(b => {
              b.business_domain = bd.label;
              self.businesses.push(b);
            });
          });
        } else {
          self.callAlert.handler(self, 'warning', `Can't load data`, 2000);
        }
      },
      response => {
        self.callAlert.handler(self, 'warning', `Can't load data`, 2000);
      }
    );
  }

  selectProject(project: Project) {
    this.selectedProject = project;
    this.copySelectedProject = Object.assign({}, project);
    this.displayDialog = true;
  }

  goToSteps(project) {
    const self = this;
    self.router.navigate(['/projects/', project['id']]);
  }

  goToQuestions(project) {
    const self = this;
    self.router.navigate(['/project_questions/', project['id']]);
  }

  goToEmailTemplates(project) {
    const self = this;
    self.router.navigate(['/project_email_templates/', project['id']]);
  }

  onDialogHide() {
    this.selectedProject = null;
  }

  hideDetails() {
    const self = this;
    self.selectedProject.name = self.copySelectedProject.name;
  }

  addProject(new_project) {
    const self = this;
    self.projects.forEach((project) => {
      if (project.name === new_project) {
        self.warning = true;
        self.warning_text = 'You entered the name of existing project';
        return;
      }
    });
    if (!self.warning) {
      const params = {};
      params['project'] = {
        name: new_project
      };
      self.http.post(environment.serverUrl + '/projects.json', params
      ).subscribe(
        (response) => {
          if (response['code'] !== 500) {
            self.projects.push({
              id:         response['project']['id'],
              name:       response['project']['name'],
              project_businesses: []
            });
            self.new_project = null;
          } else {
            self.callAlert.handler(self, 'warning', response['message'], 2000);
          }
        },
        (response) => {
          self.callAlert.handler(self, 'warning', `Can't create project`, 2000);
        }
      );
    }
  }

  editProject(project, field_name) {
    const self = this;

    if (field_name === 'name') {
      self.projects.forEach(item => {
        if (item.name === project.name && item.id !== project.id) {
          self.warning = true;
          self.warning_text = 'You entered the name of existing project';
          return;
        }
      });
    }

    if (!self.warning) {
      const params = {};
      params['project'] = {
        [field_name]: project[field_name]
      };
      self.http.patch(environment.serverUrl + '/projects/' + project.id + '.json', params
      ).subscribe(
        (response) => {
          if (response['project']) {
            self.selectedProject[field_name] = response['project'][field_name];
            setTimeout(() => {
              self.flashHighlights.handler(
                self,
                '#' + field_name + '_',
                String(project.id),
                'success-updated'
              );
            });
            this.copySelectedProject = Object.assign({}, response['project']);
          } else {
            self.selectedProject.name = self.copySelectedProject.name;
            self.callAlert.handler(self, 'warning', response['message'], 2000);
          }
        },
        (response) => {
          self.selectedProject.name = self.copySelectedProject.name;
          self.callAlert.handler(self, 'warning', `Can't edit project`, 2000);
        }
      );
    }
  }

  escEditProject () {
    const self = this;
    self.selectedProject.name = self.copySelectedProject.name;
  }

  deleteProject (project) {
    const self = this;
    const i = self.projects.indexOf(self.projects.find(item => item.id === project.id));
    self.http.delete(environment.serverUrl + '/projects/' + project.id + '.json'
    ).subscribe(
      (response) => {
        if (response['code'] !== 500) {
          self.projects.splice(i, 1);
        } else {
          if (response['message'].slice(4, 69) === 'ForeignKeyViolation: ERROR:  update or delete on table "projects"') {
            self.warning = true;
            self.warning_text = 'This project is no empty';
          } else {
            self.callAlert.handler(self, 'warning', response['message'], 2000);
          }
        }
      },
      (response) => {
        self.callAlert.handler(self, 'warning', `Can't delete project`, 2000);
      }
    );
  }

  setRange (object) {
    const self = this;
    const project_id = object['project_id'];
    const label = object['label'];

    const params = {
      [object['field_from']]: object[object['field_from']],
      [object['field_to']]: object[object['field_to']],
    };
    self.http.patch(environment.serverUrl + '/projects/' + project_id + '.json', params
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

  addBusiness(object, project) {
    const self = this;
    const project_id = project['id'];
    let project_businesses = [...project.project_businesses];

    if (object.description) {
      const business_id = object.id;
      const business = self.businesses.find(item => item.id === business_id);

      self.http.post(environment.serverUrl + '/projects/' + project_id + '/add_business.json', { business_id: business_id }
      ).subscribe(
        response => {
          if (response['project_businesses']) {
            project_businesses = response['project_businesses'];

            project.project_businesses = project_businesses;

            self.flashHighlights.handler(self, '#business_list_', String(project_id),
              'success-updated'
            );
          } else {
            self.flashHighlights.handler(self, '#business_list_', String(project_id),
              'failed-update'
            );
          }
        },
        response => {
          self.flashHighlights.handler(self, '#business_list_', String(project_id),
            'failed-update'
          );
        }
      );
    } else if (object.business_domain) {
      const business_domain = self.business_domains.find(bd => bd.label === object.business_domain);
      self.http.post(environment.serverUrl + '/projects/' + project_id + '/add_business_domain.json',
        { business_domain_id: business_domain.id }
      ).subscribe(
        response => {
          if (response['project_businesses']) {
            project_businesses = response['project_businesses'];
            project.project_businesses = project_businesses;
            self.flashHighlights.handler(self, '#business_list_', String(project_id), 'success-updated');
          } else {
            self.flashHighlights.handler(self, '#business_list_', String(project_id), 'failed-update');
          }
        },
        response => {
          self.flashHighlights.handler(self, '#business_list_', String(project_id),
            'failed-update'
          );
        }
      );
    }

  }

  subtractBusiness(obj, project) {
    const self = this;
    const project_id = project['id'];
    let project_businesses = [...project.project_businesses];

    if (obj.business.value.description) {
      self.http.post(environment.serverUrl + '/projects/' + project_id + '/subtract_business.json',
        { business_id: obj.business.value.id }
      ).subscribe(
        response => {
          if (response['project_businesses']) {
            project_businesses = response['project_businesses'];
            project.project_businesses = project_businesses;
            self.flashHighlights.handler(self, '#business_list_', String(project_id),
              'success-updated'
            );
          } else {
            self.flashHighlights.handler(self, '#business_list_', String(project_id),
              'failed-update'
            );
          }
        },
        response => {
          self.flashHighlights.handler(self, '#business_list_', String(project_id),
            'failed-update'
          );
        }
      );
    } else if (obj.business.value.business_domain) {
      const business_domain = self.business_domains.find(bd => bd.label === obj.business.value.business_domain);
      self.http.post(environment.serverUrl + '/projects/' + project_id + '/subtract_business_domain.json',
        { business_domain_id: business_domain.id }
      ).subscribe(
        response => {
          if (response['project_businesses']) {
            project_businesses = response['project_businesses'];
            project.project_businesses = project_businesses;
            self.flashHighlights.handler(self, '#business_list_', String(project_id),
              'success-updated'
            );
          } else {
            self.flashHighlights.handler(self, '#business_list_', String(project_id),
              'failed-update'
            );
          }
        },
        response => {
          self.flashHighlights.handler(self, '#business_list_', String(project_id),
            'failed-update'
          );
        }
      );
    }
  }

  clearBusinesses (project) {
    const self = this;
    const project_id = project['id'];
    let project_businesses = [...project.project_businesses];

    self.http.post(environment.serverUrl + '/projects/' + project_id + '/clear_businesses.json', {  }
    ).subscribe(
      response => {
        if (response['project_businesses']) {
          project_businesses = response['project_businesses'];
          project.project_businesses = project_businesses;
          self.flashHighlights.handler(self, '#business_list_', String(project_id), 'success-updated');
        } else {
          self.flashHighlights.handler(self, '#business_list_', String(project_id), 'failed-update');
        }
      },
      response => {
        self.flashHighlights.handler(self, '#business_list_', String(project_id), 'failed-update');
      }
    );
  }

}
