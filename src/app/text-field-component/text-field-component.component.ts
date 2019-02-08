import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AssignOriginalValueService } from '../services/assign-original-value.service';
import { CheckPatternService } from '../services/check-pattern.service';

@Component({
  selector: 'app-text-field-component',
  templateUrl: './text-field-component.component.html',
  styleUrls: ['./text-field-component.component.scss']
})
export class TextFieldComponentComponent implements OnInit {

  originalValue: object;

  @Input() object:       object;
  @Input() field_name:   string;
  @Input() sub_array:    string;
  @Input() label:        string;
  @Input() addon:        string;
  @Input() addon_button: string;
  @Input() pattern:      string;
  @Input() pattern_name: string;
  @Input() placeholder:  string;
  @Input() image:        string;
  @Input() image_button: string;
  @Input() target:       string;
  @Input() disabled:     boolean;
  @Input() max_value:    number;
  @Input() min_value:    number;
  @Input() readonly:    boolean;

  @Output() valueChanged: EventEmitter<object> = new EventEmitter<object>();
  @Output() focusInput: EventEmitter<object> = new EventEmitter<object>();
  @Output() focusOutInput: EventEmitter<object> = new EventEmitter<object>();
  @Output() clickButton:  EventEmitter<object> = new EventEmitter<object>();

  constructor(private sanitizer: DomSanitizer,
              private assignOriginalValue: AssignOriginalValueService,
              private checkPattern: CheckPatternService) { }

  ngOnInit() {
    this.originalValue = this.assignOriginalValue.handler(this.object, this.field_name);
  }

  sanitize (url) {
    if (this.label === 'Web') {
      if (url.indexOf(' http') !== 0 && url.indexOf('http') !== 0) {
        url = 'https:\\' + this.object[this.field_name];
      }
      console.log('sanitize url - ', url);
    }
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  modelValid (model) {
    if ((model.invalid && model.dirty) ||
      ((this.max_value && model.value > this.max_value) || (this.min_value && model.value < this.min_value))) {
      return false;
    } else {
      return true;
    }
  }

  validationPattern () {
    return this.checkPattern.handler(this.pattern);
  }

  focus() {
    this.focusInput.emit();
  }

  focusOut() {
    this.focusOutInput.emit();
  }

  blur (model) {
    const self = this;
    if (self.modelValid(model)) {
      if (self.originalValue !== model.value) {

        const object = {
          field_name: self.field_name,
          value: model.value,
          originalValue: self.originalValue
        };

        if (self.sub_array) {
          object['sub_array'] = self.sub_array;
        }

        self.valueChanged.emit(object);
        self.originalValue = model.value;
      }
    } else {
      self.object[self.field_name] = self.originalValue;
    }
    model.control.markAsPristine();
  }

  addonButton(model, event) {
    const self = this;
    if (model.model && self.modelValid(model) ) {
      self.clickButton.emit({
        value: model.viewModel, event: event
      });
    }
  }
}
