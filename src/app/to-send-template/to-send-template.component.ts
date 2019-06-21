import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FlashHighlightsService } from '../services/flash-highlights.service';
import { Message } from 'primeng/primeng';
import { MessageService            } from 'primeng/components/common/messageservice';
import { GetToSendEmailsService } from '../services/get-to-send-emails.service';

import { ToSendEmail } from '../interfaces/to-send-email';
import { EmailTemplates } from '../interfaces/email-templates';
import {CallAlertService} from '../services/call-alert.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-to-send-template',
  templateUrl: './to-send-template.component.html',
  styleUrls: ['./to-send-template.component.scss'],
  providers: [
    FlashHighlightsService,
    MessageService,
    GetToSendEmailsService
  ]
})
export class ToSendTemplateComponent implements OnInit {

  to_send_emails: ToSendEmail[];
  msgs: Message[] = [];
  approvals: object[];
  cols: object[];
  states: object[];

  @ViewChild('toSendEmailsList', { static: true }) el: ElementRef;

  constructor(private http: HttpClient,
              private callAlert: CallAlertService,
              private flashHighlights: FlashHighlightsService,
              private rd: Renderer2,
              private messageService: MessageService,
              private getToSendEmails: GetToSendEmailsService) { }

  ngOnInit() {
    const self = this;

    self.cols = [
      { field: 'got_time', header: 'Received' },
      { field: 'got_email', header: 'Received Email' },
      { field: 'c_tenant_email_template.body', header: 'Suggested Answer' },
      { field: 'state', header: '' }
    ];

    self.states = [
      { label: 'All', value: null },
      { label: 'Approved', value: 'approved' },
      { label: 'Rejected', value: 'rejected' },
      { label: 'Dismissed', value: 'dismissed' }
    ];

    setTimeout(() => {
      const table = self.el.nativeElement.querySelector('.to-send-emails-table').children[0].children[0];
      self.rd.addClass(table, 'width100');
    });

    self.approvals = [
      { title: 'Approved', value: 'approved', icon: 'fa fa-check-square-o' },
      { title: 'Rejected', value: 'rejected', icon: 'fa fa-remove' }
    ];

    self.getToSendEmails.get().subscribe(
      data => {
        if (data['to_send_emails']) {
          self.to_send_emails = data['to_send_emails'];
          self.to_send_emails.forEach(e => {
            if (e.c_tenant_email_template_id) {
              e.answer = e.c_tenant_email_template.body.replace(/\n/gi,  ' <br/> ' );
            }
            // e.got_email = e.got_email.replace(/\n/gi,  " <br/> " );
            e.got_email = e.got_email.replace(/(\>\s|\n)+/gi,  ' <br/> ' );
            // e.got_email = e.got_email.replace(/<\S+@tamag.= eu/gi,  " <hr/> " );
            e.got_email = e.got_email.replace(/(clavo@tamag.eu|<\S+@tamag.= eu)/gi,  ' <hr/> ' );

            e.got_email = e.got_email.replace(/(=([A-Z]|\d){2})+/gi,  ' # ' );
            e.dismissed = e.state === 'dismissed';
          });
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        }
      },
      data => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
      }
    );
  }

  updateRequest(id, params) {
    const self = this;
    const to_send_emails: ToSendEmail[] = [...self.to_send_emails];
    self.http.patch(environment.serverUrl + '/to_send_emails/' + id + '.json', params
    ).subscribe(
      response => {
        if (response['to_send_email']) {
          const item = to_send_emails.find(e => e.id === id);
          item.state = response['to_send_email']['state'];
          item.dismissed = item.state === 'dismissed';
          self.to_send_emails = to_send_emails;
          self.flashHighlights.handler(self, '#approve-', String(id), 'success-updated');
        } else {
          self.flashHighlights.handler(self, '#approve-', String(id), 'failed-update');
        }
      },
      response => {
        self.flashHighlights.handler(self, '#approve-', String(id), 'failed-update');
      }
    );
  }

  setState(state, id, text: string) {
    const self = this;
    const params = { state: state };
    if (state === 'approved') params['text'] = text;
    self.updateRequest(id, params);
  }

  dismiss(state, id) {
    const self = this;
    const value = state ? 'dismissed' : null;
    self.updateRequest(id, { state: value });
  }

  pressEnter(event, id) {
    event.stopPropagation();
  }

}
