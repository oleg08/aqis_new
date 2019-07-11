import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssistantProgressesPropsService {

  constructor() { }

  reportProps() {
    const report_props: string[] = [
      'total_companies', 'companies_in_progress', 'companies_closed', 'companies_succeed', 'time_performed', 'time_total',
      'steps_performed', 'steps_total'
    ];
    return report_props;
  }
  projectProps() {
    const project_props: string[] = [
      'num_succeed', 'num_closed', 'num_in_progress', 'completed_steps', 'completed_steps_time', 'total_steps', 'total_steps_time'
    ];
    return project_props;
  }
  progressProps() {
    const progress_props: string[] = [
      'in_progress',
      'failed',
      'succeed',
      'steps_completed',
      'steps_completed_time',
      'steps_total',
      'steps_total_time'];
    return progress_props;
  }
}
