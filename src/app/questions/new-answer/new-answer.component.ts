import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-aqis-new-answer',
  templateUrl: './new-answer.component.html',
  styleUrls: ['./new-answer.component.scss']
})
export class NewAnswerComponent implements OnInit {

  content: string;
  value = 0;
  msgs: Message[] = [];

  @Input() placeholder1: string;
  @Input() placeholder2: string;
  @Output() addAnswer: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
  }

  createAnswer (event) {
    const self = this;
    self.addAnswer.emit(event.form.value);
    self.content = null;
    self.value   = 0;
  }

  setPristine (model) {
    model.control.markAsPristine();
  }

}
