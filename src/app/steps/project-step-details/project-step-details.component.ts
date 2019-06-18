import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecodeStepsUrlService } from '../../services/decode-steps-url.service';

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

    const decoded_values = DecodeStepsUrlService.handler(values[1]);
    const main_path: string = decoded_values.main_path;
    const parent_path: string = decoded_values.parent_path;

    self.templates_path = 'email_templates/' + main_path;

    self.questions_path = 'project_questions/' + parent_path;
    self.back_to_parent_path = 'projects/' + parent_path;
  }

}
