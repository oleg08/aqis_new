import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tenant-step',
  templateUrl: './tenant-step.component.html',
  styleUrls: ['./tenant-step.component.scss']
})
export class TenantStepComponent implements OnInit {

  path = 'tenant_steps';
  top_steps_path = 'steps';
  templates_path = '';

  constructor() { }

  ngOnInit() {
  }

}
