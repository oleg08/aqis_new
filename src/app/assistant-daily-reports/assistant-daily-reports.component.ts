import {Component, OnInit, ViewChild} from '@angular/core';
import { GetReportDataService } from '../assistant-steps-hours/get-report-data.service';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import {DailyReport} from '../assistant-steps-hours/assistant-steps-hours.component';
import {DailyReportEditComponent} from '../assistant-steps-hours/daily-report-edit/daily-report-edit.component';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

export interface AssistantsWithDailyReports {
  id?: number;
  name?: string;
  email?: string;
  admin?: boolean;
  super_admin?: boolean;
  assistant?: boolean;
  agent?: boolean;
  tenant_name?: string;
  assistant_daily_reports?: DailyReport[];
  created_at?: string;
  updated_at?: string;
}

@Component({
  selector: 'app-assistant-daily-reports',
  templateUrl: './assistant-daily-reports.component.html',
  styleUrls: ['./assistant-daily-reports.component.scss'],
  providers: [MessageService, GetReportDataService],
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
export class AssistantDailyReportsComponent implements OnInit {

  admin: boolean;
  super_admin: boolean;
  assistants: AssistantsWithDailyReports[];
  current_assistant: AssistantsWithDailyReports;
  current_report: DailyReport = {
    id: null,
    description: null,
    report_date: null,
    hours: null
  };
  displayDialog = false;
  msgs: Message[] = [];

  @ViewChild('dailyReport') dailyReportEdit: DailyReportEditComponent;

  constructor(private getReportData: GetReportDataService,
              private messageService: MessageService) { }

  ngOnInit() {
    const self = this;
    self.getReportData.indexAssistantReports().then(
      data => {
        self.assistants = data['assistants'];
        self.admin = data['admin'];
        self.super_admin = data['super_admin'];
      }
    );
  }

  openPanel(assistant: AssistantsWithDailyReports) {
    const self = this;
    self.current_assistant = assistant;
  }

  closePanel() {
    this.current_assistant = null;
  }

  showEdit(report: DailyReport) {
    const self = this;
    if (!self.super_admin) return;
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
          self.messageService.add({ severity: 'warn', summary: 'Warning', detail: res['message'] });
        }
        self.displayDialog = false;
      }
    );
  }

  deleteReport() {
    const self = this;
    let reports: DailyReport[] = [...self.current_assistant.assistant_daily_reports];

    self.getReportData.deleteAssistantReport(self.current_report.id).then(
      res => {
        if (res['message'] === 'Successfully deleted') {
          reports = reports.filter(r => r.id !== self.current_report.id);
          self.current_assistant.assistant_daily_reports = reports;
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: res['message']});
        }
        self.displayDialog = false;
      }
    )
  }
}
