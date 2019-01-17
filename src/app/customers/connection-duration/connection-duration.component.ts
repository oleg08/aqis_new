import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-aqis-connection-duration',
  templateUrl: './connection-duration.component.html',
  styleUrls: ['./connection-duration.component.scss']
})
export class ConnectionDurationComponent implements OnInit {

  originalVal: string;
  pattern_valid = true;

  @Input () object: object;
  @Input () field_name: string;
  @Output () ConnectionTimeChanged: EventEmitter<object> = new EventEmitter<object>();
  @Output() focusInput: EventEmitter<object> = new EventEmitter<object>();
  @Output() focusOutInput: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
    this.originalVal = this.object[this.field_name];
  }

  focus() {
    this.focusInput.emit();
  }

  focusOut() {
    this.focusOutInput.emit();
  }

  validationPattern (model) {
    if (!model.viewModel) {
      this.pattern_valid = true;
    } else if (Number(model.viewModel[0]) < 0 || Number(model.viewModel[0]) > 2) {
      this.pattern_valid = false;
    } else if (Number(model.viewModel[3]) < 0 || Number(model.viewModel[3]) > 5) {
      this.pattern_valid = false;
    } else {
      this.pattern_valid = true;
    }
  }

  blur(model) {
    const self = this;
    if (model.viewModel && self.originalVal !== model.viewModel && self.pattern_valid) {
      self.ConnectionTimeChanged.emit({
        field_name: self.field_name,
        value: model.viewModel
      });
      self.originalVal = model.viewModel;
    } else {
      self.object[self.field_name] = self.originalVal;
      self.pattern_valid = true;
    }
  }

}
