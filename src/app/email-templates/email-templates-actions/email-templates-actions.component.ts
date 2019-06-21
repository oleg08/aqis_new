import { Component, OnInit, Renderer2, ElementRef, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message, OverlayPanel } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { GetEmailTemplatesService } from '../../services/get-email-templates.service';
import { KeywordsService } from '../../services/keywords.service';
import { PassProjectIdService } from '../../services/pass-project-id.service';
import { CookieService } from 'ngx-cookie-service';
import { ToHtmlService } from '../../services/to-html.service';
import { Keywords } from '../../interfaces/keywords';
import { EmailTemplates } from '../../interfaces/email-templates';
import { environment } from '../../../environments/environment';
import {Project} from '../../interfaces/project';

@Component({
  selector: 'app-aqis-email-templates-actions',
  templateUrl: './email-templates-actions.component.html',
  styleUrls: ['./email-templates-actions.component.scss'],
  providers: [
    MessageService,
    GetEmailTemplatesService,
    KeywordsService,
    ToHtmlService
  ]
})
export class EmailTemplatesActionsComponent implements OnInit {

  copy_templates:  EmailTemplates[];
  email_templates: EmailTemplates[];
  originalValue:   string;
  msgs: Message[] = [];
  url: any;
  data_key: any;
  id: any = null;
  current_project_id: number|string;

  keywords: Keywords[];
  hot_keywords: Keywords[];
  copy_keywords: Keywords[];
  copy_hot_keywords: Keywords[];
  top_email_templates: string;

  @Input() path: string;
  @Input() return_button: string;
  @Input() return_label: string;
  @Input() top_email_templates_path: string;
  @Input() super_admin: boolean;

  @ViewChild('EmailTemplatesList', { static: false }) el: ElementRef;

  constructor(private http: HttpClient,
              private getEmailTemplates: GetEmailTemplatesService,
              private keywordsService:   KeywordsService,
              private toHTML: ToHtmlService,
              private rd: Renderer2,
              private messageService: MessageService,
              private passProjectId:   PassProjectIdService,
              private cookieService:   CookieService) { }

  ngOnInit() {
    const self = this;

    self.url = self.path.split('/');
    if (self.url.length > 1) {
      self.id = self.url[1];

      if (self.url[0] === 'c_tenant_email_templates') {
        let current_project: Project;
        self.passProjectId.currentProject.subscribe(project => current_project = project);
        self.current_project_id = current_project ? current_project.id : self.cookieService.get('project_id');
      }
    }
    self.url = self.url[0];
    self.data_key = JSON.parse(JSON.stringify(self.url));

    self.keywordsService.getKeywords().then(keywords => {
      self.keywords = keywords;
    });

    self.keywordsService.getHotKeywords().then(hot_keywords => {
      self.hot_keywords = hot_keywords;
    });

    self.getEmailTemplates.get(self.path, self.current_project_id).subscribe(
      data => {
        if (data[self.data_key]) {
          self.email_templates = data[self.data_key];

          self.copy_templates = JSON.parse(JSON.stringify(self.email_templates));
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        }
      },
      data => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
      }
    );
  }

  createTemplate (new_template: EmailTemplates) {
    const self = this;

    const email_templates: EmailTemplates[] = [...self.email_templates];
    const template: EmailTemplates = new_template;

    const data_key = self.data_key.slice(0, -1);

    const params = {
      [data_key]: template,
      keywords: template.keyword_ids,
      hot_keywords: template.hot_keyword_ids
    };

    self.http.post(environment.serverUrl + '/' + self.path + '.json',  params
    ).subscribe(
      response => {
        if (response[data_key]) {
          template.id = response[data_key]['id'];
          template.keywords = response[data_key]['keywords'];
          template.hot_keywords = response[data_key]['hot_keywords'];
          template.body_html = self.toHTML.handler(template.body);
          email_templates.push(template);

          self.email_templates = email_templates;
          self.copy_templates = JSON.parse(JSON.stringify(self.email_templates));
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Template`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Template`});
      }
    );
  }

  saveTemplate(object) {
    const self = this;

    const template: EmailTemplates = object;
    const params = {
      subject:  template.subject,
      name:     template.name,
      body:     template.body
    };
    if (!self.super_admin) params['footer'] = template.footer;

    const data_key = self.data_key.slice(0, -1);

    self.http.patch(environment.serverUrl + '/' + self.url + '/' + template.id + '.json', {[data_key]: params}
    ).subscribe(
      response => {
        if (response[data_key]) {
          self.messageService.add({severity: 'success', summary: 'Success', detail: `Template successfully updated.`});
          self.copy_templates = JSON.parse(JSON.stringify(self.email_templates));
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't update Template`});
          self.email_templates = JSON.parse(JSON.stringify(self.copy_templates));
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't update Template`});
        self.email_templates = JSON.parse(JSON.stringify(self.copy_templates));
      }
    );
  }

  cancelEdit() {
    const self = this;
    self.email_templates = JSON.parse(JSON.stringify(self.copy_templates));
    self.email_templates.forEach(et => et.body_html = self.toHTML.handler(et.body));
  }

  deleteTemplate(template) {
    const self = this;

    let email_templates: EmailTemplates[] = [...self.email_templates];

    self.http.delete(environment.serverUrl + '/' + self.url + '/' + template.id + '.json'
    ).subscribe(
      response => {
        if (response['message'] === 'Template successfully deleted') {
          email_templates = email_templates.filter(t => t.id !== template.id);
          self.email_templates = email_templates;
          self.copy_templates = JSON.parse(JSON.stringify(self.email_templates));
          self.messageService.add({severity: 'success', summary: 'Success', detail: `Template successfully deleted.`});
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete Template`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete Template`});
      }
    );
  }

  // Multiple AutoComplete

  pressEnter(object) {
    const self = this;

    const model = self.path.split('/')[0];
    const key = object.type.slice(0, -1);
    self.http.post(environment.serverUrl + '/' + object.type + '.json',
      { [key]: object[key], email_template_id: object.template_id, model: model }
    ).subscribe(
      response => {
        if (response[key]) {
          object[key].id = response[key]['id'];
          self.messageService.add({severity: 'success', summary: 'Success', detail: `Keyword successfully created`});
          self[object.type].push(object[key]);
          self['copy_' + object.type].push(object[key]);
          self.email_templates[object.index][object.type].push(object[key]);
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create keyword`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create keyword`});
      }
    );
  }

  addKeyword(object) {
    const self = this;

    const params = { keyword_id: object.event.id, model: self.data_key };

    if (object.subtract) {
      params['subtract'] = true;
    }

    self.http.post(environment.serverUrl + '/add_' + object.type.slice(0, -1) + '/' + object.template.id + '.json',
      params
    ).subscribe(
      response => {
        if (response['email_template']) {
          self['copy_' + object.type] = JSON.parse(JSON.stringify(object.template[object.type]));
        } else {
          object.template[object.type] = JSON.parse(JSON.stringify(self['copy_' + object.type]));
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create keyword`});
        }
      },
      response => {
        object.template[object.type] = JSON.parse(JSON.stringify(self['copy_' + object.type]));
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create keyword`});
      }
    );
  }

  focusKeywords (obj) {
    const self = this;
    self['copy_' + obj.type] = JSON.parse(JSON.stringify(obj.keywords));
  }

  showTemplatesList(event, overlaypanel: OverlayPanel) {
    const self = this;
    overlaypanel.toggle(event);
    const key = self.top_email_templates_path.split('/')[0];
    self.getEmailTemplates.get('sliced_' + self.top_email_templates_path).subscribe(
      data => {
        if (data[key]) {
          self.top_email_templates = data[key];
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        }
      },
      data => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
      }
    );
  }

  addGeneralTemplates(templates: EmailTemplates[], overlaypanel: OverlayPanel) {
    const self = this;

    let url = '/add_to_' + self.data_key;
    if (self.id) url += '/' + self.id;
    url += '.json';

    const ids: number[] = [];
    templates.forEach(et => ids.push(et.id));

    const email_templates: EmailTemplates[] = [...self.email_templates];
    self.http.post(environment.serverUrl + url, { email_template_ids: ids }
    ).subscribe(
      response => {
        if (response['new_email_templates'] && response['new_email_templates'].length > 0) {
          const new_email_templates: EmailTemplates[] = response['new_email_templates'];
          new_email_templates.forEach(template => {
            template.body_html = self.toHTML.handler(template.body);
            email_templates.push(template);
          });
          self.email_templates = email_templates;
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `There isn't new Email Templates`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
      }
    );
    overlaypanel.visible = false;
  }

}
