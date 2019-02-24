import { Component, OnInit, Input } from '@angular/core';
import {ProjectReport, ReportProgress} from '../project-progress.component';
import { HttpClient } from '@angular/common/http';
import {  environment } from '../../../../environments/environment';
import { CompaniesReport } from '../project-progress.component';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/primeng';

@Component({
  selector: 'app-aqis-report-row',
  templateUrl: './report-row.component.html',
  styleUrls: ['./report-row.component.scss'],
  providers: [MessageService]
})
export class ReportRowComponent implements OnInit {

  project: ReportProgress;
  load_completed = false;
  load_error: boolean;
  msgs: Message[] = [];
  @Input() project_id: number;

  constructor(private messageService: MessageService, private http: HttpClient) { }

  ngOnInit() {
    this.loadProject();
  }

  loadProject() {
    const self = this;
    self.load_error = false;
    self.http.get(`${environment.serverUrl}/reports_project_progress/${self.project_id}.json`).subscribe(
      res => {

        if (res['report']) {
          const report: ProjectReport = res['report'];

          const num_companies = report.companies.length;
          self.project = {
            project: report.name,
            total_companies: num_companies
          };
          const companies_with_active_step: CompaniesReport[] = report.companies.filter( c => c.step_active === true);
          let project_progress = 0;
          companies_with_active_step.forEach(ac => {
            const progress: number = ((ac.step_order - 1) / ac.step_count) * 100;
            project_progress += progress;
          });
          project_progress /= num_companies;
          project_progress = Number(project_progress.toFixed(2));
          if (project_progress <= 25) self.project.progress0_25 = project_progress;
          if (project_progress > 25 && project_progress <= 50) self.project.progress25_50 = project_progress;
          if (project_progress > 50 && project_progress <= 75) self.project.progress50_75 = project_progress;
          if (project_progress > 75 && project_progress <= 100) self.project.progress75_100 = project_progress;

          self.project.active_companies = report.companies.filter(c => c.active_state === true || c.active_state === null).length;
          self.project.closed_companies = report.companies
            .filter(c => c.active_state === false && (c.success_state === false || c.success_state === null)).length;
          self.project.success_companies = report.companies.filter(c => c.success_state === true).length;
          self.load_completed = true;
        } else {
          self.load_error = true;
        }

      },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        console.log('err - ', err);
      }
    );
  }

}
