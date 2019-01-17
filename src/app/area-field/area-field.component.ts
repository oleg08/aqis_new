import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AssignOriginalValueService } from '../services/assign-original-value.service';
import { CheckPatternService } from '../services/check-pattern.service';
import { CheckModelService } from '../services/check-model.service';

@Component({
  selector: 'app-aqis-area-field',
  templateUrl: './area-field.component.html',
  styleUrls: ['./area-field.component.scss'],
  providers: [
    AssignOriginalValueService,
    CheckModelService,
    CheckPatternService
  ]
})
export class AreaFieldComponent implements OnInit {

  originalValue: object;

  @Input() object:      object;
  @Input() field_name:  string;
  @Input() label:       string;
  @Input() addon:       string;
  @Input() pattern:     string;
  @Input() rows:        number;
  @Input() placeholder: string;

  @Output() focusInput: EventEmitter<object> = new EventEmitter<object>();
  @Output() focusOutInput: EventEmitter<object> = new EventEmitter<object>();
  @Output() valueChanged: EventEmitter<object> = new EventEmitter<object>();
  constructor(private assignOriginalValue: AssignOriginalValueService,
              private checkModel:          CheckModelService,
              private checkPattern:        CheckPatternService) { }

  ngOnInit() {
    this.originalValue = this.assignOriginalValue.handler(this.object, this.field_name);
  }

  focus() {
    this.focusInput.emit();
  }

  focusOut() {
    this.focusOutInput.emit();
  }

  modelValid (model) {
    return !(model.invalid && model.dirty);
  }

  validationPattern () {
    return this.checkPattern.handler(this.pattern);
  }

  blur (model) {
    const self = this;
    if (self.originalValue !== model.value) {
      self.valueChanged.emit({
        field_name: self.field_name,
        value: model.value,
        originalValue: self.originalValue
      });
      self.originalValue = model.value;
    }
    model.control.markAsPristine();
  }

}
