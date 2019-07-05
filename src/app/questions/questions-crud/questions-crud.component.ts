import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

import { CallAlertService } from '../../services/call-alert.service';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { Message         } from 'primeng/primeng';
import { MessageService  } from 'primeng/components/common/messageservice';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Question } from '../../interfaces/question';

@Component({
  selector: 'app-aqis-questions-crud',
  templateUrl: './questions-crud.component.html',
  styleUrls: ['./questions-crud.component.scss'],
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
    MessageService
  ]
})
export class QuestionsCrudComponent implements OnInit {

  msgs: Message[] = [];
  newValue1:        string;
  newValue2:        string;
  current_field:    string;
  current_obj_id:   number;
  originalQuestions: Question[];
  saved = false;
  label_state = 'active';
  cols: any[];

  @Input() questions: Question[];
  @Input() return_button: string;
  @Input() return_label: string;
  @Input() header_label: string;
  @Input() select_general_questions: boolean;
  @Input() editable: boolean;
  @Input() q_prop1: string;
  @Input() q_prop2: string;
  @Input() q_prop3: string;
  @Input() generalQuestions: boolean;

  @Output() saveObject: EventEmitter<object> = new EventEmitter<object>();
  @Output() addObject: EventEmitter<object> = new EventEmitter<object>();
  @Output() removeObject: EventEmitter<object> = new EventEmitter<object>();
  @Output() addGeneralQuestions: EventEmitter<object> = new EventEmitter<object>();

  constructor(private http: HttpClient,
              private router: Router,
              private flashHighlights: FlashHighlightsService,
              private callAlert: CallAlertService,
              private messageService: MessageService) { }

  ngOnInit() {
    const self = this;
    self.cols = [
      { field: self.q_prop1, header: 'Questions' }
    ];
    if (self.q_prop2) {
      self.cols.push({ field: self.q_prop2, header: 'Weight' });
    }
  }

  initEdit (event, questions) {
    const self = this;

    self.originalQuestions = JSON.parse(JSON.stringify(self.questions));

    self.saved = false;
    self.current_field = event.field;
    self.current_obj_id = event.data.id;
  }

  esc() {
    const self = this;
    self.questions = JSON.parse(JSON.stringify(self.originalQuestions));
  }

  save(event, blur?) {
    const self = this;

    const val = blur ? event.data.content : event.originalTarget.value;

    const obj = {
      id: self.current_obj_id,
      dom_prop: self.current_field,
      params: {
        [self.current_field]: val
      }
    };

    self.saveObject.emit(obj);
    self.saved = true;
  }

  quitUpdate(event) {
    if (!this.saved) this.esc();
  }

  addGeneralObjects (event) {
    const self = this;
    self.addGeneralQuestions.emit({ event: event });
    setInterval(() => {
      self.label_state = 'active';
      setTimeout(() => {
        self.label_state = 'inactive';
      }, 1000);
    }, 2000);
  }

  addItem(question) {
    const self = this;

    const new_item: Question = {
      [self.q_prop1]:     question.model,
    };
    self.addObject.emit(new_item);
    self.newValue1 = null;
    self.newValue2 = null;
  }

  removeItem(event, question) {
    const self = this;
    self.removeObject.emit({question_id: question.id});
  }

  setPristine(model) {
    model.control.markAsPristine();
  }

  returnTo() {
    const self = this;
    // if (self.return_label.split(' ')[0] === 'Go') window.location.href = self.return_button;
    // else self.router.navigate([self.return_button]);
    self.router.navigate([self.return_button]);
  }

}
