import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aqis-customer-tenant-step-details',
  templateUrl: './customer-tenant-step-details.component.html',
  styleUrls: ['./customer-tenant-step-details.component.scss']
})
export class CustomerTenantStepDetailsComponent implements OnInit {

  path = 'c_tenant_steps';
  templates_path: string;
  questions_path: string;
  q_prop1 = 'content';
  back_to_parent_path: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const self = this;
    const values = this.activatedRoute.url['_value'];
    const customer_tenant_id = values[1].parameters.customer_tenant_id;
    self.templates_path = 'c_tenant_email_templates/' + values[1].path + '?customer_tenant_id=' + customer_tenant_id;
    self.questions_path = 'customer_tenant_questions/' + values[1].path;
    self.back_to_parent_path = 'customers/' + values[1].parameters.parent_path;
  }

}
