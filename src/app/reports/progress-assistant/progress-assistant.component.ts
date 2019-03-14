import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DifferenceArraysService } from '../../services/difference-arrays.service';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/primeng';
import { CookieService } from 'ngx-cookie-service';
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
  reports_by_end_date: ProgressAssistant[] = [];
  reportsFilters: FormGroup;
  monthDateStart: Date = new Date();
  monthDateEnd: Date;
  submitted = false;
  rangeCalendarHeight = '0';
  report_props: string[] = [
    'total_companies', 'companies_in_progress', 'companies_closed', 'companies_succeed', 'time_performed', 'time_total', 'steps_performed',
    'steps_total'
  ];
  project_props: string[] = [
    'num_succeed', 'num_closed', 'num_in_progress', 'completed_steps', 'completed_steps_time', 'total_steps', 'total_steps_time'
  ];
  progress_props: string[] = [
    'steps_completed', 'steps_completed_time', 'steps_total', 'steps_total_time'
  ];
  msgs: Message[] = [];
  update_running = false;
  displayDialog = false;
  reload_button = false;
  last_update: string;
  start_updating = 'false';   // evaluate to 'true' when click 'Yes' on the confirmation dialog
  loading = true;

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private cookieService: CookieService,
              private differenceArray: DifferenceArraysService) { }

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

    self.http.post(`${environment.serverUrl}/progress_assistant.json`, { date: self.monthDateStart }).subscribe(
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

  get f() { return this.reportsFilters.controls; }

  submitFilters() {
    const self = this;
    self.loading = true;
    self.reports = [];
    self.submitted = true;
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

    self.http.post(`${environment.serverUrl}/progress_assistant.json`, self.progressParams()).subscribe(
      res => {
        if (res['reports']) {
          if (res['reports_by_end_date']) {
            const reports1: ProgressAssistant[] = res['reports'];
            const reports2: ProgressAssistant[] = res['reports_by_end_date'];

            self.differenceReports(reports1, reports2);
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
    self.loading = true;
    self.reports = [];
    const today = new Date();
    if (self.monthDateStart > self.monthDateEnd) { self.monthDateStart = self.monthDateEnd; }
    if (self.monthDateEnd > today) { self.monthDateEnd = today; }

    self.http.post(`${environment.serverUrl}/progress_assistant.json`, self.progressParams()).subscribe(
      res => {
        if (res['reports']) {
          if (res['reports_by_end_date']) {
            const reports1: ProgressAssistant[] = res['reports'];
            const reports2: ProgressAssistant[] = res['reports_by_end_date'];

            self.differenceReports(reports1, reports2);
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

  changeReportDate () {
      const self = this;
      self.loading = true;
      self.reports = [];
      const today = new Date ();
      if (self.monthDateStart > today) { self.monthDateStart = today; }

      self.http.post(`${environment.serverUrl}/progress_assistant.json`, self.progressParams()).subscribe(
        res => {
          if (res['reports']) {
            if (res['reports_by_end_date']) {
              const reports1: ProgressAssistant[] = res['reports'];
              const reports2: ProgressAssistant[] = res['reports_by_end_date'];

              self.differenceReports(reports1, reports2);
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
          });
  }

  differenceReports (reports1, reports2) {
    const self = this;
    reports2.forEach(report2 => {
      const report: ProgressAssistant = { assistant: report2.assistant, projects: [] };
      const report1: ProgressAssistant = reports1.find(r => r.assistant === report2.assistant);
      report2.projects.forEach(project2 => {
        const project1: ProgressAssistantProject = report1.projects.find(p => p.name === project2.name);

        const project: ProgressAssistantProject = { name: project2.name, progresses: [] };
        if (!project1) {
          project.progresses = project2.progresses;
          self.project_props.forEach(prop => project[prop] = project2[prop]);
        } else {
          self.project_props.forEach(prop => { project[prop] = project2[prop] - project1[prop]; });

          project2.progresses.forEach(progress2 => {
            const progress: ProgressAssistantByProject = { company: progress2.company };
            const progress1: ProgressAssistantByProject = project1.progresses.find(prg => prg.company === progress2.company);
            if (!progress1) {
              self.progress_props.forEach(prop => { progress[prop] = progress2[prop]; });
            } else {
              self.progress_props.forEach(prp => progress[prp] = Number(progress2[prp]) - Number(progress1[prp]));
              progress.succeed = progress2.succeed;
              progress.failed = progress2.failed;
              progress.in_progress = progress2.in_progress;
            }

            project.progresses.push(progress);
          });
          const missedProgresses: ProgressAssistantByProject[] =
            self.differenceArray.uniqueInArray1(project1.progresses, project2.progresses, 'comapny');
          if (missedProgresses.length > 0) { missedProgresses.forEach(pr => project.progresses.push(pr)); }
        }
        report.projects.push(project);
      });

      const missedProjects: ProgressAssistantProject[] =
        self.differenceArray.uniqueInArray1(report1.projects, report2.projects, 'name');
      if (missedProjects.length > 0) { missedProjects.forEach(p => report.projects.push(p)); }

      self.report_props.forEach(prop => { report[prop] = report2[prop] - report1[prop]; });
      self.reports.push(report);
    });

    const missedReports: ProgressAssistant[] = self.differenceArray.uniqueInArray1(reports1, reports2, 'assistant');
    if (missedReports.length > 0) { missedReports.forEach(report => self.reports.push(report)); }
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

  updateData() {
    const self = this;
    self.start_updating = 'true';
    self.cookieService.set('last_assistant_progress_update', 'true', ((45 / 24) / 60));
    self.http.get(`${environment.serverUrl}/update_assistant_progress.json`).subscribe(
      res => {
        if (res['message'] !== 'Update is running' && res['message'] !== 'Update just started' &&
          res['message'] !== 'Update of another tenant is running') {
          self.start_updating = 'false';
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Error Updating`});
        }
      },
      err => { self.start_updating = 'false'; }
    );
    self.displayDialog = false;
  }

  showDialog() {
    const self = this;
    self.update_running = false;
    self.http.get(`${environment.serverUrl}/last_tenant_update.json`).subscribe(
      res => {
        if (res['last_assistant_progress_update']) {
          if (self.last_update && self.last_update === res['last_assistant_progress_update'] && self.start_updating === 'true') {
            self.update_running = true;
            self.displayDialog = true;
            setTimeout(() => { self.displayDialog = false; }, 5000);
          } else {
            self.last_update = res['last_assistant_progress_update'];
            self.cookieService.set('last_assistant_progress_update', self.last_update);
            if (self.start_updating === 'true') { self.reload_button = true; }
            self.start_updating = 'false';
            self.cookieService.set('start_assistant_progress_update', 'false');
            self.displayDialog = true;
          }
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Updating is not available`});
        }
      },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Updating is not available`});
      }
    );
  }

  reloadPage() {
    window.location.href = '/progress_assistant';
  }
}
