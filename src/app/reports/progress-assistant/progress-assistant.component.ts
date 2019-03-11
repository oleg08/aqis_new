import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

export interface ProgressAssistant {
  assistant?: string;
  projects: ProgressAssistantProject[];
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
  styleUrls: ['./progress-assistant.component.scss']
})
export class ProgressAssistantComponent implements OnInit {

  reports: ProgressAssistant[];
  reportsFilters: FormGroup;
  chosenMonthDate: Date = new Date(2020, 0, 1);
  monthInputCtrl: FormControl = new FormControl(new Date(2020, 0, 1));
  submitted = false;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

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

    self.http.post(`${environment.serverUrl}/progress_assistant.json`, {}).subscribe(
      res => { if (res['reports']) { self.reports = res['reports']; } },
      err => {}
    );
  }

  get f() { return this.reportsFilters.controls; }

  submitFilters() {
    const self = this;
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

    self.http.post(`${environment.serverUrl}/progress_assistant.json`, self.reportsFilters.value).subscribe(
      res => { if (res['reports']) { self.reports = res['reports']; } },
      err => {}
    );
  }

  validateValue(key1, key2, val1, val2, min, max, dif) {
    if (val1 >= val2 && val2 !== 0) {
      if (val1 > max - dif) {
        val1 = min;
        val2 = max;
      } else {
        val2 = val1 + dif;
      }
    }
    return{ [key1]: val1, [key2]: val2 };
  }
}
