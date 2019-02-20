import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/primeng';

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
  progress0_25?: number;
  progress25_50?: number;
  progress50_75?: number;
  progress75_100?: number;
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

  constructor(private messageService: MessageService, private http: HttpClient) { }

  ngOnInit() {
    const self = this;
    self.http.get(`${environment.serverUrl}/reports_project_progress.json`).subscribe(
      res => {

        self.projects = res['projects'];
        self.reports = [];

        self.projects.forEach(p => {
          const num_companies = p.companies.length;
          const report: ReportProgress = {
            project: p.name,
            total_companies: num_companies
          };
          const companies_with_active_step: CompaniesReport[] = p.companies.filter( c => c.step_active === true);
          let project_progress = 0;
          companies_with_active_step.forEach(ac => {
            const progress: number = ((ac.step_order - 1) / ac.step_count) * 100;
            project_progress += progress;
          });
          project_progress /= num_companies;
          project_progress = Number(project_progress.toFixed(2));
          if (project_progress <= 25) report.progress0_25 = project_progress;
          if (project_progress > 25 && project_progress <= 50) report.progress25_50 = project_progress;
          if (project_progress > 50 && project_progress <= 75) report.progress50_75 = project_progress;
          if (project_progress > 75 && project_progress <= 100) report.progress75_100 = project_progress;

          report.active_companies = p.companies.filter(c => c.active_state === true || c.active_state === null).length;
          report.closed_companies = p.companies
            .filter(c => c.active_state === false && (c.success_state === false || c.success_state === null)).length;
          report.success_companies = p.companies.filter(c => c.success_state === true).length;

          self.reports.push(report);

        });
        if (self.reports.length < 1) {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `There aren't reports`});
        }
        self.load_completed = true;
        },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        console.log('err - ', err);
      }
    );
  }

}
