import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aqis-step-details',
  templateUrl: './step-details.component.html',
  styleUrls: ['./step-details.component.scss']
})
export class StepDetailsComponent implements OnInit {

  path = 'steps';
  templates_path = 'main_email_templates';
  questions_path = 'questions';
  q_prop1 = 'content';

  constructor() { }

  ngOnInit() {
  }

}
