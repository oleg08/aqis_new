import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tenant-step-details',
  templateUrl: './tenant-step-details.component.html',
  styleUrls: ['./tenant-step-details.component.scss']
})
export class TenantStepDetailsComponent implements OnInit {

  path = 'tenant_steps';
  templates_path = 'tenant_email_templates';
  questions_path = 'tenant_questions';
  q_prop1 = 'content';

  constructor() { }

  ngOnInit() {
  }

}
