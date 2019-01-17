import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AssignOriginalValueService } from '../services/assign-original-value.service';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  providers: [AssignOriginalValueService]
})
export class SelectFieldComponent implements OnInit {

  @Input() object: object;
  @Input() field_name: string;
  @Input() states: any;
  @Input() label: string;

  @Output() valueChanged: EventEmitter<object> = new EventEmitter<object>();

  originalValue: object;

  constructor(private assignOriginalValue: AssignOriginalValueService) { }

  ngOnInit() {
    const states = [];
    this.states.split(',').forEach(state => states.push(state));
    this.states = states;
    this.originalValue = this.assignOriginalValue.handler(this.object, this.field_name);
  }

  save (model) {
    const self = this;
    self.valueChanged.emit({
      field_name:    self.field_name,
      value:         model.viewModel,
      originalValue: self.originalValue
    });
  }

}
