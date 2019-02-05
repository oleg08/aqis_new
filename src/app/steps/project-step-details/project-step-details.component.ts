import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aqis-project-step-details',
  templateUrl: './project-step-details.component.html',
  styleUrls: ['./project-step-details.component.scss']
})
export class ProjectStepDetailsComponent implements OnInit {

  path = 'project_steps';
  templates_path: string;
  questions_path: string;
  q_prop1 = 'question';
  back_to_parent_path: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const self = this;
    const values = this.activatedRoute.url['_value'];
    self.templates_path = 'email_templates/' + values[1].path;

    self.questions_path = 'project_questions/' + values[1].parameters.parent_path;
    self.back_to_parent_path = 'projects/' + values[1].parameters.parent_path;
  }

}
