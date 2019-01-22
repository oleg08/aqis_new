import { Component, Renderer2, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GetStepsService } from '../../services/get-steps.service';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { PassProjectIdService } from '../../services/pass-project-id.service';
import { CookieService } from 'ngx-cookie-service';
import { Message, OverlayPanel } from 'primeng/primeng';
import { MessageService } from 'primeng/primeng';

import { Step } from '../../interfaces/step';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-aqis-steps-list',
  templateUrl: './steps-list.component.html',
  styleUrls: ['./steps-list.component.scss'],
  providers: [GetStepsService, FlashHighlightsService, MessageService]
})
export class StepsListComponent implements OnInit {
  router: Router;
  activatedRoute: ActivatedRoute;
  steps: Step[];
  model_roles: object;
  top_steps: Step[];
  originalSteps: Step[];
  originalValue: string;
  msgs: Message[] = [];
  current_project_id: number|string;

  displayDialog: boolean;
  step: Step = new PrimeStep();

  super_admin = false;
  data_key: any;
  data_key_sliced: any;
  step_id: any;

  @Input() path:           string;
  @Input() steps_path:     string;
  @Input() top_steps_path: string;
  @Input() active:         boolean;
  @ViewChild('StepsList') el: ElementRef;

  constructor(router: Router,
              activatedRoute:          ActivatedRoute,
              private http:            HttpClient,
              private rd:              Renderer2,
              private messageService:  MessageService,
              private stepsService:    GetStepsService,
              private flashHighlights: FlashHighlightsService,
              private passProjectId:   PassProjectIdService,
              private cookieService:   CookieService) {
    this.router = router;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit() {
    const self = this;

    self.data_key = self.path.split('/')[0];
    let url = `${environment.serverUrl}/${self.path}.json`;

    if (self.data_key === 'c_tenant_step') {
      self.data_key_sliced = self.data_key;
      self.passProjectId.currentProjectID.subscribe(project_id => self.current_project_id = project_id);
      if (!self.current_project_id) {
        self.current_project_id = self.cookieService.get('project_id');
      }
      if (self.current_project_id) { url += `?project_id=${self.current_project_id}`; }
    } else {
      self.data_key_sliced = self.data_key.slice(0, -1);
    }

    self.http.get(url).subscribe(
      response => {
        if (response[self.data_key]) {
          self.model_roles = response['roles'];
          self.steps = response[self.data_key];

          self.steps.sort((a, b) => a.order - b.order);
          if (response['super_admin']) { self.super_admin = true; }
          self.originalSteps = JSON.parse(JSON.stringify(self.steps));
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
      }
    );
  }

  createStep (data) {
    const self = this;
    self.http.post(environment.serverUrl + '/' + self.path + '.json', data
    ).subscribe(
      response => {
        if (response[self.data_key_sliced]) {
          const step: Step = response[self.data_key_sliced];
          self.steps.push(step);
          self.originalSteps = JSON.parse(JSON.stringify(self.steps));
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create step`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create step`});
      }
    );
  }

  showGeneralSteps(event, overlaypanel: OverlayPanel) {
    const self = this;
    self.stepsService.getSteps('sliced_' + self.top_steps_path).then(steps => self.top_steps = steps);
    overlaypanel.toggle(event.event);
  }

  addGeneralSteps(event, overlaypanel: OverlayPanel) {
    const self = this;

    const steps: Step[] = [...self.steps];
    overlaypanel.visible = false;

    self.http.post(environment.serverUrl + '/add_general_to_' + self.path + '.json', { step_ids: event.step_ids }
    ).subscribe(
      response => {
        if (response['new_' + self.data_key]) {
          const general_steps: Step[] = response['new_' + self.data_key];

          general_steps.forEach(step => {
            steps.push(step);
          });
          self.steps = steps;
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load steps`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load steps`});
      }
    );

  }

  showStep (data) {
    let url: string;
    const queryParams: object = {};
    const parent_path: string = this.path.split('/')[1];
    if (this.data_key === 'project_list_steps') {
      queryParams['parent_path'] = parent_path;
      url = '/project_steps';
    } else if (this.data_key === 'c_tenant_step') {
      url = '/c_tenant_steps';
      queryParams['parent_path'] = parent_path;
      queryParams['customer_tenant_id'] = data.data.customer_tenant_id;
    } else { url = '/steps'; }

    this.router.navigate([url, data.data.id, queryParams]);
  }

  deleteStep(obj) {
    const self = this;

    self.http.delete(environment.serverUrl + '/' + self.data_key + '/' + obj.step.id + '.json'
    ).subscribe(
      response => {
        if (response['message'] === 'Step successfully deleted') {
          self.steps = self.steps.filter(step => step.id !== obj.step.id);
          const steps = self.steps.filter(step => step.order > obj.step.order);
          steps.forEach(step => step.order -= 1);

          self.originalSteps = JSON.parse(JSON.stringify(self.steps));
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete step`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete step`});
      }
    );
  }

  reorderSteps(obj) {
    const self = this;
    const steps: Step[] = obj.data;
    const ids: Array<number> = [];
    steps.forEach(s => {
      ids.push(s.id);
      const step: Step = self.steps.find(st => st.id === s.id);
      step.order = steps.indexOf(s) + 1;
    });

    self.http.post(environment.serverUrl + '/reorder_' + self.path + '.json', { ids: ids }
    ).subscribe(
      response => {
        if (response['message'] === 'Steps successfully reordered') {
          self.messageService.add({severity: 'success', summary: 'Success', detail: response['message']});

          self.originalSteps = JSON.parse(JSON.stringify(self.steps));
        } else {
          self.steps = JSON.parse(JSON.stringify(self.originalSteps));
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't reorder steps`});
        }
      },
      response => {
        self.steps = JSON.parse(JSON.stringify(self.originalSteps));
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't reorder steps`});
      }
    );
  }

  updateStep(object) {
    const self = this;

    const step: Step = self.steps.find(st => st.id === object.step_id);
    self.http.patch(environment.serverUrl + '/c_tenant_steps/' + object.step_id + '.json', object.value
    ).subscribe(
      response => {
        if (response['c_tenant_step']) {
          step.weight = response['c_tenant_step']['weight'];
          self.flashHighlights.handler(self, '#step-active-section-', String(object.step_id), 'success-updated');
        } else {
          self.flashHighlights.handler(self, '#step-active-section-', String(object.step_id), 'failed-update');
        }
      },
      response => {
        self.flashHighlights.handler(self, '#step-active-section-', String(object.step_id), 'failed-update');
      }
    );
  }

}

class PrimeStep implements Step {

  constructor(public id?,
              public name?,
              public description?,
              public order?,
              public time?,
              public role?,
              public budget?,
              public active?,
              public questions?,
              public created_at?,
              public updated_at?) {}
}
