import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message         } from 'primeng/primeng';
import { MessageService  } from 'primeng/components/common/messageservice';

import { environment } from '../../environments/environment';

export class InfoLink {
  constructor(
    public id: number = null,
    public search_system: string = '',
    public prepend_url: string = '',
    public separator: string = ''
  ) {}
}

@Component({
  selector: 'app-info-links',
  templateUrl: './info-links.component.html',
  styleUrls: ['./info-links.component.scss'],
  providers: [
    MessageService
  ]
})
export class InfoLinksComponent implements OnInit {

  regModel: InfoLink;
  showNew = false;
  submitType = 'Save';
  selectedRow: number;
  separators: string[] = ['_', '+'];
  info_links: InfoLink[] = [];
  msgs: Message[] = [];
  dataLoaded = false;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  ngOnInit() {
    const self = this;
    self.http.get(`${environment.serverUrl}/info_links.json`).subscribe(
      res => {
        self.info_links = res['info_links'];
        self.dataLoaded = true;
      },
      err => { self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`}); }
    );
  }

  onNew() {
    const self = this;
    self.regModel = new InfoLink();
    self.regModel.separator = self.separators[0];
    self.submitType = 'Save';
    self.showNew = true;
  }

  onSave() {
    const self = this;
    const info_link: InfoLink = self.info_links.find(il => il.search_system === self.regModel.search_system);
    if (info_link) {
      if (self.submitType === 'Save' || (info_link.id !== self.info_links[self.selectedRow].id)) {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `The Search System already exists`});
        return;
      }
    }
    if (this.submitType === 'Save') {
      self.http.post(`${environment.serverUrl}/info_links.json`, self.regModel).subscribe(
        res => {
          if (res['info_link']) {
            self.regModel.id = res['info_link']['id'];
            self.info_links.push(self.regModel);
          } else {
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create info-link`});
          }
        },
        err => {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create info-link`});
        }
      );
    } else {
      const params = {
        search_system: self.regModel.search_system,
        prepend_url: self.regModel.prepend_url,
        separator: self.regModel.separator
      };
      self.http.patch(`${environment.serverUrl}/info_links/${self.info_links[self.selectedRow].id}.json`, params).subscribe(
        res => {
          if (res['info_link']) {
            self.info_links[self.selectedRow].search_system = self.regModel.search_system;
            self.info_links[self.selectedRow].prepend_url = self.regModel.prepend_url;
            self.info_links[self.selectedRow].separator = self.regModel.separator;
            self.messageService.add({severity: 'success', summary: 'Success', detail: `Info Link successfully updated`});
          } else {
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't update info-link`});
          }
        },
        err => {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't update info-link`});
        }
      );
    }
    this.showNew = false;
  }

  onEdit(index: number) {
    this.selectedRow = index;
    this.regModel = new InfoLink();
    this.regModel = Object.assign({}, this.info_links[this.selectedRow]);
    this.submitType = 'Update';
    this.showNew = true;
  }

  onDelete(index: number, id: number) {
    const self = this;
    self.http.delete(`${environment.serverUrl}/info_links/${id}.json`).subscribe(
      res => {
        if (res['message'] === 'Info Link successfully deleted') {
          self.info_links.splice(index, 1);
          self.messageService.add({severity: 'success', summary: 'Success', detail: res['message']});
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete info-link`});
        }
      },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete info-link`});
      }
    );
  }

  onCancel() {
    this.showNew = false;
  }

  onChangeSeparator(separator: string) {
    this.regModel.separator = separator;
  }

}
