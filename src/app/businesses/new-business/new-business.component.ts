import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-aqis-new-business',
  templateUrl: './new-business.component.html',
  styleUrls: ['./new-business.component.scss']
})
export class NewBusinessComponent implements OnInit {

  new_value: string = null;

  @Input() label:      string;
  @Input() input_name: string;

  @Output() submitForm: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
  }

  submit (event) {
    const self = this;
    const params = { name: event.form.value.name };
    self.submitForm.emit(params);
    self.new_value = null;
  }

  setPristine (model) {
    model.control.markAsPristine();
  }

}
