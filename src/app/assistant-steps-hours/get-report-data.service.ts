import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StepDailyReport } from './assistant-steps-hours.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetReportDataService {

  constructor(private http: HttpClient) { }

  indexAssistantReports() {
    return this.http.get<any>(`${environment.serverUrl}/assistant_daily_reports.json`)
      .toPromise()
      .then(res => <object>res)
      .then(data => data);
  }

  getAssistantsReports() {
    return this.http.get<any>(`${environment.serverUrl}/steps_daily_reports.json`)
      .toPromise()
      .then(res => <StepDailyReport[]>res['steps'])
      .then(data => data);
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
      .then(data => data);
  }
}
