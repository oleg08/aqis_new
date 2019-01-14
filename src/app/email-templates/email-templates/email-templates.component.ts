import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-templates',
  templateUrl: './email-templates.component.html',
  styleUrls: ['./email-templates.component.scss']
})
export class EmailTemplatesComponent implements OnInit {

  path = 'email_templates';

  constructor() { }

  ngOnInit() {
  }

}
