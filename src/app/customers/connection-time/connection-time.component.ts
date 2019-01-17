import { Component, OnInit, EventEmitter, Input, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'app-aqis-connection-time',
  templateUrl: './connection-time.component.html',
  styleUrls: ['./connection-time.component.scss']
})
export class ConnectionTimeComponent implements OnInit {

  last_connection_time = {hour: 0, minute: 0};
  meridian = false;
  originalHours = null;
  originalMin = null;

  @Input () customer: object;
  @Input () field_name: string;
  @Input () field_name_hour: string;
  @Input () field_name_min: string;
  @Output () ConnectionTimeChanged: EventEmitter<object> = new EventEmitter<object>();
  @Output() focusInput: EventEmitter<object> = new EventEmitter<object>();
  @Output() focusOutInput: EventEmitter<object> = new EventEmitter<object>();

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    const self = this;
    if (self.customer[self.field_name_hour] == null || self.customer[self.field_name_min] == null) {
      self.ConnectionTimeChanged.emit({
        field_name: self.field_name_hour,
        value: 0
      });
      self.ConnectionTimeChanged.emit({
        field_name: self.field_name_min,
        value: 0
      });
      self.customer[self.field_name_hour] = 0;
      self.customer[self.field_name_min] = 0;
    }
    self.originalHours = self.customer[self.field_name_hour];
    self.originalMin = self.customer[self.field_name_min];

    self.last_connection_time = {
      hour: self.customer[self.field_name_hour],
      minute: self.customer[self.field_name_min]
    };
  }

  ngAfterViewInit() {
    const el = this.elementRef.nativeElement.querySelector('.customers-timepicker');
    const hours_input = el.firstChild.firstChild.children[0].children[0];
    const min_input = el.firstChild.firstChild.children[2].children[0];
    hours_input.addEventListener('focus', this.focus.bind(this));
    min_input.addEventListener('focus', this.focus.bind(this));
    hours_input.addEventListener('focusout', this.focusOut.bind(this));
    min_input.addEventListener('focusout', this.focusOut.bind(this));
  }

  focus() {
    this.focusInput.emit();
  }

  focusOut() {
    this.focusOutInput.emit();
  }

  saveConnection (update) {

    let hourObj;
    let minObj;

    if (update && update.hour !== this.originalHours) {
      hourObj = {field_name: this.field_name_hour, value: update.hour};
      this.ConnectionTimeChanged.emit(hourObj);
      this.originalHours = update.hour;
    } else if (update && update.minute !== this.originalMin) {
      minObj  = {field_name: this.field_name_min,   value: update.minute};
      this.ConnectionTimeChanged.emit(minObj);
      this.originalMin = update.minute;
    }
  }

  toggleMeridian() {
    this.meridian = !this.meridian;
  }

}
