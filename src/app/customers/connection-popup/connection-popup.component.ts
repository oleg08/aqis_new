import { Component, OnInit, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AssignOriginalValueService } from '../../services/assign-original-value.service';

@Component({
  selector: 'app-aqis-connection-popup',
  templateUrl: './connection-popup.component.html',
  styleUrls: ['./connection-popup.component.scss'],
  providers: [
    AssignOriginalValueService
  ]
})
export class ConnectionPopupComponent implements OnInit {

  dateObject: object;
  date: any;
  originalValue: object;

  @Input() object:     object;
  @Input() field_name: string;
  @Output() focusInput: EventEmitter<object> = new EventEmitter<object>();
  @Output() focusOutInput: EventEmitter<object> = new EventEmitter<object>();
  @Output() ConnectionChanged: EventEmitter<object> = new EventEmitter<object>();

  constructor(private assignOriginalValue: AssignOriginalValueService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    const self = this;
    if (self.object[self.field_name]) {
      self.dateObject = {};
      if (typeof self.object[self.field_name] === 'string') {
        self.dateObject['year']  = Number(self.object[self.field_name].split('-')[0]);
        self.dateObject['month'] = Number(self.object[self.field_name].split('-')[1]);
        self.dateObject['day']   = Number(self.object[self.field_name].split('-')[2]);
      } else if (typeof self.object[self.field_name] === 'object') {
        self.dateObject['year']  = self.object[self.field_name]['year'];
        self.dateObject['month'] = self.object[self.field_name]['month'];
        self.dateObject['day']   = self.object[self.field_name]['day'];
      }
      self.object[self.field_name] = self.dateObject;
    }
    self.originalValue = self.assignOriginalValue.handler(self.object, self.field_name);
  }

  focus() {
    this.focusInput.emit();
  }

  focusOut() {
    this.focusOutInput.emit();
  }

  saveConnection (update) {
    const self = this;
    if (update && typeof update === 'object') {
      if (update.year > 2000
        && update.month >= 1 && update.month <= 12
        && update.day >= 1 && update.day <= 31
      ) {
        self.date = String(update['year']) + '-' + String(update['month'] + '-' + String(update['day']));
        self.ConnectionChanged.emit({
          field_name: self.field_name,
          value: self.date,
          originalValue: self.originalValue
        });
      }
    } else if (!update) {
      self.ConnectionChanged.emit({
        field_name: self.field_name,
        value: null,
        originalValue: self.originalValue
      });
    }
  }

}
