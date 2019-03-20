import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProgressAssistant } from '../../progress-assistant/progress-assistant.component';

@Component({
  selector: 'app-aqis-progress-assistant-filters',
  templateUrl: './progress-assistant-filters.component.html',
  styleUrls: ['./progress-assistant-filters.component.scss']
})
export class ProgressAssistantFiltersComponent implements OnInit {

  reportsFilters: FormGroup;
  monthDateStart: Date = new Date();
  monthDateEnd: Date;
  rangeCalendarHeight = '0';

  @Input() loading: boolean;
  @Input() submitted: boolean;

  @Output() sendRequest:  EventEmitter<object> = new EventEmitter<object>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    const self = this;
    self.reportsFilters = self.formBuilder.group({
      zipFrom: [0, [Validators.pattern(/^\d*$/), Validators.min(0), Validators.max(9900)]],
      zipTo: [0, [Validators.pattern(/^\d*$/), Validators.min(0), Validators.max(10000)]],
      emplFrom: [0, [Validators.pattern(/^\d*$/), Validators.min(0), Validators.max(990000)]],
      emplTo: [0, [Validators.pattern(/^\d*$/), Validators.min(0), Validators.max(1000000)]],
      turnoverFrom: [0, [Validators.pattern(/^\d*$/), Validators.min(0), Validators.max(999990000)]],
      turnoverTo: [0, [Validators.pattern(/^\d*$/), Validators.min(0), Validators.max(1000000000)]]
    });
  }

  get f() { return this.reportsFilters.controls; }

  submitFilters() {
    const self = this;
    const zip_from: number = Number(self.reportsFilters.value.zipFrom);
    const zip_to: number = Number(self.reportsFilters.value.zipTo);

    const empl_from: number = Number(self.reportsFilters.value.emplFrom);
    const empl_to: number = Number(self.reportsFilters.value.emplTo);

    const turnover_from: number = Number(self.reportsFilters.value.turnoverFrom);
    const turnover_to: number = Number(self.reportsFilters.value.turnoverTo);

    const zip_range = self.validateValue('zipFrom', 'zipTo', zip_from, zip_to, 9900, 10000, 100);
    const empl_range = self.validateValue('emplFrom', 'emplTo', empl_from, empl_to, 990000, 1000000, 10000);
    const turnover_range = self.validateValue('turnoverFrom', 'turnoverTo', turnover_from, turnover_to,
      999990000, 1000000000, 10000);

    self.reportsFilters.setValue({ ...zip_range, ...empl_range, ...turnover_range });

    if (self.reportsFilters.invalid) { return; }

    self.sendRequest.emit(self.progressParams());
  }

  validateValue(key1, key2, val1, val2, min, max, dif) {
    if ((val1 >= val2 && val2 !== 0) || (val1 !== 0 && val1 >= val2)) {
      if (val1 > max - dif) {
        val1 = min;
        val2 = max;
      } else {
        val2 = val1 + dif;
      }
    }
    return{ [key1]: val1, [key2]: val2 };
  }

  setDateRange () {
    const self = this;
    const today = new Date();
    if (self.monthDateStart > self.monthDateEnd) { self.monthDateStart = self.monthDateEnd; }
    if (self.monthDateEnd > today) { self.monthDateEnd = today; }

    self.sendRequest.emit(self.progressParams());
  }

  changeReportDate () {
    const self = this;
    const today = new Date ();
    if (self.monthDateStart > today) { self.monthDateStart = today; }

    self.sendRequest.emit(self.progressParams());
  }

  progressParams () {
    const self = this;
    let params: object;
    if (self.monthDateEnd) {
      params = { ...self.reportsFilters.value, ...{ date: self.monthDateStart }, ...{ end_date: self.monthDateEnd } };
    } else {
      params = { ...self.reportsFilters.value, ...{ date: self.monthDateStart } };
    }
    return params;
  }

}
