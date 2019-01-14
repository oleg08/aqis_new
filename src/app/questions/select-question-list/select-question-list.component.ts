import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../../interfaces/question';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-select-question-list',
  templateUrl: './select-question-list.component.html',
  styleUrls: ['./select-question-list.component.scss']
})
export class SelectQuestionListComponent implements OnInit {
  questions: Question[];
  selectedQuestions: Question[];

  @Input() questions_path: string;
  @Input() q_prop1: string;
  @Input() for_step: number;
  @Output() addQuestions:  EventEmitter<object> = new EventEmitter<object>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const self = this;
    if (!self.q_prop1) self.q_prop1 = 'content';
  }

  getQuestions () {
    const self = this;

    const questions_key = self.questions_path.split('/')[0];

    let url: string;
    if (self.for_step) {
      if (self.questions_path.split('/').length > 1) {
        url = '/' + self.questions_path.split('/')[0] + '_for_step/' + self.for_step + '.json';
      } else url = '/' +  self.questions_path + '_for_step/' + self.for_step + '.json';
    } else {
      url = environment.serverUrl + '/sliced_' + self.questions_path + '.json';
    }

    self.http.get(url
    ).subscribe(
      response => {
        if (response[questions_key]) {
          self.questions = response[questions_key];
        }
      },
      response => {}
    );
  }

  addSelected(event) {
    const self = this;
    self.addQuestions.emit({ event: event, questions: self.selectedQuestions });
  }

  clearSelectedQuestions() {
    const self = this;
    self.selectedQuestions = [];
  }

}
