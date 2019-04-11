import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CapitalizeService } from '../services/capitalize.service';
import { environment } from '../../environments/environment';
import {Message, OverlayPanel} from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { InvoiceTypesBreadcrumbDataService } from './invoice-types-breadcrumb/invoice-types-breadcrumb-data.service';
import { Tenant } from '../interfaces/tenant';
import { InvoiceType } from '../interfaces/invoice-type';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {InvoiceTypesBreadcrumb} from './invoice-types-breadcrumb/invoice-types-breadcrumb.component';
import {SetRangeDateService} from '../services/set-range-date.service';

@Component({
  selector: 'app-invoice-types',
  templateUrl: './invoice-types.component.html',
  styleUrls: ['./invoice-types.component.scss'],
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
  providers: [MessageService, CapitalizeService, InvoiceTypesBreadcrumbDataService]
})
export class InvoiceTypesComponent implements OnInit {

  tenant: Tenant;
  msgs: Message[] = [];
  breadcrumbList: InvoiceTypesBreadcrumb[];
  selectedInvoiceType: InvoiceType;
  today: Date = new Date();

  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private capitalizeService: CapitalizeService,
              private setRangeDate: SetRangeDateService,
              private breadcrumbData: InvoiceTypesBreadcrumbDataService) { }

  ngOnInit() {
    const self = this;
    const observableFailed = (err) => {
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
    };
    const invoiceTypesGetSuccess = (res) => {
      if (res['tenant']) {
        self.tenant = res['tenant'];
        self.tenant.invoice_types.forEach(it => {

          if (it.period === 'two_weeks') {
            it.date_range = [...self.setRangeDate.previousTwoWeeks()];
          } else if (it.period === 'one_month') {
            it.date_range = [...self.setRangeDate.previousOneMonth()];
          }

          it.period = self.capitalizeService.concatAndCapitalize(it.period, '_', ' ');
        });

        self.breadcrumbList = [...self.breadcrumbData.list(2, self.tenant)];
      } else {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: res['message']});
      }
    };
    const routeSuccess = (params) => {
      self.http.get(`${environment.serverUrl}/invoices_list/${params.id}.json`
      ).subscribe(
        invoiceTypesGetSuccess, observableFailed
      );
    };
    self.activatedRoute.params.subscribe(routeSuccess, observableFailed);
  }

  createNew(data) {
    const self = this;
    data['tenant_id'] = self.tenant.id;
    const invoice_types: InvoiceType[] = [...self.tenant.invoice_types];

    const dup = self.tenant.invoice_types.find(it => it.name === data['name']);
    if (dup) {
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: `The Name is already exists`});
      return;
    }

    self.http.post(`${environment.serverUrl}/invoice_types.json`, data).subscribe(
      res => {
        if (res['invoice_type']) {
          const new_invoice_type: InvoiceType = res['invoice_type'];
          new_invoice_type.period = self.capitalizeService.concatAndCapitalize(new_invoice_type.period, '_', ' ');
          invoice_types.push(new_invoice_type);
          self.tenant.invoice_types = invoice_types;
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Invoice Type`});
        }
      },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Invoice Type`});
      }
    );

  }

  delete(invoice_type_id, index) {
    const self = this;
    self.http.delete(`${environment.serverUrl}/invoice_types/${invoice_type_id}.json`).subscribe(
      res => {
        if (res['message'] === 'Invoice Type successfully deleted') {
          self.tenant.invoice_types.splice(index, 1);
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete Invoice Type`});
        }
      },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete Invoice Type`});
      }
    );
  }

  selectInvoice (event, invoice_type: InvoiceType, overlaypanel: OverlayPanel) {
    const self = this;
    const params = {
      invoice_type_id: invoice_type.id,
      dates: invoice_type.date_range
    };
    self.http.post(`${environment.serverUrl}/sum_assistant_cost.json`, params).subscribe(
      res => {
        if (res['sum_assistant']) {
          self.selectedInvoiceType = invoice_type;
          self.selectedInvoiceType.assistant_cost = res['sum_assistant'];
          overlaypanel.toggle(event);
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load Invoice`});
        }
      },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load Invoice`});
      }
    );
  }

  hideInvoice() {
    // this.selectedInvoiceType = null;
  }
}
