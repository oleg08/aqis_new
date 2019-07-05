import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CallAlertService } from '../../services/call-alert.service';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { Message, OverlayPanel } from 'primeng/primeng';
import { MessageService  } from 'primeng/components/common/messageservice';
import { EmailTemplates } from '../../interfaces/email-templates';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { GetEmailTemplatesService } from '../../services/get-email-templates.service';
import { SelectEmailTemplatesListComponent } from '../select-email-templates-list/select-email-templates-list.component';

@Component({
  selector: 'app-aqis-email-templates-order-list',
  templateUrl: './email-templates-order-list.component.html',
  styleUrls: ['./email-templates-order-list.component.scss'],
  animations: [
    trigger('newLabel', [
      state('inactive', style({
        transform: 'scale(1)',
        backgroundColor: '#bcf442'
      })),
      state('active', style({
        transform: 'scale(1.1)',
        backgroundColor: '#41c4f4'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ]),
  ],
  providers: [
    CallAlertService,
    FlashHighlightsService,
    MessageService,
    GetEmailTemplatesService
  ]
})
export class EmailTemplatesOrderListComponent implements OnInit {

  msgs: Message[] = [];
  templates: EmailTemplates[];
  saved: false;
  displayNew = false;
  label_state = 'active';

  @ViewChild('select_list', { static: false }) select_list: SelectEmailTemplatesListComponent;

  @Input() email_templates: EmailTemplates[];
  @Input() g_templates: EmailTemplates[];
  @Input() path: string;

  @Output() addOne: EventEmitter<object> = new EventEmitter<object>();
  @Output() addTemplates: EventEmitter<object> = new EventEmitter<object>();
  @Output() removeTemplate: EventEmitter<object> = new EventEmitter<object>();
  @Output() reorderTemplates: EventEmitter<object> = new EventEmitter<object>();
  @Output() getEmailTemplates: EventEmitter<object> = new EventEmitter<object>();

  constructor(private http: HttpClient,
              private callAlert: CallAlertService,
              private flashHighlights: FlashHighlightsService) { }

  ngOnInit() {
  }

  createOne (object) {
    this.addOne.emit(object);
    this.displayNew = false;
  }

  closeNewDialog () {
    this.displayNew = false;
  }

  addItems(email_templates, overlaypanel: OverlayPanel) {

    const self = this;
    this.addTemplates.emit(email_templates);

    setInterval(() => {
      self.label_state = 'active';
      setTimeout(() => {
        self.label_state = 'inactive';
      }, 1000);
    }, 2000);

    overlaypanel.hide();
  }

  getGeneralEmailTemplates() {
    this.getEmailTemplates.emit();
  }

  clear () {
    this.select_list.clear();
  }

  remove(email_template: EmailTemplates) {
    this.removeTemplate.emit(email_template);
  }

  reorder(email_templates: EmailTemplates[]) {
    const ids: Array<number> = [];
    email_templates.forEach(et => ids.push(et.id));
    this.reorderTemplates.emit(ids);
  }
}
