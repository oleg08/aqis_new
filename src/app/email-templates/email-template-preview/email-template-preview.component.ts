import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { EmailTemplates } from '../../interfaces/email-templates';

@Component({
  selector: 'app-aqis-email-template-preview',
  templateUrl: './email-template-preview.component.html',
  styleUrls: ['./email-template-preview.component.scss']
})
export class EmailTemplatePreviewComponent implements OnInit {

  @Input() template: EmailTemplates;
  @Input() send_button: boolean;
  @Output() send: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
  }

  clickSend() { this.send.emit(); }

}
