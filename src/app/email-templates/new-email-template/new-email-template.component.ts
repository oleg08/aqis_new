import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CallAlertService } from '../../services/call-alert.service';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { CapitalizeService } from '../../services/capitalize.service';
import { Message         } from 'primeng/primeng';
import { MessageService  } from 'primeng/components/common/messageservice';
import { KeywordsService } from '../../services/keywords.service';
import { environment } from '../../../environments/environment';

import { EmailTemplates } from '../../interfaces/email-templates';
import { Keywords } from '../../interfaces/keywords';

@Component({
  selector: 'app-aqis-new-email-template',
  templateUrl: './new-email-template.component.html',
  styleUrls: ['./new-email-template.component.scss'],
  providers: [
    CallAlertService,
    FlashHighlightsService,
    MessageService,
    KeywordsService,
    CapitalizeService
  ]
})
export class NewEmailTemplateComponent implements OnInit {

  msgs: Message[] = [];

  newSubject:  string;
  newGreeting: string;
  newName:     string;
  newBody:     string;
  newFooter:   string;
  keywords: Keywords[];
  hot_keywords: Keywords[];
  filteredKeywords: Keywords[];
  filteredHotKeywords: Keywords[];
  selectedKeywords: Keywords[] = [];
  selectedHotKeywords: Keywords[] = [];

  @Input() header: string;
  @Input() super_admin: boolean;
  @Input() not_template: boolean;              // true if email is written by hand

  @Output() submitForm:           EventEmitter<object> = new EventEmitter<object>();
  @Output() closeDialog:           EventEmitter<object> = new EventEmitter<object>();

  constructor(private http: HttpClient,
              private capitalize: CapitalizeService,
              private callAlert: CallAlertService,
              private keywordsService: KeywordsService,
              private flashHighlights: FlashHighlightsService,
              private messageService: MessageService) { }

  ngOnInit() {
    const self = this;
    self.keywordsService.getKeywords().then(keywords => self.keywords = keywords);
    self.keywordsService.getHotKeywords().then(hot_keywords => self.hot_keywords = hot_keywords);
  }

  submit(form) {
    const self = this;

    const keyword_ids = [];
    self.selectedKeywords.forEach(k => keyword_ids.push(k.id));

    const hot_keyword_ids = [];
    self.selectedHotKeywords.forEach(k => hot_keyword_ids.push(k.id));

    let new_item: EmailTemplates;
    new_item = {
      subject:         self.newSubject,
      name:            self.newName,
      body:            self.newBody,
      footer:          self.newFooter,
      keyword_ids:     keyword_ids,
      hot_keyword_ids: hot_keyword_ids
    };
    if (self.not_template) {
      new_item.greeting = self.newGreeting;
    }

    self.submitForm.emit( new_item );

    self.newSubject = null;
    self.newGreeting = null;
    self.newName = null;
    self.newBody = null;
    self.newFooter = null;
    self.selectedKeywords = [];
    self.selectedHotKeywords = [];
    form.form.markAsPristine();
  }

  close() {
    this.closeDialog.emit();
  }

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

  keyUp(event, type) {
    const self = this;

    if (event.key === 'Enter' && event.originalTarget.value) {

      const keyword: Keywords = { label: event.originalTarget.value };

      if (!self[type].find(k => k.label === keyword.label)) {

        self.http.post(environment.serverUrl + '/' + type + '.json',  keyword
        ).subscribe(
          response => {
            if (response[type.slice(0, -1)]) {
              keyword.id = response[type.slice(0, -1)]['id'];
              self[type].push(keyword);
              self['selected' + self.capitalize.concatAndCapitalize(type, '_')].push(keyword);
              event.originalTarget.value = null;
            } else {
              self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create keyword`});
            }
          },
          response => {
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create keyword`});
          }
        );
      }
    }
  }

}
