import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { EmailTemplates } from '../../interfaces/email-templates';

@Component({
  selector: 'app-aqis-select-email-templates-list',
  templateUrl: './select-email-templates-list.component.html',
  styleUrls: ['./select-email-templates-list.component.scss']
})
export class SelectEmailTemplatesListComponent implements OnInit {
  selectedEmailTemplates: EmailTemplates[];
  cols: object[];
  @Input() email_templates: EmailTemplates[];
  @Output() sendItems: EventEmitter<object> = new EventEmitter<object>();
  constructor() { }

  ngOnInit() {
    const self = this;
    self.cols = [
      { field: 'name', header: 'Name' },
      { field: 'body', header: 'Body' }
    ];
  }

  click (templates: EmailTemplates[]) {
    this.sendItems.emit(templates);
    this.clear();
  }

  clear() {
    this.selectedEmailTemplates = [];
  }

}
