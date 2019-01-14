import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aqis-project-email-templates',
  templateUrl: './project-email-templates.component.html',
  styleUrls: ['./project-email-templates.component.scss']
})
export class ProjectEmailTemplatesComponent implements OnInit {

  activatedRoute: ActivatedRoute;
  path: string;
  return_path = '/';
  return_label = 'Return to Projects';
  top_email_templates_path: string;

  constructor(activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
  }

  ngOnInit() {
    const self = this;
    const values = this.activatedRoute.url['_value'];
    self.path = values[0].path + '/' + values[1].path;
    self.top_email_templates_path = 'tenant_email_templates/' + values[1].path;
  }

}
