import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AssignOriginalValueService } from '../services/assign-original-value.service';
import { TimeZones } from '../interfaces/time-zones';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  originalValue:       object;
  selectedTimeZone:    TimeZones;
  optionLabel:         string;

  @Input() object:       object;
  @Input() disabled:     boolean;
  @Input() field_name:   string;
  @Input() value:        Array<object>;
  @Input() option_label: string;

  @Output () valueChanged: EventEmitter<object> = new EventEmitter<object>();

  constructor(private assignOriginalalue: AssignOriginalValueService) { }

  ngOnInit() {
    const self = this;
    self.originalValue = self.object[self.field_name];
    self.selectedTimeZone = self.value.find(time_zone =>
      time_zone['value'] === self.object[self.field_name]);
  }

  changeZone(event) {
    const self = this;
    self.valueChanged.emit({
      field_name: self.field_name,
      value:      event.value.value,
      originalValue: self.originalValue
    });
    self.originalValue = event.value.value;
  }

}
