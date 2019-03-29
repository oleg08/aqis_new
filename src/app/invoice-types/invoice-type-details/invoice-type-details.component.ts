import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {environment} from '../../../environments/environment';
import {Message} from 'primeng/primeng';
import {MessageService} from 'primeng/components/common/messageservice';
import {DifferenceArraysService} from '../../services/difference-arrays.service';
import {InvoiceTypesBreadcrumbDataService} from '../invoice-types-breadcrumb/invoice-types-breadcrumb-data.service';
import {InvoiceType} from '../../interfaces/invoice-type';
import {User} from '../../interfaces/user';
import {Project} from '../../interfaces/project';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {InvoiceTypesBreadcrumb} from '../invoice-types-breadcrumb/invoice-types-breadcrumb.component';

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
  providers: [MessageService, DifferenceArraysService, InvoiceTypesBreadcrumbDataService]
})
export class InvoiceTypeDetailsComponent implements OnInit {

  invoice_type: InvoiceType;
  msgs: Message[] = [];
  users: User[];
  projects: Project[];
  breadcrumbList: InvoiceTypesBreadcrumb[];
  selectedFile: File = null;
  loadSign: number;
  loadingSign = false;

  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private differenceArray: DifferenceArraysService,
              private breadcrumbData: InvoiceTypesBreadcrumbDataService,
              private sanitizer: DomSanitizer) { }

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

  onFileSelected(data) {
    this.selectedFile = data.target.files[0];
  }

  onUpload() {
    const self = this;

    if (!self.selectedFile) {
      const inputFile: HTMLElement = self.inputFile.nativeElement as HTMLElement;
      inputFile.click();
      return;
    }

    if (self.selectedFile.type !== 'image/png') {
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Must be format png`});
      self.selectedFile = null;
      return;
    }

    self.loadingSign = true;
    const fd: FormData = new FormData();
    fd.append('sign_image', this.selectedFile, this.selectedFile.name);
    this.http.post(`${environment.serverUrl}/invoice_type_sign_image/${self.invoice_type.id}.json`, fd,
      { reportProgress: true, observe: 'events' }).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          self.loadSign = Math.round(event.loaded / event.total * 100);
        } else if (event.type === HttpEventType.Response) {
          if (event.body['invoice_type']) {
            self.invoice_type.sign_image_url = event.body['invoice_type']['sign_image_url'];
            self.invoice_type.sign_image_content_type = event.body['invoice_type']['sign_image_content_type'];
            self.selectedFile = null;
            self.loadingSign = false;
            self.loadSign = null;
          } else {
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't upload image`});
            self.selectedFile = null;
            self.loadingSign = false;
            self.loadSign = null;
          }
        }
      },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't upload image`});
        self.selectedFile = null;
        self.loadingSign = false;
        self.loadSign = null;
      }
    );
  }

  clearSignImage() {
    const self = this;
    self.http.delete(`${environment.serverUrl}/invoice_type_sign_image/${self.invoice_type.id}.json`
    ).subscribe(
      res => {
        if (res['invoice_type']) {
          self.invoice_type.sign_image_url = null;
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete image`});
        }
      },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete image`});
      }
    );
  }

  secureUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
