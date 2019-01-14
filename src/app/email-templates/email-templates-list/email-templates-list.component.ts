import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CallAlertService } from '../../services/call-alert.service';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { Message         } from 'primeng/primeng';
import { MessageService  } from 'primeng/components/common/messageservice';
import { ToHtmlService } from '../../services/to-html.service';
import { EmailTemplates } from '../../interfaces/email-templates';
import { Keywords } from '../../interfaces/keywords';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-aqis-email-templates-list',
  templateUrl: './email-templates-list.component.html',
  styleUrls: ['./email-templates-list.component.scss'],
  providers: [
    CallAlertService,
    FlashHighlightsService,
    MessageService,
    ToHtmlService
  ]
})
export class EmailTemplatesListComponent implements OnInit {

  msgs: Message[] = [];

  template: EmailTemplates;

  displayNew:  boolean;
  displayEdit:  boolean;
  filteredKeywords: any[];
  filteredHotKeywords: any[];

  @Input() email_templates: EmailTemplates[];
  @Input() return_button: string;
  @Input() return_label: string;
  @Input() keywords: Keywords[];
  @Input() hot_keywords: Keywords[];
  @Input() super_admin: boolean;

  @Output() addItem:             EventEmitter<object> = new EventEmitter<object>();
  @Output() cancelUpdate:        EventEmitter<object> = new EventEmitter<object>();
  @Output() saveItem:            EventEmitter<object> = new EventEmitter<object>();
  @Output() removeItem:          EventEmitter<object> = new EventEmitter<object>();
  @Output() enterAutoComplete:   EventEmitter<object> = new EventEmitter<object>();
  @Output() focusAutoComplete:   EventEmitter<object> = new EventEmitter<object>();
  @Output() addToAutoComplete:   EventEmitter<object> = new EventEmitter<object>();
  @Output() addGeneralTemplates: EventEmitter<object> = new EventEmitter<object>();

  constructor(private http: HttpClient,
              private router: Router,
              private callAlert: CallAlertService,
              private flashHighlights: FlashHighlightsService,
              private messageService: MessageService,
              private toHTML:         ToHtmlService) { }

  ngOnInit() {
    const self = this;
    self.email_templates.forEach(et => et.body_html = self.toHTML.handler(et.body));
  }

  create(template: EmailTemplates) {
    const self = this;

    const duplicate = self.email_templates.find(item => item.name === template.name);

    if (duplicate) {
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: `The same name is already exists`});
      return;
    }

    self.addItem.emit( template );
    self.displayNew = false;
  }

  closeNewDialog() {
    this.displayNew = false;
  }

  showEdit(template) {
    const self = this;
    self.template = template;
    self.displayEdit = true;
  }

  cancelEdit() {
    this.cancelUpdate.emit();
  }

  save() {
    const self = this;

    const item = self.template;
    const duplicate = self.email_templates.find(t => t.name === item.name && t.id !== item.id);

    if (duplicate) {
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: `The same name is already exists`});
      self.cancelUpdate.emit();
      return;
    }
    self.template.body_html = self.toHTML.handler(self.template.body);
    const object = {
      id:       item.id,
      subject:  item.subject,
      name:     item.name,
      body:     item.body,
      footer:   item.footer
    };

    self.saveItem.emit(object);
  }

  remove (item) {
    const self = this;
    self.removeItem.emit(item);
  }

  // Multiple AutoComplete

  filterKeywords(event, keywords) {
    const filtered = [];
    for (let i = 0; i < keywords.length; i++) {
      const keyword = keywords[i];
      if (keyword.label.toLowerCase().indexOf(event.query.toLocaleLowerCase()) === 0) {
        filtered.push(keyword);
      }
    }
    return filtered;
  }

  getKeywords (event) {
    const self = this;
    self.filteredKeywords = self.filterKeywords(event, self.keywords);
  }

  getHotKeywords (event) {
    const self = this;
    self.filteredHotKeywords = self.filterKeywords(event, self.hot_keywords);
  }

  keyUp(event, index, template_id, type) {
    const self = this;
    if (event.key === 'Enter' && event.originalTarget.value) {
      const value: string = event.originalTarget.value;

      for (const i in self[type]) {
        if (self[type][i].label.toLocaleLowerCase() === value.toLocaleLowerCase()) {
          return;
        }
      }

      const obj = { [type.slice(0, -1)]: { label: value }, template_id: template_id, index: index, type: type };

      self.enterAutoComplete.emit(obj);
      event.originalTarget.value = null;
    }
  }

  addKeyword(event, template, type, subtract) {
    const self = this;
    const object = { event: event, template: template, subtract: subtract, type: type };
    self.addToAutoComplete.emit(object);
  }

  focusKeywords (event, keywords, type) {
    this.focusAutoComplete.emit({ keywords: keywords, type: type });
  }

  addGeneral (event) {
    this.addGeneralTemplates.emit(event);
  }

  returnTo() {
    const self = this;
    // if (self.return_label.split(' ')[0] === 'Go') window.location.href = self.return_button;
    // else self.router.navigate([self.return_button]);
    self.router.navigate([self.return_button]);
  }

}
