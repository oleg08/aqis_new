import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-aqis-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  newValue1: string;

  @Output() submitForm: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
  }

  submit(model, form) {
    this.submitForm.emit( { value: this.newValue1 } );
    this.newValue1 = null;
    form.form.markAsPristine();
  }

  setPristine (model) {
    model.control.pristine = true;
  }

}
