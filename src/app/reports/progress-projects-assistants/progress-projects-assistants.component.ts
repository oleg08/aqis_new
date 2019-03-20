import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/primeng';
import { AssistantProgressesPropsService } from '../assistant-progresses-props.service';
import { environment } from '../../../environments/environment';
import { ProgressAssistant, ProgressAssistantProject } from '../progress-assistant/progress-assistant.component';
import { DifferenceReportsService } from '../difference-reports.service';
import { CookieService } from 'ngx-cookie-service';
import { UpdateAssistantReportsComponent } from '../update-assistant-reports/update-assistant-reports.component';

@Component({
  selector: 'app-progress-projects-assistants',
  templateUrl: './progress-projects-assistants.component.html',
  styleUrls: ['./progress-projects-assistants.component.scss'],
  providers: [MessageService]
})
export class ProgressProjectsAssistantsComponent implements OnInit {

  projects: ProgressAssistantProject[] = [];
  monthDateStart: Date = new Date();
  msgs: Message[] = [];
  loading = true;
  submitted = false;

  @ViewChild('updateAssistantReports') updateAssistantReports: UpdateAssistantReportsComponent;

  constructor(private http: HttpClient,
              private assistantProgressesProps: AssistantProgressesPropsService,
              private messageService: MessageService,
              private differenceReports: DifferenceReportsService,
              private cookieService: CookieService) { }

  ngOnInit() {
    const self = this;

    self.http.post(`${environment.serverUrl}/progress_assistant.json`, { date: self.monthDateStart }).subscribe(
      res => {
        if (res['reports']) {
          const reports: ProgressAssistant[] = res['reports'];
          self.iterateReports(reports);
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
    let reports: ProgressAssistant[] = [];
    self.submitted = true;

    self.http.post(`${environment.serverUrl}/progress_assistant.json`, data).subscribe(
      res => {
        if (res['reports']) {
          if (res['reports_by_end_date']) {
            const reports1: ProgressAssistant[] = res['reports'];
            const reports2: ProgressAssistant[] = res['reports_by_end_date'];

            reports = [...self.differenceReports.handler(reports1, reports2)];
          } else {
            reports = res['reports'];
          }
          self.iterateReports(reports);
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

  iterateReports (reports: ProgressAssistant[]) {
    const self = this;
    self.projects = [];
    if (reports.length > 0) {
      reports.forEach(report => {
        report.projects.forEach(project => {
          let progress_project: ProgressAssistantProject;
          progress_project = self.projects.find(p => p.name === project.name);

          let new_project = false;
          if (!progress_project) {
            progress_project = {
              name: project.name, num_in_progress: 0, num_closed: 0, num_succeed: 0, completed_steps_time: 0, completed_steps: 0,
              total_steps: 0, total_steps_time: 0, progresses: []
            };
            new_project = true;
          }
          project.progresses.forEach(pr => progress_project.progresses.push(pr));
          self.assistantProgressesProps.projectProps().forEach(prop => {
            progress_project[prop] += Number(project[prop]);
          });
          if (new_project) self.projects.push(progress_project);
        });
      });
    }
  }

  showDialog() {
    this.updateAssistantReports.openDialog();
  }

  reloadPage() {
    window.location.href = '/progress_projects_assistant';
  }

}
