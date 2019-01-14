import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aqis-main-email-templates',
  templateUrl: './main-email-templates.component.html',
  styleUrls: ['./main-email-templates.component.scss']
})
export class MainEmailTemplatesComponent implements OnInit {

  path = 'main_email_templates';
  return_path = '/steps';
  return_label = 'Go to Steps';

  constructor() { }

  ngOnInit() {
  }

}
