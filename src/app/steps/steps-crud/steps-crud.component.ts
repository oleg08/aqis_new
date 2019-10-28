import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';  // Validators, FormControl
import { CallAlertService } from '../../services/call-alert.service';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/primeng';
import { Step } from '../../interfaces/step';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-aqis-steps-crud',
  templateUrl: './steps-crud.component.html',
  styleUrls: ['./steps-crud.component.scss'],
  animations: [
    trigger('newLabel', [
      state('inactive', style({
        transform: 'scale(1)',
        backgroundColor: '#bcf442'
      })),
      state('active', style({
        transform: 'scale(1.1)',
        backgroundColor: '#41c4f4'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ]),
  ],

  providers: [
    CallAlertService,
    FlashHighlightsService,
    MessageService,
    ConfirmationService
  ]
})
export class StepsCrudComponent implements OnInit {
  createForm:       FormGroup;
  msgs: Message[] = [];
  originalSteps: Step[];
  label_state = 'active';
  step: Step;

  @Input() steps: Step[];
  @Input() model_roles: object;
  @Input() super_admin: boolean;
  @Input() active: boolean;
  @Input() back_to_steps_path: string;
  @Input() list_name: object;
  @Output() submitForm:  EventEmitter<object> = new EventEmitter<object>();
  @Output() deleteItem:  EventEmitter<object> = new EventEmitter<object>();
  @Output() showItem:    EventEmitter<object> = new EventEmitter<object>();
  @Output() reorder:     EventEmitter<object> = new EventEmitter<object>();
  @Output() addGeneralSteps: EventEmitter<object> = new EventEmitter<object>();
  @Output() updateStep: EventEmitter<object> = new EventEmitter<object>();

  constructor(private http: HttpClient,
              private callAlert: CallAlertService,
              private flashHighlights: FlashHighlightsService,
              private fb: FormBuilder,
              private messageService: MessageService,
              private confirmationService: ConfirmationService
              ) { }

  ngOnInit() {
    const self = this;
    self.step = {
      id: 0,
      name: '',
      description: '',
      step_role: null,
      order: null,
      time: null,
      budget: null
    };
  }

  onSubmit(value: object) {
    this.submitForm.emit(value);
  }

  showDetails(step) {
    const self = this;
    self.showItem.emit({ data: step });
  }

  deleteClick(step) {
    const self = this;
    self.deleteItem.emit({step: step});
  }

  reorderList(steps) {
    this.reorder.emit({ data: steps });
  }

  addSteps(event) {
    this.addGeneralSteps.emit({ event: event });
  }

  setActive(value, step_id) {
    const self = this;

    const step: Step = self.steps.find(s => s.id === step_id);

    if (!self.active) {
      step.active = !value;
      return;
    }

    if (value) {
      const active_steps = self.steps.filter(st => st.active === true && st.id !== step_id);

      if (step.step_role === 'Machine') {
        self.confirmActive(step, active_steps);
      } else {
        self.updateStep.emit({ value: { active: true }, step_id: step_id });
        active_steps.forEach(s => {
          self.updateStep.emit({ value: { active: false }, step_id: s.id });
          s.active = false;
        });
      }
    } else {
      self.updateStep.emit({ value: { active: false }, step_id: step_id });
    }
  }

  confirmActive(step, active_steps) {
    const self = this;
    self.confirmationService.confirm({
      message: 'Confirmation of this action will send email to the customer.',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        active_steps.forEach(st => {
          self.updateStep.emit({ value: { active: false }, step_id: st.id });
          st.active = false;
        });
        self.updateStep.emit({ value: { active: true }, step_id: step.id });
      },
      reject: () => {
        step.active = false;
      }
    });
  }

  setWeight(value, step_id) {
    this.updateStep.emit({ value: { weight: value }, step_id: step_id });
  }

}
