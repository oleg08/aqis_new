import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aqis-customer-tenant-email-templates',
  templateUrl: './customer-tenant-email-templates.component.html',
  styleUrls: ['./customer-tenant-email-templates.component.scss']
})
export class CustomerTenantEmailTemplatesComponent implements OnInit {

  activatedRoute: ActivatedRoute;
  path: string;
  top_email_templates_path: string;
  constructor(activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
  }

  ngOnInit() {
    const self = this;
    const values = this.activatedRoute.url['_value'];
    self.path = 'c_tenant_email_templates/' + values[0].path;
    self.top_email_templates_path = 'project_email_templates/' + values[0].path;
  }

}
