import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Message        } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { OpenStepsService } from '../../services/open-steps.service';
import {CTenantStep, Step} from '../../interfaces/step';
import { DropdownItem } from '../../interfaces/dropdown-item';
import {MatSelectionList} from '@angular/material';
import { CallAlertService } from '../../services/call-alert.service';

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

  @Input() step: Step;
  @Input() header: string;
  @Input() submit_button: string;
  @Input() model_roles: object;
  @Input() back_to_parent_path: string;
  @Input() edit_basic_data: boolean;
  @Output() submitForm:  EventEmitter<object> = new EventEmitter<object>();
  @Output() onBlur:  EventEmitter<object> = new EventEmitter<object>();

  constructor(activatedRoute: ActivatedRoute,
              router: Router,
              private http: HttpClient,
              private fb: FormBuilder,
              private openSteps: OpenStepsService,
              private messageService: MessageService,
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
  }

  onSubmit(data) {
    const self = this;

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

    data['step_role'] = self.model_roles[self.createForm.get('step_role').value];
    self.submitForm.emit(data);
    self.createForm.get('name').setValue('');
    self.createForm.get('goal').setValue('');
    self.createForm.get('description').setValue('');
    self.createForm.get('step_role').setValue(null);
    self.createForm.get('time').setValue(null);
    self.createForm.get('budget').setValue(null);
  }

  blur(prop) {
    const self = this;
    if (self.step.id < 1) return;

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
    self.onBlur.emit( obj );
  }

  blurRequired(prop) {
    const self = this;
    this.createForm.controls[prop].markAsPristine();
    if (self.createForm.get(prop).value.length <  1) return;
    self.blur(prop);
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
