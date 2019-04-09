import {Component, OnInit, ViewChild} from '@angular/core';
import { DailyReportEditComponent } from './daily-report-edit/daily-report-edit.component';
import { GetReportDataService } from './get-report-data.service';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
export interface StepDailyReport {
  id?: number;
  name?: string;
  project_name?: string;
  company_name?: string;
  assistant_daily_reports?: DailyReport[];
}

export interface DailyReport {
  id?: number;
  description?: string;
  report_date?: Date;
  user_id?: number;
  c_tenant_step_id?: number;
  hours?: number;
  created_at?: string;
  update_at?: string;
}

@Component({
  selector: 'app-assistant-steps-hours',
  templateUrl: './assistant-steps-hours.component.html',
  styleUrls: ['./assistant-steps-hours.component.scss'],
  providers: [GetReportDataService, MessageService],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('0.5s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class AssistantStepsHoursComponent implements OnInit {

  steps: StepDailyReport[];
  @ViewChild('dailyReport') dailyReportEdit: DailyReportEditComponent;

  initDate: Date = new Date();
  newDescription: string;
  descriptionHasError = false;
  newHours: string;
  hoursHasErrors = false;
  msgs: Message[] = [];

  displayDialog = false;
  current_report: DailyReport = {
    id: null,
    description: null,
    report_date: null,
    hours: null
  };
  current_step: StepDailyReport;

  constructor(private getReportData: GetReportDataService, private messageService: MessageService) { }

  ngOnInit() {
    const self = this;
    self.getReportData.getAssistantsReports().then(steps => {
      self.steps = steps;
    });
  }

  openPanel(step: StepDailyReport) {
    const self = this;
    self.current_step = step;
  }

  closePanel() {
    this.current_step = null;
    this.newHours = null;
    this.newDescription = null;
    this.initDate = new Date();
  }

  showEdit(report: DailyReport) {
    const self = this;
    self.dailyReportEdit.setReport(report);
    self.current_report = report;
    self.displayDialog = true;
  }

  closeDialog() {
    this.current_report = {
      id: null,
      description: null,
      report_date: null,
      hours: null
    };
  }

  createReport () {
    const self = this;
    const reports: DailyReport[] = [...self.current_step.assistant_daily_reports];

    const params: DailyReport = {
      description: self.newDescription,
      hours: Number(self.newHours),
      report_date: self.initDate
    };
    params['c_tenant_step_id'] = self.current_step.id;
    params['user_id'] = 2;

    self.getReportData.createAssistantReport(params).then(
      (res: object) => {
        if (res['assistant_daily_report']) {
          reports.push(res['assistant_daily_report']);
          self.current_step.assistant_daily_reports = reports;
          self.newDescription = null;
          self.initDate = new Date();
          self.newHours = null;
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: res['message'] });
        }
      }
    );
  }

  editReport(data: DailyReport) {
    const self = this;
    const params = {
      description: data.description,
      hours: data.hours,
      report_date: data.report_date
    };

    self.getReportData.editAssistantReport(self.current_report.id, params).then(
      res => {
        if (res['assistant_daily_report']) {
          self.current_report.description = res['assistant_daily_report']['description'];
          self.current_report.report_date = res['assistant_daily_report']['report_date'];
          self.current_report.hours = res['assistant_daily_report']['hours'];
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: res['message'] });
        }
        self.displayDialog = false;
      }
    );
  }

  deleteReport() {
    const self = this;
    let reports: DailyReport[] = [...self.current_step.assistant_daily_reports];

    self.getReportData.deleteAssistantReport(self.current_report.id).then(
      res => {
        if (res['message'] === 'Successfully deleted') {
          reports = reports.filter(r => r.id !== self.current_report.id);
          self.current_step.assistant_daily_reports = reports;
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: res['message'] });
        }
        self.displayDialog = false;
      }
    );
  }

  descriptionChanged(event: string) {
    this.descriptionHasError = !event;
  }

  blurDescription() {
    this.descriptionHasError = false;
  }

  hoursChanged(event: string): void {
    const val = Number(event);
    if (!isNaN(val)) {
      if (val > 0 && val <= 100 && event.indexOf('.') === -1) {
        this.hoursHasErrors = false;
      } else {
        this.hoursHasErrors = true;
      }
    } else {
      this.hoursHasErrors = true;
    }
  }

  blurHours() {
    if (this.hoursHasErrors) {
      this.newHours = null;
      this.hoursHasErrors = false;
    }
  }
}
