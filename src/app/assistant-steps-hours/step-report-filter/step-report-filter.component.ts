import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DailyReport } from '../assistant-steps-hours.component';

@Component({
  selector: 'app-aqis-step-report-filter',
  templateUrl: './step-report-filter.component.html',
  styleUrls: ['./step-report-filter.component.scss']
})
export class StepReportFilterComponent implements OnInit {

  rangeDates: Date[];
  @Input() reports: DailyReport[];
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelectDates: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
  }

  selectDates () {
    const self = this;
    let searchedReports: DailyReport[];
    let date_in_range = true;
    let date1: Date = self.rangeDates && self.rangeDates[0] ? self.rangeDates[0] : null;
    let date2: Date = self.rangeDates && self.rangeDates[1] ? self.rangeDates[1] : null;
    date1 = date1 ? new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) : null;
    date2 = date2 ? new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()) : null;
    searchedReports = self.reports.filter(report => {
      let report_date: Date;
      if (date1 && date2) {
        report_date = new Date(report.report_date);
        report_date = new Date(report_date.getFullYear(), report_date.getMonth(), report_date.getDate());
        date_in_range = report_date >= date1 && report_date <= date2;
      } else {
        date_in_range = true;
      }
      return date_in_range;
    });
    self.onSelectDates.emit({ searched_reports: searchedReports });
  }

  clearDates() {
    const self = this;
    self.rangeDates = null;
    self.selectDates();
  }
}
