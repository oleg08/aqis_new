import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CallAlertService } from '../../services/call-alert.service';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { Message, OverlayPanel } from 'primeng/primeng';
import { MessageService  } from 'primeng/components/common/messageservice';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Question } from '../../interfaces/question';


@Component({
  selector: 'app-aqis-questions-order-list',
  templateUrl: './questions-order-list.component.html',
  styleUrls: ['./questions-order-list.component.scss'],
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
export class QuestionsOrderListComponent implements OnInit {

  msgs: Message[] = [];
  saved = false;
  label_state = 'active';
  @Input() questions: Question[];
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
  @Output() reorderQuestions: EventEmitter<object> = new EventEmitter<object>();

  constructor(private http: HttpClient,
              private flashHighlights: FlashHighlightsService,
              private callAlert: CallAlertService) { }

  ngOnInit() {
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
      [self.q_prop1]:     question.value,
    };
    self.addObject.emit(new_item);
  }

  removeItem(question) {
    const self = this;
    self.removeObject.emit( question );
  }

  setPristine(model) {
    model.control.markAsPristine();
  }

  reorder(questions: Question[]) {
    const ids: Array<number> = [];
    questions.forEach(et => ids.push(et.id));
    this.reorderQuestions.emit(ids);
  }

}
