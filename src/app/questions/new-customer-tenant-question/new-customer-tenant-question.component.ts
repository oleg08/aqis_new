import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-aqis-new-customer-tenant-question',
  templateUrl: './new-customer-tenant-question.component.html',
  styleUrls: ['./new-customer-tenant-question.component.scss']
})
export class NewCustomerTenantQuestionComponent implements OnInit {

  new_question: string;
  content: string;
  value: number;

  @Input() placeholder: string;
  @Input() object: object;
  @Input() property1: string;
  @Input() property2: string;
  @Input() current_question_id: number;
  @Output() addCTenantQuestion: EventEmitter<object> = new EventEmitter<object>();

  constructor() {
    this.new_question = null;
  }

  ngOnInit() {
  }

  createQuestion (event) {
    const self = this;
    self.addCTenantQuestion.emit(event.form.value);
    if (!self.current_question_id) {
      self.object[self.property1] = null;
      self.object[self.property2] = null;
      self.new_question = null;
    }
  }

  setPristine (model) {
    model.control.markAsPristine();
  }

}
