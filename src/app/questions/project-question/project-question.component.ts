import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { Message, OverlayPanel } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { SelectQuestionListComponent } from '../select-question-list/select-question-list.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-project-question',
  templateUrl: './project-question.component.html',
  styleUrls: ['./project-question.component.scss'],
  providers: [
    FlashHighlightsService,
    MessageService
  ]
})
export class ProjectQuestionComponent implements OnInit {

  questions: any;
  top_questions_path: string;
  questions_before_edit: any;
  originalValue: string;
  project_id: string;
  msgs: Message[] = [];
  return_path = '/projects';
  return_label = 'Return to Steps';

  @ViewChild('ProjectQuestionList') el: ElementRef;
  @ViewChild('q_list') question_list_component: SelectQuestionListComponent;

  constructor(private http: HttpClient,
              private flashHighlights: FlashHighlightsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private rd: Renderer2,
              private messageService: MessageService) { }

  ngOnInit() {
    const self = this;
    const observableFailed = response => alert(response);

    const projectGetSuccess = (response) => {
      self.questions = response['project_questions'];

    };

    const routeSuccess = params => {
      self.project_id = params['id'];
      self.top_questions_path = 'tenant_questions/' + self.project_id;
      self.http.get(environment.serverUrl + '/project_questions/' + self.project_id + '.json'
      ).subscribe(
        projectGetSuccess,
        observableFailed
      );
    };

    self.activatedRoute.params.subscribe(routeSuccess, observableFailed);
  }

  createQuestion (obj) {

    const self = this;
    const project_question = {
      project_id: self.project_id,
      question: obj['question'],
      weight: obj['weight'],
    };

    self.http.post(environment.serverUrl + '/project_questions.json', project_question
    ).subscribe(
      response => {
        if (response['project_question']) {

          project_question['id'] = response['project_question']['id'];

          const question_array = JSON.parse(JSON.stringify(self.questions));
          question_array.unshift(project_question);
          self.questions = JSON.parse(JSON.stringify(question_array));

        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Question`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Question`});
      }
    );
  }

  showQuestions (event, overlaypanel: OverlayPanel) {
    this.question_list_component.getQuestions();
    overlaypanel.visible = true;
  }

  addGeneralQuestions(event, overlaypanel: OverlayPanel) {
    const self = this;
    const ids: number[] = [];
    event.questions.forEach(q => ids.push(q.id));

    self.http.post(environment.serverUrl + '/add_tenant_questions_to_project/' + self.project_id + '.json', { question_ids: ids }
    ).subscribe(
      response => {
        if (response['questions'] && response['questions'].length > 0) {
          const questions = response['questions'];
          const question_array = JSON.parse(JSON.stringify(self.questions));
          questions.forEach(q => {
            const question = {};

            question['id'] = q['id'];
            question['question'] = q['question'];
            question['weight'] = q['weight'];
            question['new_label'] = true;

            question_array.unshift(question);
          });
          self.questions = JSON.parse(JSON.stringify(question_array));
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `There isn't any new questions`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load Data`});
      }
    );
    self.question_list_component.clearSelectedQuestions();
    overlaypanel.visible = false;
  }

  saveProjectQuestion (object) {
    const self = this;

    const question = self.questions.find(q => q['id'] === object.id);

    self.http.patch(environment.serverUrl + '/project_questions/' + object.id + '.json', object.params
    ).subscribe(
      response => {
        if (response['project_question']) {

          object.dom_prop = object.dom_prop === 'question' ? 'content' : object.dom_prop;

          self.flashHighlights.handler(self, '#' + object.dom_prop + 'Cell-', String(object.id), 'success-updated');
          question['new_label'] = false;
        } else {
          self.flashHighlights.handler(self, '#' + object.dom_prop + 'Cell-', String(object.id), 'failed-update');
          self.questions = JSON.parse(JSON.stringify(self.questions_before_edit));
        }
      },
      response => {
        self.flashHighlights.handler(self, '#' + object.dom_prop + 'Cell-', String(object.id), 'failed-update');
        self.questions = JSON.parse(JSON.stringify(self.questions_before_edit));
      }
    );
  }

  removeQuestion(obj) {
    const self = this;

    const question_id = obj.question_id;

    self.http.delete(environment.serverUrl + '/project_questions/' + question_id + '.json'
    ).subscribe(
      response => {
        if (response['message'] === 'Question successfully deleted') {
          self.questions = self.questions.filter(q => q['id'] !== question_id);
          self.messageService.add({severity: 'success', summary: 'Success', detail: response['message']});
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Question`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Question`});
      }
    );
  }

}
