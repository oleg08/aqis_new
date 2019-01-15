import { Component, OnInit, Renderer2, ElementRef, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, OverlayPanel } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { SelectQuestionListComponent } from '../select-question-list/select-question-list.component';
import { Question } from '../../interfaces/question';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-aqis-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
  providers: [
    FlashHighlightsService,
    MessageService
  ]
})
export class QuestionListComponent implements OnInit {

  questions: Question[];
  originalQuestions: Question[];
  originalValue: string;
  msgs: Message[] = [];

  displayDialog: boolean;
  question: Question = new PrimeQuestion();
  selectedQuestion: Question;
  newQuestion: boolean;
  return_path: string ;
  return_label = 'Go To Steps';

  super_admin = false;

  @ViewChild('QuestionsList') el: ElementRef;
  @ViewChild('q_list') question_list_component: SelectQuestionListComponent;

  constructor(private http: HttpClient,
              private flashHighlights: FlashHighlightsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private rd: Renderer2,
              private messageService: MessageService) { }

  ngOnInit() {
    const self = this;

    self.http.get(`${environment.serverUrl}/questions.json`
    ).subscribe(
      response => {
        if (response['questions']) {
          self.questions = response['questions'];
          self.originalQuestions = JSON.parse(JSON.stringify(self.questions));
          self.super_admin = response['super_admin'];
          self.return_path = self.super_admin ? '/steps' : '/tenant_steps';
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load questions`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load questions`});
      }
    );
  }

  addQuestion(obj) {
    const self = this;
    self.question = new PrimeQuestion();
    self.question.content = obj['content'];
    const questions = [...self.questions];
    const params = {
      content: obj['content'],
    };

    self.http.post(environment.serverUrl + '/questions.json', params
    ).subscribe(
      response => {
        if (response['question']) {
          self.question.id = response['question']['id'];
          questions.unshift(self.question);
          self.questions = questions;
          self.originalQuestions = JSON.parse(JSON.stringify(self.questions));
          self.question = null;
        }
        else self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Question`});
      },
      response => self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Question`})
    );
  }

  showQuestions (event, overlaypanel: OverlayPanel) {
    this.question_list_component.getQuestions();
    overlaypanel.toggle(event);
  }

  addGeneralQuestions(event, overlaypanel: OverlayPanel) {
    const self = this;
    const questions = [...self.questions];
    const ids: number[] = [];
    event.questions.forEach(q => ids.push(q.id));

    self.http.post('/add_general_questions.json', { question_ids: ids }
    ).subscribe(
      response => {
        if (response['questions'].length > 0) {
          const g_questions: Question[] = response['questions'];
          g_questions.forEach(g_question => {
            const question = new PrimeQuestion();
            question.id = g_question.id;
            question.content = g_question.content;
            // question.weight = g_question.weight;
            question.new_label = true;

            questions.push(question);

          });
          self.questions = questions;
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `There isn't new questions`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load questions`});
      }
    );
    self.question_list_component.clearSelectedQuestions();
    overlaypanel.visible = false;
  }

  saveQuestion(object) {
    const self = this;
    const questions = [...self.questions];
    const question: Question = questions.find(q => q.id === object.id);

    self.http.patch('/questions/' + object.id + '.json', object.params
    ).subscribe(
      response => {
        if (response['question']) {
          self.originalQuestions = JSON.parse(JSON.stringify(self.questions));
          question.new_label = false;

          setTimeout( () => {
            self.flashHighlights.handler(self, '#' + object.dom_prop + 'Cell-', String(object.id),
              'success-updated'
            );
          }, 0);
        } else {
          self.questions = JSON.parse(JSON.stringify(self.originalQuestions));

          setTimeout( () => {
            self.flashHighlights.handler(self, '#' + object.dom_prop + 'Cell-', String(object.id),
              'failed-update'
            );
          }, 0);
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't update Question`});
        }
      },
      response => {
        self.questions = JSON.parse(JSON.stringify(self.originalQuestions));
        setTimeout( () => {
          self.flashHighlights.handler(self, '#' + object.dom_prop + 'Cell-', String(object.id),
            'failed-update'
          );
        }, 0);
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't update Question`});
      }
    );
  }

  removeQuestion(obj) {
    const self = this;
    const question_id = obj['question_id'];
    let questions = [...self.questions];

    self.http.delete(environment.serverUrl + '/questions/' + question_id + '.json'
    ).subscribe(
      response => {
        if (response['message'] === 'Question successfully deleted') {
          questions = questions.filter(q => q.id !== question_id);
          self.questions = questions;
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete Question`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete Question`});
      }
    );
  }

}

class PrimeQuestion implements Question {

  constructor(public id?,
              public content?,
              public category_id?,
              public tenant_id?,
              public category_label?,
              public new_label?,
              public created_at?,
              public updated_at?) {}
}
