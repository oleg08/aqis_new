import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tenant-email-templates',
  templateUrl: './tenant-email-templates.component.html',
  styleUrls: ['./tenant-email-templates.component.scss']
})
export class TenantEmailTemplatesComponent implements OnInit {

  path = 'tenant_email_templates';
  return_path = '/tenant_steps';
  return_label = 'Go to Tenant Steps';
  top_email_templates_path = 'main_email_templates';

  constructor() { }

  ngOnInit() {
  }

}
