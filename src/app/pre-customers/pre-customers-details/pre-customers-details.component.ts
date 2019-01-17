import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { PreCustomersService } from '../../services/pre-customers.service';
import { Message        } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';

import { PreCustomer } from '../../interfaces/pre-customer';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-aqis-pre-customers-details',
  templateUrl: './pre-customers-details.component.html',
  styleUrls: ['./pre-customers-details.component.scss'],
  providers: [
    FlashHighlightsService,
    MessageService,
    PreCustomersService
  ]
})
export class PreCustomersDetailsComponent implements OnInit {

  msgs: Message[] = [];
  pre_customer: PreCustomer;
  customers: Array<object>;
  selectedCustomer: object;
  categories: Array<object>;
  selectedStatus: any;
  project_name: string;

  @ViewChild('PreCustomersDetails') el: ElementRef;

  constructor(private http: HttpClient,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private flashHighlights: FlashHighlightsService,
              private rd: Renderer2,
              private messageService: MessageService,
              private preCustomersService: PreCustomersService) { }

  ngOnInit() {
    const self = this;

    const observableFailed = function (response) {
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
    };

    const routeSuccess = (params) => {
      self.preCustomersService.getPreCustomer(params['id']).then(data => {
        if (data['pre_customer']) {
          self.pre_customer = data['pre_customer'];
          self.customers = data['customers'];
          self.project_name = data['project_name'];
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        }
      });
    };

    self.activatedRoute.params.subscribe(routeSuccess, observableFailed);
  }

  approve () {
    const self = this;

    const params = {};
    if (self.selectedCustomer) params['customer_id'] = self.selectedCustomer['id'];

    self.http.post(environment.serverUrl + '/approve_customer/' + self.pre_customer.id + '.json', params
    ).subscribe(
      response => {
        if (response['message'] === 'Customer successfully created') {
          window.location.href = '/pre_customers';
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create customer`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create customer`});
      }
    );
  }

  returnToList () {
    const self = this;
    self.router.navigate(['/pre_customers']);
  }

}
