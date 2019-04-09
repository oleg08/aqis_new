import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StepDailyReport } from './assistant-steps-hours.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetReportDataService {

  steps: StepDailyReport[] = [
    {
      id: 1,
      name: 'Step 1',
      project_name: 'Project 1',
      company_name: 'Company 1',
      assistant_daily_reports: [
        {
          id: 1,
          description: 'I worked hardly this day',
          report_date: new Date(),
          user_id: 1,
          c_tenant_step_id: 1,
          hours: 10
        },
        {
          id: 2,
          description: 'I worked successfully this day',
          report_date: new Date(),
          user_id: 1,
          c_tenant_step_id: 1,
          hours: 15
        }
      ]
    },
    {
      id: 2,
      name: 'Step 2',
      project_name: 'Project 2',
      company_name: 'Company 2',
      assistant_daily_reports: [
        {
          id: 3,
          description: 'I worked hardly this day',
          report_date: new Date(),
          user_id: 1,
          c_tenant_step_id: 1,
          hours: 10
        },
        {
          id: 4,
          description: 'I worked successfully this day',
          report_date: new Date(),
          user_id: 1,
          c_tenant_step_id: 1,
          hours: 15
        }
      ]
    }
  ];

  constructor(private http: HttpClient) { }

  getAssistantsReports() {
    return this.http.get<any>(`${environment.serverUrl}/steps_daily_reports.json`)
      .toPromise()
      .then(res => <StepDailyReport[]>res['steps'])
      .then(data => { return data; });
  }

  createAssistantReport(params) {
    return this.http.post(`${environment.serverUrl}/assistant_daily_reports.json`, params)
      .toPromise()
      .then((res: object) => {
        return res;
      })
      .then(data => {
        return data;
      });
  }

  editAssistantReport(report_id, params) {
    return this.http.patch(`${environment.serverUrl}/assistant_daily_reports/${report_id}.json`, params)
      .toPromise()
      .then(res => <object>res)
      .then(data => data);
  }

  deleteAssistantReport(report_id) {
    return this.http.delete(`${environment.serverUrl}/assistant_daily_reports/${report_id}.json`)
      .toPromise()
      .then(res => <object>res)
      .then(data => { return data; });
  }
}
