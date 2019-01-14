import { Component, OnInit, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CallAlertService } from '../../services/call-alert.service';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { Message, OverlayPanel } from 'primeng/primeng';
import { MessageService  } from 'primeng/components/common/messageservice';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Question } from '../../interfaces/question';
import { Answer } from '../../interfaces/answer';

@Component({
  selector: 'app-aqis-customer-tenant-questions-order-list',
  templateUrl: './customer-tenant-questions-order-list.component.html',
  styleUrls: ['./customer-tenant-questions-order-list.component.scss'],
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
export class CustomerTenantQuestionsOrderListComponent implements OnInit {

  msgs: Message[] = [];
  saved = false;
  selectedQuestion: object;
  prev_content: string;
  current_q_id: number;
  label_state = 'active';
  active_answer: object | boolean = {};

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
  @Output() addAnswer: EventEmitter<object> = new EventEmitter<object>();
  @Output() updateAnswer: EventEmitter<object> = new EventEmitter<object>();
  @Output() deleteAnswer: EventEmitter<object> = new EventEmitter<object>();

  constructor(private http: HttpClient,
              private flashHighlights: FlashHighlightsService,
              private callAlert: CallAlertService) {
    this.initializeSelectedQuestion();
  }

  ngOnInit() {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const self = this;
    if (self.active_answer && event.key === 'Escape') {
      self.active_answer[self.current_q_id] = false;
      const question: Question = self.questions.find(q => q.id === self.current_q_id);
      question.answers[0].content = self.prev_content;
    }
  }

  activateAnswer(content) {
    setTimeout(() => {
      const self = this;
      self.active_answer = {};
      self.active_answer[self.current_q_id] = true;
      const input: HTMLElement = document.getElementById(`answer-input-${self.current_q_id}`);
      input.focus();
      self.setPrevAnswer(content);
    });
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

  nullifySelectedQuestion() {
    this.selectedQuestion       = {
      id: null,
      content: null,
      customer_tenant_id: null,
    };
  }

  initializeSelectedQuestion() {
    this.nullifySelectedQuestion();
    this.current_q_id = null;
  }

  setCurrentQuestion(question_id) {
    const self = this;
    self.current_q_id = question_id;
  }

  createAnswer(answer, overlaypanel: OverlayPanel) {
    const obj = {
      customer_tenant_question_id: this.current_q_id,
      content: answer.content_input
    };
    this.addAnswer.emit(obj);
    overlaypanel.visible = false;
  }

  setPrevAnswer(content) {
    const self = this;
    self.prev_content = JSON.parse(JSON.stringify(content));
  }

  saveAnswer(model, answer_id, question_id) {
    const self = this;

    self.updateAnswer.emit({
      content:      model.viewModel,
      prev_content: self.prev_content,
      answer_id:    answer_id,
      question_id:  question_id
    });
    self.active_answer = false;
  }

  removeAnswer (answer: Answer, question_id) {
    answer.customer_tenant_question_id = question_id;
    this.deleteAnswer.emit(answer);
  }

}
