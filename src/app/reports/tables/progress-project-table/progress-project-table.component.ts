import {Component, Input, OnInit} from '@angular/core';
import {ProgressAssistantProject} from '../../progress-assistant/progress-assistant.component';

@Component({
  selector: 'app-aqis-progress-project-table',
  templateUrl: './progress-project-table.component.html',
  styleUrls: ['./progress-project-table.component.scss']
})
export class ProgressProjectTableComponent implements OnInit {

  @Input() project: ProgressAssistantProject;

  constructor() { }

  ngOnInit() {
  }

}
