import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/primeng';
import { CookieService } from 'ngx-cookie-service';
import { DifferenceReportsService } from '../difference-reports.service';
import { UpdateAssistantReportsComponent } from '../update-assistant-reports/update-assistant-reports.component';
import { environment } from '../../../environments/environment';

export interface ProgressAssistant {
  assistant?: string;
  projects?: ProgressAssistantProject[];
  total_companies?: number;
  companies_in_progress?: number;
  companies_closed?: number;
  companies_succeed?: number;
  time_performed?: number;
  time_total?: number;
  steps_performed?: number;
  steps_total?: number;
}

export interface ProgressAssistantProject {
  name?: string;
  progresses?: ProgressAssistantByProject[];
  num_succeed?: number;
  num_closed?: number;
  num_in_progress?: number;
  completed_steps?: number;
  completed_steps_time?: number;
  total_steps?: number;
  total_steps_time?: number;
}

export interface ProgressAssistantByProject {
  date?: string;
  user_id?: number;
  company?: string;
  customer_tenant_id?: number;
  steps_completed?: number;
  steps_completed_time?: string|number;
  steps_total?: number;
  steps_total_time?: string|number;
  failed?: 0|1;
  in_progress?: 0|1;
  succeed?: 0|1;
}

@Component({
  selector: 'app-progress-assistant',
  templateUrl: './progress-assistant.component.html',
  styleUrls: ['./progress-assistant.component.scss'],
  providers: [MessageService]
})
export class ProgressAssistantComponent implements OnInit {

  reports: ProgressAssistant[] = [];
  submitted = false;
  msgs: Message[] = [];
  loading = true;

  @ViewChild('updateAssistantReports') updateAssistantReports: UpdateAssistantReportsComponent;

  constructor(private http: HttpClient,
              private messageService: MessageService,
              private cookieService: CookieService,
              private differenceReports: DifferenceReportsService) { }

  ngOnInit() {
    const self = this;
    const date = new Date();
    self.http.post(`${environment.serverUrl}/progress_assistant.json`, { date: date }).subscribe(
      res => {
        if (res['reports']) {
          self.reports = res['reports'];
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        }
        self.loading = false;
      },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        self.loading = false;
      }
    );
  }

  submitFilters(data) {
    const self = this;
    self.loading = true;
    self.reports = [];
    self.submitted = true;

    self.http.post(`${environment.serverUrl}/progress_assistant.json`, data).subscribe(
      res => {
        if (res['reports']) {
          if (res['reports_by_end_date']) {
            const reports1: ProgressAssistant[] = res['reports'];
            const reports2: ProgressAssistant[] = res['reports_by_end_date'];

            self.reports = [...self.differenceReports.handler(reports1, reports2)];
          } else {
            self.reports = res['reports'];
          }
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        }
        self.loading = false;
        },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        self.loading = false;
      }
    );
  }

  showDialog() {
    this.updateAssistantReports.openDialog();
  }

  reloadPage() {
    window.location.href = '/progress_assistant';
  }
}
