import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aqis-project-step',
  templateUrl: './project-step.component.html',
  styleUrls: ['./project-step.component.scss']
})
export class ProjectStepComponent implements OnInit {

  path: string;
  top_steps_path: string;
  templates_path = '';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const self = this;
    const values = this.activatedRoute.url['_value'];
    self.path = 'project_list_steps/' + values[1].path;
    self.top_steps_path = 'tenant_steps/' + values[1].path;
  }

}
