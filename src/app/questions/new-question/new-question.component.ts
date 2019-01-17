import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-aqis-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  newValue1: string;

  @Input() q_prop2: string;
  @Input() header_label: string;
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
