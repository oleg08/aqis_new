import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { DifferenceArraysService } from '../../services/difference-arrays.service';
import { InvoiceTypesBreadcrumbDataService } from '../invoice-types-breadcrumb/invoice-types-breadcrumb-data.service';
import { InvoiceType } from '../../interfaces/invoice-type';
import { User } from '../../interfaces/user';
import { Project } from '../../interfaces/project';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { InvoiceTypesBreadcrumb } from '../invoice-types-breadcrumb/invoice-types-breadcrumb.component';

@Component({
  selector: 'app-aqis-invoice-type-details',
  templateUrl: './invoice-type-details.component.html',
  styleUrls: ['./invoice-type-details.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('0.5s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  providers: [
    MessageService,
    DifferenceArraysService,
    InvoiceTypesBreadcrumbDataService,
    FlashHighlightsService
  ]
})
export class InvoiceTypeDetailsComponent implements OnInit {

  invoice_type: InvoiceType;
  msgs: Message[] = [];
  users: User[];
  projects: Project[];
  breadcrumbList: InvoiceTypesBreadcrumb[];
  loadSign: number;
  loadingSign = false;
  loadEmblem: number;
  loadingEmblem = false;

  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('invoiceTypeEdit') el: ElementRef;

  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private differenceArray: DifferenceArraysService,
              private breadcrumbData: InvoiceTypesBreadcrumbDataService,
              private flashHighlights: FlashHighlightsService,
              public rd: Renderer2) { }

  ngOnInit() {
    const self = this;
    const observableFailed = (err) => {
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
    };
    const invoiceTypeGetSuccess = (res) => {
      if (res['invoice_type']) {
        self.invoice_type = res['invoice_type'];
        const users: User[] = res['users'];
        const projects: Project[] = res['projects'];

        self.users = self.differenceArray.uniqueInArray1(users, self.invoice_type.users, 'id');
        self.projects = self.differenceArray.uniqueInArray1(projects, self.invoice_type.projects, 'id');

        self.breadcrumbList = [...self.breadcrumbData.list(3, self.invoice_type.tenant, self.invoice_type)];

      } else {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: res['message']});
      }
    };
    const routeSuccess = (params) => {
      self.http.get(`${environment.serverUrl}/invoice_types/${params.id}.json`).subscribe(
        invoiceTypeGetSuccess, observableFailed
      );
    };
    self.activatedRoute.params.subscribe(routeSuccess, observableFailed);
  }

  saveInvoiceType(data) {
    const self = this;
    const params = {};
    params[data['field_name']] = data['value'];
    self.http.patch(`${environment.serverUrl}/invoice_types/${self.invoice_type.id}.json`, params).subscribe(
      res => {
        if (res['invoice_type']) {
          self.flashHighlights.handler(self, '#invoice_type_', data['field_name'], 'success-updated');
        } else {
          self.invoice_type[data['field_name']] = data['originalValue'];
          self.flashHighlights.handler(self, '#invoice_type_', data['field_name'], 'failed-update');
        }
      },
      err => {
        self.invoice_type[data['field_name']] = data['originalValue'];
        self.flashHighlights.handler(self, '#invoice_type_', data['field_name'], 'failed-update');
      }
    );
  }

  addUser(user, index) {
    const self = this;

    self.http.post(`${environment.serverUrl}/add_to_invoice/${self.invoice_type.id}.json`, { user_id: user.id }
    ).subscribe(
      res => {
        if (res['invoice_type']) {
          self.users.splice(index, 1);
          const local_users: User[] = [...self.invoice_type.users];
          local_users.push(user);
          self.invoice_type.users = local_users;
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't add User`});
        }
      },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't add User`});
      }
    );
  }

  removeUser(user, index) {
    const self = this;

    self.http.post(`${environment.serverUrl}/add_to_invoice/${self.invoice_type.id}.json`,
      { user_id: user.id, method: 'remove' }).subscribe(
        res => {
          if (res['invoice_type']) {
            self.invoice_type.users.splice(index, 1);
            const users: User[] = [...self.users];
            users.push(user);
            self.users = users;
          } else {
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't remove User`});
          }
        },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't remove User`});
      }
    );
  }

  addProject(project, index) {
    const self = this;

    self.http.post(`${environment.serverUrl}/add_to_invoice/${self.invoice_type.id}.json`, { project_id: project.id }
    ).subscribe(
      res => {
        if (res['invoice_type']) {
          self.projects.splice(index, 1);
          const local_projects: Project[] = [...self.invoice_type.projects];
          local_projects.push(project);
          self.invoice_type.projects = local_projects;
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't add Project`});
        }
      },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't add Project`});
      }
    );
  }

  removeProject(project, index) {
    const self = this;

    self.http.post(`${environment.serverUrl}/add_to_invoice/${self.invoice_type.id}.json`,
      { project_id: project.id, method: 'remove' }
    ).subscribe(
      res => {
        if (res['invoice_type']) {
          self.invoice_type.projects.splice(index, 1);
          const projects = [...self.projects];
          projects.push(project);
          self.projects = projects;
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't remove Project`});
        }
      },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't remove Project`});
      }
    );
  }

  onUpload(data) {
    const self = this;
    if (data['prop'] === 'sign') {
      self.loadingSign = true;
    } else if (data['prop'] === 'emblem') {
      self.loadingEmblem = true;
    }

    self.http.post(`${environment.serverUrl}/invoice_type_${data['prop']}_image/${self.invoice_type.id}.json`, data['form_data'],
      { reportProgress: true, observe: 'events' }).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          if (data['prop'] === 'sign') {
            self.loadSign = Math.round(event.loaded / event.total * 100);
          } else if (data['prop'] === 'emblem') {
            self.loadEmblem = Math.round(event.loaded / event.total * 100);
          }
        } else if (event.type === HttpEventType.Response) {
          if (event.body['invoice_type']) {
            self.invoice_type[data['prop'] + '_image_url'] = event.body['invoice_type'][data['prop'] + '_image_url'];
            self.invoice_type[data['prop'] + '_image_content_type'] = event.body['invoice_type'][data['prop'] + '_image_content_type'];
            self.clearLoadingValues();
          } else {
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't upload image`});
            self.clearLoadingValues();
          }
        }
      },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't upload image`});
        self.clearLoadingValues();
      }
    );
  }

  clearSignImage(data) {
    const self = this;
    self.http.delete(`${environment.serverUrl}/invoice_type_${data['prop']}_image/${self.invoice_type.id}.json`
    ).subscribe(
      res => {
        if (res['invoice_type']) {
          self.invoice_type[data['prop'] + '_image_url'] = null;
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete image`});
        }
      },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete image`});
      }
    );
  }

  clearLoadingValues() {
    const self = this;
    self.loadingSign = false;
    self.loadSign = null;
    self.loadingEmblem = false;
    self.loadEmblem = null;
  }
}
