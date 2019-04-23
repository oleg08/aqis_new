import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StepDailyReport} from '../../assistant-steps-hours/assistant-steps-hours.component';

@Component({
  selector: 'app-aqis-daily-reports-filters',
  templateUrl: './daily-reports-filters.component.html',
  styleUrls: ['./daily-reports-filters.component.scss']
})
export class DailyReportsFiltersComponent implements OnInit {

  @Input() projects: object[];
  @Input() steps: StepDailyReport[];
  // tslint:disable-next-line:no-output-on-prefix
  @Output()onSearchStep: EventEmitter<object> = new EventEmitter<object>();
  selectedProject: string;
  searchName: string;

  constructor() { }

  ngOnInit() {
  }

  searchStep() {
    const self = this;
    let isIncludesName = true;
    let isIncludesProject = true;
    let searched_steps: StepDailyReport[];

    searched_steps = self.steps.filter(step => {
      isIncludesName = self.searchName ? step.name.toLowerCase().includes(self.searchName.toLowerCase()) : true;
      isIncludesProject = self.selectedProject ? step.project_name === self.selectedProject : true;
      return isIncludesName && isIncludesProject;
    });
    self.onSearchStep.emit({ searched_steps: searched_steps });
  }
}
