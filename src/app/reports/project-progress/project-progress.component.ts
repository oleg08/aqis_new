import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/primeng';
import { CookieService } from 'ngx-cookie-service';

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

  last_update: string;
  load_completed = false;
  projects: ProjectReport[];
  reports: ReportProgress[];
  msgs: Message[] = [];
  displayDialog = false;
  update_running = false;
  start_updating = 'false';   // evualate to 'true' when click 'Yes' on the confirmation dialog
  reload_button = false;

  constructor(private messageService: MessageService, private cookieService: CookieService, private http: HttpClient) { }

  ngOnInit() {
    const self = this;
    self.start_updating = self.cookieService.get('start_progress_update'); // checks whether button 'Yes' on the confirmation was clicked
    self.last_update = self.cookieService.get('last_progress_update');
    // self.start_updating = 'false';

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

  updateData() {
    const self = this;
    self.start_updating = 'true';
    self.cookieService.set('start_progress_update', 'true', ((45 / 24) / 60));
    self.http.get(`${environment.serverUrl}/update_projects_progress.json`).subscribe(
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
        if (res['last_update']) {
          if (self.last_update && self.last_update === res['last_update'] && self.start_updating === 'true') {
            self.update_running = true;
            self.displayDialog = true;
            setTimeout(() => { self.displayDialog = false; }, 5000);
          } else {
            self.last_update = res['last_update'];
            self.cookieService.set('last_progress_update', self.last_update);
            if (self.start_updating === 'true') { self.reload_button = true; }
            self.start_updating = 'false';
            self.cookieService.set('start_progress_update', 'false');
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
    window.location.href = '/reports_project_progress';
  }
}
