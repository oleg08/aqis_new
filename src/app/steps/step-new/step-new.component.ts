import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Message        } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { OpenStepsService } from '../../services/open-steps.service';
import { Step } from '../../interfaces/step';
import { DropdownItem } from '../../interfaces/dropdown-item';
import { environment } from '../../../environments/environment';

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
  days_int = true;
  msgs: Message[] = [];
  prev_time: number;

  @Input() step: Step;
  @Input() header: string;
  @Input() submit_button: string;
  @Input() model_roles: object;
  @Input() back_to_parent_path: string;
  @Output() submitForm:  EventEmitter<object> = new EventEmitter<object>();
  @Output() onBlur:  EventEmitter<object> = new EventEmitter<object>();

  constructor(activatedRoute: ActivatedRoute,
              router: Router,
              private http: HttpClient,
              private fb: FormBuilder,
              private openSteps: OpenStepsService,
              private messageService: MessageService) {
    this.activatedRoute = activatedRoute;
    this.router = router;
  }

  ngOnInit() {
    const self = this;

    if (self.step.id === 0) setTimeout(() => self.days_int = true);

    self.prev_time = Math.round(JSON.parse(JSON.stringify(self.step.time)));

    if (self.step.time < 1) {
      self.step.time = Math.round(self.step.time * 24);
      self.days_int = false;
    } else {
      self.step.time = Math.round(self.step.time);
    }

    self.createForm = self.fb.group({
      'name':          new FormControl('', Validators.required),
      'goal':          new FormControl(''),
      'description':   new FormControl(''),
      'step_role':     new FormControl('', Validators.required),
      'time':          new FormControl('', Validators.pattern(/^\d{0,5}$/)),
      'days_interval': new FormControl(''),
      'budget':        new FormControl('')
    });

    self.roles.push({ label: 'Select Role', value: '' });
    Object.keys(self.model_roles).forEach(key => {
      self.roles.push({ label: key, value: key });
    });
  }

  onSubmit(data) {
    const self = this;

    if (self.days_int) {
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

    data['step_role'] = self.model_roles[self.step.step_role];
    self.submitForm.emit(data);
    self.step.name = '';
    self.step.goal = '';
    self.step.description = '';
    self.step.step_role = null;
    self.step.time = null;
    self.step.budget = null;
  }

  blur(data, prop) {
    const self = this;
    if (self.step.id < 1) return;

    const obj: object = {};
    if (prop === 'time') {
      if (!self.days_int) {
        if (data >= 24) {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Must be less than 24'});
          self.step.time = JSON.parse(JSON.stringify(self.prev_time));
          return;
        }
        data = (data / 24).toFixed(5);
      } else {
        if (data >= 100) {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Must be less than 100'});
          self.step.time = JSON.parse(JSON.stringify(self.prev_time));
          return;
        }
      }
    }

    if (prop === 'step_role') obj[prop] = self.model_roles[data];
    else obj[prop] = data;

    if (self.createForm.controls[prop] && self.createForm.controls[prop].errors) return;
    self.prev_time = JSON.parse(JSON.stringify(self.step.time));
    self.onBlur.emit( obj );
  }

  blurRequired(data: string, prop) {
    const self = this;
    this.createForm.controls[prop].markAsPristine();
    if (data.length <  1) return;
    self.blur(data, prop);
  }

  changeDaysInt() {
    const self = this;

    if (self.createForm.controls['time'] && self.createForm.controls['time'].errors) {
      setTimeout(() => {
        self.days_int = !self.days_int;
      });
      return;
    }

    if (self.days_int) {
      if (self.step.time >= 100) {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Must be less than 100'});
        return;
      }
    } else {
      if (self.step.time >= 24) {
        setTimeout(() => {
          self.days_int = true;
        });
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Must be less than 24'});
        return;
      }
    }
    const value = self.days_int ? self.step.time : (self.step.time / 24).toFixed(5);
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

}
