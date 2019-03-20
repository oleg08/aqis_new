import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/primeng';
import { CookieService } from 'ngx-cookie-service';
import { UpdateAssistantReportsComponent } from '../update-assistant-reports/update-assistant-reports.component';

export interface ProjectReport {
  name: string;
  companies: CompaniesReport[];
}

export interface CompaniesReport {
  id: number;
  zip: number;
  name: string;
  customer_tenant_id?: number;
  project_name?: string;
  step_active?: boolean;
  step_order?: number;
  project_id?: number;
  state_id?: number;
  state?: string;
  step_role?: number;
  step_count?: number;
  active_state?: boolean;
  success_state?: boolean;
}

export interface ReportProgress {
  project: string;
  progress?: number;
  active_companies?: number;
  closed_companies?: number;
  success_companies?: number;
  total_companies?: number;
}

@Component({
  selector: 'app-aqis-project-progress',
  templateUrl: './project-progress.component.html',
  styleUrls: ['./project-progress.component.scss'],
  providers: [MessageService]
})

export class ProjectProgressComponent implements OnInit {

  load_completed = false;
  projects: ProjectReport[];
  reports: ReportProgress[];
  msgs: Message[] = [];
  displayDialog = false;

  @ViewChild('updateAssistantReports') updateAssistantReports: UpdateAssistantReportsComponent;

  constructor(private messageService: MessageService, private cookieService: CookieService, private http: HttpClient) { }

  ngOnInit() {
    const self = this;

    self.http.get(`${environment.serverUrl}/projects_progress.json`).subscribe(
      res => {
        if (res['reports']) {
          const response_reports: ReportProgress[] = res['reports'];
          self.reports = [...response_reports];
          self.load_completed = true;
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        }
      },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
      }
    );
  }

  showDialog() {
    this.updateAssistantReports.openDialog();
  }

  reloadPage() {
    window.location.href = '/reports_project_progress';
  }
}
