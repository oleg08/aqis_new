import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Message, OverlayPanel } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { OpenStepsService } from '../../services/open-steps.service';
import {CTenantStep, Step} from '../../interfaces/step';
import { DropdownItem } from '../../interfaces/dropdown-item';
import { MatSelectionList } from '@angular/material/list';
import { CallAlertService } from '../../services/call-alert.service';
import { GetEmailTemplatesService } from '../../services/get-email-templates.service';
import { EmailTemplates } from '../../interfaces/email-templates';

@Component({
  selector: 'app-aqis-step-new',
  templateUrl: './step-new.component.html',
  styleUrls: ['./step-new.component.scss']
})
export class StepNewComponent implements OnInit {

  activatedRoute: ActivatedRoute;
  router: Router;
  createForm: FormGroup;
  name: string;
  goal: string;
  description: string;
  date: Date;
  budget: number;
  roles: DropdownItem[] = [];
  msgs: Message[] = [];
  prev_time: number;
  updateChildren = false;
  showBelongedSteps = false;
  selectedSteps: CTenantStep[];
  alert = false;
  alertType: string;
  alertMessage: string;
  prev_val: string;
  email_templates: EmailTemplates[];
  selectedEmailTemplate: EmailTemplates;

  @Input() step: Step;
  @Input() header: string;
  @Input() submit_button: string;
  @Input() model_roles: object;
  @Input() back_to_parent_path: string;
  @Input() edit_basic_data: boolean;
  @Input() list_name: object;
  @Input() current_project_id: number;
  @Output() submitForm:  EventEmitter<object> = new EventEmitter<object>();
  @Output() onBlur:  EventEmitter<object> = new EventEmitter<object>();

  constructor(activatedRoute: ActivatedRoute,
              router: Router,
              private http: HttpClient,
              private fb: FormBuilder,
              private openSteps: OpenStepsService,
              private messageService: MessageService,
              private getEmailTemplates: GetEmailTemplatesService,
              private callAlert: CallAlertService) {
    this.activatedRoute = activatedRoute;
    this.router = router;
  }

  ngOnInit() {
    const self = this;

    self.createForm = self.fb.group({
      'name':          new FormControl('', Validators.required),
      'goal':          new FormControl(''),
      'description':   new FormControl(''),
      'step_role':     new FormControl('', Validators.required),
      'time':          new FormControl('', Validators.pattern(/^\d{0,5}$/)),
      'days_interval': new FormControl(''),
      'budget':        new FormControl('')
    });

    if (self.step.id === 0) {
      setTimeout(() => self.createForm.get('days_interval').setValue(true));
    } else {
      self.createForm.get('name').setValue(self.step.name);
      self.createForm.get('goal').setValue(self.step.goal);
      self.createForm.get('description').setValue(self.step.description);
      self.createForm.get('step_role').setValue(self.step.step_role);
      self.createForm.get('budget').setValue(self.step.budget);
    }

    self.prev_time = Math.round(JSON.parse(JSON.stringify(self.step.time)));

    if (self.step.time < 1) {
      self.createForm.get('time').setValue(Math.round(self.step.time * 24));
      self.createForm.get('days_interval').setValue(false);
    } else {
      self.createForm.get('time').setValue(Math.round(self.step.time));
      self.createForm.get('days_interval').setValue(true);
    }

    self.roles.push({ label: 'Select Role', value: '' });
    Object.keys(self.model_roles).forEach(key => {
      self.roles.push({ label: key, value: key });
    });
    self.getGeneralEmailTemplates();
  }

  isIntervalValid (data) {
    const self = this;
    data['step_role'] = self.model_roles[self.createForm.get('step_role').value];

    if (self.createForm.get('days_interval').value) {
      if (data.time >= 100) {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Interval must be less than 100 days'});
        return;
      }
    } else {
      if (data.time >= 24) {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Interval must be less than 24 hours'});
        return;
      }
      data.time = (data.time / 24).toFixed(5);
    }
  }

  clearForm () {
    const self = this;
    self.createForm.get('name').setValue('');
    self.createForm.get('goal').setValue('');
    self.createForm.get('description').setValue('');
    self.createForm.get('step_role').setValue(null);
    self.createForm.get('time').setValue(null);
    self.createForm.get('budget').setValue(null);
  }

  createAndPerform (data) {
    const self = this;
    data['email_template_id'] = self.selectedEmailTemplate.id;
    self.isIntervalValid(data);
    self.submitForm.emit(data);
    self.selectedEmailTemplate = null;
    self.clearForm();
  }

  onSubmit(data) {
    const self = this;
    self.isIntervalValid(data);
    self.submitForm.emit(data);
    self.clearForm();
  }

  getGeneralEmailTemplates() {
    const self = this;
    if (!self.current_project_id && !self.list_name) { return; }
    const project_id = self.current_project_id ? self.current_project_id : self.list_name['id'];
    self.getEmailTemplates.get(`project_email_templates/${project_id}`).subscribe(
      data => {
        if (data['project_email_templates']) {
          self.email_templates = data['project_email_templates'];
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        }
      },
      data => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
      }
    );
  }

  addEmailTemplates(event, overlaypanel: OverlayPanel) {
    console.log(event);
    overlaypanel.hide();
  }

  focus(prop) {
    const self = this;
    if (self.step.id < 1) return;
    self.prev_val = JSON.parse(JSON.stringify(self.createForm.get(prop).value));
  }

  blur(prop) {
    const self = this;
    if (self.step.id < 1 || self.prev_val === self.createForm.get(prop).value) return;

    const obj: object = {};
    if (prop === 'time') {
      const val = self.createForm.get('time').value;
      if (!self.createForm.get('days_interval').value) {
        if (val >= 24) {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Must be less than 24'});
          self.createForm.get('time').setValue(self.prev_time);
          return;
        }
        obj[prop] = (self.createForm.get('time').value / 24).toFixed(5);
      } else {
        if (val >= 100) {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Must be less than 100'});
          self.createForm.get('time').setValue(self.prev_time);
          return;
        }
        obj[prop] = self.createForm.get(prop).value;
      }
    } else {
      if (prop === 'step_role') { obj[prop] = self.model_roles[self.createForm.get(prop).value]; }
      else {obj[prop] = self.createForm.get(prop).value; }
    }

    if (self.createForm.controls[prop] && self.createForm.controls[prop].errors) return;
    self.prev_time = JSON.parse(JSON.stringify(self.createForm.get('time').value));
    if (self.selectedSteps) {
      obj['update_c_tenant_steps'] = self.updateChildren;
      const c_tenant_step_ids: number[] = [];
      self.selectedSteps.forEach(s => {
        c_tenant_step_ids.push(s.id);
      });
      obj['c_tenant_step_ids'] = c_tenant_step_ids;
    }
    self.prev_val = null;
    self.onBlur.emit( obj );
  }

  blurRequired(prop) {
    const self = this;
    this.createForm.controls[prop].markAsPristine();
    if (self.createForm.get(prop).value.length <  1) return;
    self.blur( prop);
  }

  changeDaysInt() {
    const self = this;

    const time = self.createForm.get('time');
    if (time && time.errors) {
      setTimeout(() => {
        self.createForm.get('days_interval').setValue(!self.createForm.get('days_interval').value);
      });
      return;
    }

    if (self.createForm.get('days_interval').value) {
      if (time.value >= 100) {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Must be less than 100'});
        return;
      }
    } else {
      if (time.value >= 24) {
        setTimeout(() => {
          self.createForm.get('days_interval').setValue(true);
        });
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Must be less than 24'});
        return;
      }
    }
    const value = self.createForm.get('days_interval').value ? time.value : (time.value / 24).toFixed(5);
    self.onBlur.emit({ time: value });
  }

  returnToSteps () {
    const self = this;
    let url: string;
    if (self.back_to_parent_path) url = self.back_to_parent_path;
    else url = '/steps';
    self.openSteps.changeOpenStepsState(true);               // to open Lead Qualification on customer-details
    setTimeout(() => self.router.navigate([url]));
  }

  toggleUpdateAll (selected: MatSelectionList) {
    const self = this;
    if (self.updateChildren) {
      selected.selectAll();
    } else {
      self.selectedSteps = null;
    }
  }

  displayBelongedSteps () {
    this.showBelongedSteps = true;
  }

  selectAllSteps(selected: MatSelectionList) {
    selected.selectAll();
  }

  deselectAllSteps (selected: MatSelectionList) {
    selected.deselectAll();
  }

  updateAlert(updated_steps_count) {
    this.callAlert.handler(this,
      'success',
      `${updated_steps_count} companies' steps were updated`,
      2000);
  }

}
