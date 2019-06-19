import { Component, OnInit, ElementRef, Renderer2, ViewChild, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

import { SelectQuestionListComponent } from '../../questions/select-question-list/select-question-list.component';
import { EmailTemplatesOrderListComponent } from '../../email-templates/email-templates-order-list/email-templates-order-list.component';

import { Message        } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { GetEmailTemplatesService } from '../../services/get-email-templates.service';

import { Step } from '../../interfaces/step';
import { Question } from '../../interfaces/question';
import { Answer } from '../../interfaces/answer';
import { EmailTemplates } from '../../interfaces/email-templates';
import { OverlayPanel } from 'primeng/primeng';


@Component({
  selector: 'app-aqis-step-details-actions',
  templateUrl: './step-details-actions.component.html',
  styleUrls: ['./step-details-actions.component.scss'],
  providers: [
    FlashHighlightsService,
    MessageService,
    GetEmailTemplatesService
  ]
})
export class StepDetailsActionsComponent implements OnInit {

  msgs: Message[] = [];
  step: Step = null;
  originalStep: Step;
  model_roles: object;
  g_templates: EmailTemplates[];
  email_templates_key: any;
  questions_key: string;
  edit_basic_data: boolean;

  @Input() path:           string;
  @Input() templates_path: string;
  @Input() questions_path: string;
  @Input() q_prop1:        string;
  @Input() back_to_parent_path: string;

  @ViewChild('stepDetails') el: ElementRef;
  @ViewChild('q_list') question_list_component: SelectQuestionListComponent;
  @ViewChild('templates_order_list') templates_order_list: EmailTemplatesOrderListComponent;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private rd: Renderer2,
              private http: HttpClient,
              private flashHighlights: FlashHighlightsService,
              private getEmailTemplates: GetEmailTemplatesService,
              private sanitizer: DomSanitizer,
              private messageService: MessageService) { }

  ngOnInit() {
    const self = this;

    self.email_templates_key = self.templates_path.split('/')[0];
    self.questions_key = self.questions_path.split('/')[0];

    const observableFailed = function (response) {
      self.flashHighlights.handler(self, '#step-', String(self.step.id), 'failed-update');
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
    };

    const stepGetSuccess = function (response) {
      if (response[self.path.slice(0, -1)]) {

        if (self.path === 'project_steps') {
          self.edit_basic_data = response['edit_basic_data'];
        }

        self.model_roles = response['roles'];

        self.step = response[self.path.slice(0, -1)];
        if (response['ordered'] && response['ordered'].length > 0) {
          const ordered = response['ordered'];
          ordered.forEach(o => {
            const template: EmailTemplates = self.step[self.email_templates_key].find(et => et.id === o.id);
            template.order = o.order;
          });

          self.step[self.email_templates_key].sort((a, b) => a.order - b.order);
        }

        if (response['q_ordered'] && response['q_ordered'].length > 0) {
          const ordered = response['q_ordered'];
          ordered.forEach(o => {
            const question: Question = self.step[self.questions_key].find(q => q.id === o.id);
            question.order = o.order;
          });

          self.step[self.questions_key].sort((a, b) => a.order - b.order);
        }

        self.originalStep = JSON.parse(JSON.stringify(self.step));
      } else {
        self.flashHighlights.handler(self, '#step-', String(self.step.id), 'failed-update');
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
      }
    };

    const routeSuccess =  (params) => {

      const params_id: string = decodeURIComponent(self.router.url).split('/')[2].split(';')[0];

      self.http.get(environment.serverUrl + '/' + self.path + '/' + params_id + '.json'
      ).subscribe(
        stepGetSuccess,
        observableFailed
      );
    };

    self.activatedRoute.params.subscribe(routeSuccess, observableFailed);
  }

  getGTemplates() {
    const self = this;
    self.getEmailTemplates.get(self.email_templates_key + '_for_step/' + self.step.id).subscribe(
      data => {
        if (data[self.email_templates_key]) {
          self.g_templates = data[self.email_templates_key];
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        }
      },
      data => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
      }
    );
  }

  getGeneralQuestions() {
    this.question_list_component.getQuestions();
  }

  editStep(data) {
    const self = this;

    self.http.patch(environment.serverUrl + '/' + self.path + '/' + self.step.id + '.json', data
    ).subscribe(
      response => {
        if (response[self.path.slice(0, -1)]) {
          self.flashHighlights.handler(self, '#step-' + Object.keys(data)[0] + '-', String(self.step.id), 'success-updated');
          self.originalStep = JSON.parse(JSON.stringify(response[self.path.slice(0, -1)]));
        } else {
          self.step = JSON.parse(JSON.stringify(self.originalStep));
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't update Step`});
        }
      },
      response => {
        self.step = JSON.parse(JSON.stringify(self.originalStep));
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't update Step`});
      }
    );
  }

  addQuestion(event) {
    const self = this;
    const question: Question = event;

    if (!self.step[self.questions_key].find(q => q[self.q_prop1] === event[self.q_prop1])) {

      self.http.post(environment.serverUrl + '/' + self.path.slice(0, -1) + '_add_question/' + self.step.id + '.json', event
      ).subscribe(
        response => {
          if (response[self.path.slice(0, -1)]) {
            question.answers = [];
            question.id = response[self.questions_key.slice(0, -1)]['id'];
            const questions: Question[] = JSON.parse(JSON.stringify(self.step[self.questions_key]));
            question.order = questions.length + 1;
            questions.push(question);
            self.step[self.questions_key] = JSON.parse(JSON.stringify(questions));

            self.originalStep = JSON.parse(JSON.stringify(self.step));
          } else {
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't add Question`});
          }
        },
        response => {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't add Question`});
        }
      );
    } else {
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Question already exists`});
      return;
    }
  }

  removeQuestion(question: Question) {
    const self = this;

    self.http.post(environment.serverUrl + '/' + self.path.slice(0, -1) + '_remove_question/' + self.step.id + '.json',
      { question_id: question.id }
    ).subscribe(
      response => {
        if (response[self.path.slice(0, -1)]) {
          const questions = [...self.step[self.questions_key]];

          questions.filter(q => q.order > question.order).forEach(qs => {
            qs.order -= 1;
          });

          self.step[self.questions_key] = questions.filter(q => q.id !== question.id);
          self.originalStep = JSON.parse(JSON.stringify(self.step));
        } else {
          self.step = JSON.parse(JSON.stringify(self.originalStep));
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't remove question`});
        }
      },
      response => {
        self.step = JSON.parse(JSON.stringify(self.originalStep));
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't remove question`});
      }
    );


  }

  addQuestions(data, overlaypanel: OverlayPanel) {
    const self = this;
    const questions: Question[] = [...self.step[self.questions_key]];

    const new_q_ids: Array<number> = [] = self.newIds(questions, data.questions);

    if (new_q_ids.length < 1) {
      self.question_list_component.clearSelectedQuestions();
      self.messageService.add({severity: 'warn', summary: 'Warning',
        detail: `You haven't selected Questions that don't belong to this Step`});
      return;
    }

    self.http.post(environment.serverUrl + '/' + self.path.slice(0, -1) + '_add_general_questions/' + self.step.id + '.json',
      { [self.questions_key.slice(0, -1) + '_ids']: new_q_ids}
    ).subscribe(
      response => {
        if (response[self.path.slice(0, -1)]) {

          let order: number = questions.length + 1;
          new_q_ids.forEach(q_id => {
            const new_question: Question = data.questions.find(q => q.id === q_id);
            new_question.order = order;
            new_question.answers = [];
            new_question.new_label = true;
            questions.push(new_question);
            order += 1;
          });

          self.step[self.questions_key] = questions;

          overlaypanel.hide();
          self.question_list_component.clearSelectedQuestions();

          self.originalStep = JSON.parse(JSON.stringify(self.step));
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't add Email Templates`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't add Email Templates`});
      }
    );
  }

  reorderQuestions(question_ids) {
    const self = this;


    const params = { [self.questions_key.slice(0, -1) + '_ids']: question_ids };

    self.http.post(environment.serverUrl + '/' + self.path.slice(0, -1) + '_reorder_questions/' + self.step.id + '.json', params
    ).subscribe(
      response => {
        if (response[self.path.slice(0, -1)]) {
          question_ids.forEach(id => {
            const question: Question = self.step[self.questions_key].find(q => q.id === id);
            question.order = question_ids.indexOf(id) + 1;
          });
          self.originalStep = JSON.parse(JSON.stringify(self.step));
        } else {
          self.step = JSON.parse(JSON.stringify(self.originalStep));
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't reorder Questions`});
        }
      },
      response => {
        self.step = JSON.parse(JSON.stringify(self.originalStep));
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't reorder Questions`});
      }
    );

  }

  showQuestions(event, overlaypanel: OverlayPanel) {
    overlaypanel.toggle(event.event);
  }

  addAnswer(answer: Answer) {
    const self = this;

    answer.c_tenant_step_id = self.step.id;

    self.http.post(environment.serverUrl + '/answers.json', answer
    ).subscribe(
      response => {
        if (response['answer']) {
          const question: Question = self.step[self.questions_key].find(q => q.id === answer.customer_tenant_question_id);
          answer.id = response['answer']['id'];
          question.answers.push(answer);
          self.originalStep = JSON.parse(JSON.stringify(self.step));
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Answer`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Answer`});
      }
    );
  }

  failUpdateAnswer (object) {
    const self = this;
    const question: Question = self.step[self.questions_key].find(q => q.id === object.question_id);
    setTimeout(() => {
      question.answers[0].content = object.prev_content;
    });
    self.flashHighlights.handler(self, '#answer_', String(object.answer_id), 'failed-update');
  }

  updateAnswer (object) {
    const self = this;

    self.http.patch(environment.serverUrl + '/answers/' + object.answer_id + '.json', { content: object.content }
    ).subscribe(
      response => {
        if (response['answer']) {
          self.flashHighlights.handler(self, '#answer_', String(object.answer_id), 'success-updated');
        } else {
          self.failUpdateAnswer(object);
        }
      },
      response => {
        self.failUpdateAnswer(object);
      }
    );
  }

  deleteAnswer (answer: Answer) {
    const self = this;

    self.http.delete(environment.serverUrl + '/answers/' + answer.id + '.json'
    ).subscribe(
      response => {
        if (response['message'] === 'Answer successfully deleted') {
          const question: Question = self.step[self.questions_key].find(q => q.id === answer.customer_tenant_question_id);
          question.answers = [];
          self.originalStep = JSON.parse(JSON.stringify(self.step));
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete Answer`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete Answer`});
      }
    );
  }

  addEmailTemplate (template: EmailTemplates) {
    const self = this;
    const email_templates: EmailTemplates[] = [...self.step[self.email_templates_key]];
    const g_email_templates: EmailTemplates[] = [...self.g_templates];

    if (!self.step[self.email_templates_key].find(et => et.name === template.name)) {

      self.http.post(environment.serverUrl + '/' + self.path.slice(0, -1) + '_add_e_template/' + self.step.id + '.json', template
      ).subscribe(
        response => {
          if (response[self.path.slice(0, -1)]) {

            template.id = response[self.email_templates_key.slice(0, -1)]['id'];
            template.order = email_templates.length + 1;
            email_templates.push(template);
            g_email_templates.push(template);
            self.step[self.email_templates_key] = email_templates;
            self.g_templates = g_email_templates;

            self.originalStep = JSON.parse(JSON.stringify(self.step));
          } else {
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't add Email Template`});
          }
        },
        response => {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't add Email Template`});
        }
      );
    } else {
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Email Template already exists`});
    }
  }

  addEmailTemplates(templates: EmailTemplates[]) {
    const self = this;
    const email_templates: EmailTemplates[] = [...self.step[self.email_templates_key]];

    const new_t_ids: Array<number> = self.newIds(email_templates, templates);

    if (new_t_ids.length < 1) {
      self.templates_order_list.clear();
      self.messageService.add({severity: 'warn', summary: 'Warning',
        detail: `You haven't selected Email Templates that don't belong to this Step`});
      return;
    }

    self.http.post(environment.serverUrl + '/' + self.path.slice(0, -1) + '_add_general_e_templates/' + self.step.id + '.json',
      { [self.email_templates_key.slice(0, -1) + '_ids']: new_t_ids}
    ).subscribe(
      response => {
        if (response[self.path.slice(0, -1)]) {
          let order: number = email_templates.length;
          new_t_ids.forEach(id => {
            const email_template: EmailTemplates = self.g_templates.find(e_template => e_template.id === id);
            email_template.new_label = true;
            order += 1;
            email_template.order = order;
            self.step[self.email_templates_key].push(email_template);
          });

          self.templates_order_list.clear();

          self.originalStep = JSON.parse(JSON.stringify(self.step));

        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't add Questions`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't add Questions`});
      }
    );
  }

  removeTemplate (email_template: EmailTemplates) {
    const self = this;

    self.http.post(environment.serverUrl + '/' + self.path.slice(0, -1) + '_remove_e_template/' + self.step.id + '.json',
      { [self.email_templates_key.slice(0, -1) + '_id']: email_template.id }
    ).subscribe(
      response => {
        if (response[self.path.slice(0, -1)]) {
          let email_templates: EmailTemplates[] = [...self.step[self.email_templates_key]];
          email_templates.filter(et => et.order > email_template.order).forEach(template => {
            template.order -= 1;
          });
          email_templates = email_templates.filter(et => et.id !== email_template.id);

          self.step[self.email_templates_key] = email_templates;
          self.originalStep = JSON.parse(JSON.stringify(self.step));
        } else {
          self.step = JSON.parse(JSON.stringify(self.originalStep));
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't remove question`});
        }
      },
      response => {
        self.step = JSON.parse(JSON.stringify(self.originalStep));
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't remove question`});
      }
    );
  }

  newIds (current_items, new_items) {
    const all_ids: Array<number> = [];
    current_items.forEach(t => {
      all_ids.push(t.id);
    });

    const new_ids: Array<number> = [];
    new_items.forEach(i => {
      if (all_ids.indexOf(i.id) === -1) { new_ids.push(i.id); }
    });
    return new_ids;
  }

  reorderEmailTemplates(template_ids) {
    const self = this;
    const params = { [self.email_templates_key.slice(0, -1) + '_ids']: template_ids };

    self.http.post(environment.serverUrl + '/' + self.path.slice(0, -1) + '_reorder_e_templates/' + self.step.id + '.json', params
    ).subscribe(
      response => {
        if (response[self.path.slice(0, -1)]) {
          template_ids.forEach(id => {
            const template: EmailTemplates = self.step[self.email_templates_key].find(et => et.id === id);
            template.order = template_ids.indexOf(id) + 1;
          });
          self.originalStep = JSON.parse(JSON.stringify(self.step));
        } else {
          self.step = JSON.parse(JSON.stringify(self.originalStep));
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't reorder Email Templates`});
        }
      },
      response => {
        self.step = JSON.parse(JSON.stringify(self.originalStep));
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't reorder Email Templates`});
      }
    );

  }

}
