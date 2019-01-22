import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-aqis-select-slide',
  templateUrl: './select-slide.component.html',
  styleUrls: ['./select-slide.component.scss']
})
export class SelectSlideComponent implements OnInit {

  rangeValues: number[];
  prevFrom: number;
  prevTo:   number;

  @Input() label:      string;
  @Input() hide_label: boolean;
  @Input() object:     object;
  @Input() field_from: string;
  @Input() field_to:   string;
  @Input() slider:     boolean;
  @Output() slideChanged: EventEmitter<object> = new EventEmitter<object>();
  constructor() { }

  ngOnInit() {
    const self = this;
    if (self.object[self.field_from] === undefined || self.object[self.field_from] == null) {
      self.object[self.field_from] = 0;
    }
    if (self.object[self.field_to] === undefined || self.object[self.field_to] == null) {
      self.object[self.field_to] = 0;
    }
    self.rangeValues = [self.object[self.field_from], self.object[self.field_to]];
    self.prevFrom = self.object[self.field_from];
    self.prevTo   = self.object[self.field_to];
  }

  changeRange (event) {
    const self = this;
    self.slideChanged.emit({
      label:             self.label,
      project_id:        self.object['id'],
      field_from:        self.field_from,
      field_to:          self.field_to,
      [self.field_from]: event['values'][0],
      [self.field_to]:   event['values'][1]
    });
  }

  setFrom (model) {
    const self = this;
    const value = model.viewModel;
    if (value > self.prevTo || !Number.isInteger(value)) {
      self.rangeValues = [self.prevFrom, self.prevTo];
      return;
    }
    self.rangeValues = [value, self.rangeValues[1]];
    self.slideChanged.emit({
      label:             self.label,
      project_id:        self.object['id'],
      field_from:        self.field_from,
      field_to:          self.field_to,
      [self.field_from]: value,
      [self.field_to]:   self.rangeValues[1]
    });
    self.prevFrom = value;
  }

  setTo (model) {
    const self = this;
    const value = model.viewModel;
    if (value < self.prevFrom || !Number.isInteger(value)) {
      self.rangeValues = [self.prevFrom, self.prevTo];
      return;
    }
    self.rangeValues = [self.rangeValues[0], value];
    self.slideChanged.emit({
      label:             self.label,
      project_id:        self.object['id'],
      field_from:        self.field_from,
      field_to:          self.field_to,
      [self.field_from]: self.rangeValues[0],
      [self.field_to]:   value
    });
    self.prevTo = value;
  }

}
