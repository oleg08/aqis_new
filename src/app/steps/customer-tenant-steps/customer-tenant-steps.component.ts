import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aqis-customer-tenant-steps',
  templateUrl: './customer-tenant-steps.component.html',
  styleUrls: ['./customer-tenant-steps.component.scss']
})
export class CustomerTenantStepsComponent implements OnInit {

  path: string;
  top_steps_path: string;
  templates_path = '';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const self = this;
    const values = this.activatedRoute.url['_value'];
    self.path = 'c_tenant_step/' + values[1].path;
    self.top_steps_path = 'project_steps/' + values[1].path;
  }

}
