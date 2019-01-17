import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

import { PreCustomersService } from '../../services/pre-customers.service';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { Message, OverlayPanel } from 'primeng/primeng';
import { MessageService  } from 'primeng/components/common/messageservice';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { PreCustomer } from '../../interfaces/pre-customer';
import { Project } from '../../interfaces/project';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-aqis-pre-customers-list',
  templateUrl: './pre-customers-list.component.html',
  styleUrls: ['./pre-customers-list.component.scss'],
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
    FlashHighlightsService,
    MessageService,
    PreCustomersService
  ]
})
export class PreCustomersListComponent implements OnInit {

  msgs:                   Message[] = [];
  pre_customers:          PreCustomer[];
  original_pre_customers: PreCustomer[];
  projects:               Project[];
  cols:                   any[];
  current_pre_customer:   PreCustomer;
  label_state             = 'active';
  super_admin:            boolean;

  @ViewChild('preCustomersList') el: ElementRef;

  constructor(private http:                HttpClient,
              private router:              Router,
              private flashHighlights:     FlashHighlightsService,
              public rd:                   Renderer2,
              private messageService:      MessageService,
              private preCustomersService: PreCustomersService) {
    this.nullPreCustomer();
  }

  ngOnInit() {
    const self = this;

    setInterval(() => {
      self.label_state = 'active';
      setTimeout(() => {
        self.label_state = 'inactive';
      }, 1000);
    }, 2000);

    self.preCustomersService.getPreCustomers().then(data => {
      if (data.pre_customers) {
        self.pre_customers = data.pre_customers;
        self.projects      = data.projects;
        self.super_admin   = data.super_admin;

        self.pre_customers.forEach(c => {
          const project = self.projects.find(p => p.id === c.project_id);
          c.project_object = {
            label: project.name,
            value: project.id
          };
        });
        self.original_pre_customers = JSON.parse(JSON.stringify(self.pre_customers));
      } else {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
      }
    });
  }

  nullPreCustomer() {
    this.current_pre_customer     = {
      uid: null,
      name: null,
      company_name: null,
      person: null,
      person_2: null,
      email: null,
      email_2: null,
      zip: null,
      city: null,
      firm: null,
      phone: null,
      phone_2: null,
      message: null,
      project_id: null,
      project_object: null
    };
  }

  updatePreCustomer (id, params) {
    const self = this;

    self.http.patch(environment.serverUrl + '/pre_customers/' + id + '.json', params
    ).subscribe(
      response => {
        if (response['pre_customer']) {
          self.setOriginalPreCustomers();
          self.flashHighlights.handler(self, '#pre-customer-', String(id),
            'success-updated'
          );
        } else {
          self.flashHighlights.handler(self, '#pre-customer-', String(id),
            'failed-update'
          );
          self.setPrevState();
        }
      },
      response => {
        self.flashHighlights.handler(self, '#pre-customer-', String(id),
          'failed-update'
        );
        self.setPrevState();
      }
    );
  }

  hideNew(pre_customer: PreCustomer) {
    const self = this;
    if (!self.super_admin) return;

    pre_customer.new = false;
    self.updatePreCustomer(pre_customer.id, { new: false })
  }

  addPreCustomer(pre_customer: PreCustomer, overlaypanel: OverlayPanel) {
    const self = this;

    const repeated_email = self.pre_customers.find(pc => pc.email === pre_customer.email && pc.id !== self.current_pre_customer.id);
    if (repeated_email) {
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Email ' + repeated_email.email + ' already exists'});
      return;
    }

    const id = self.current_pre_customer.id;

    const pre_customers: PreCustomer[] = [...self.pre_customers];

    const new_pre_customer: PreCustomer = {
      name: pre_customer.name,
      uid: pre_customer.uid,
      email: pre_customer.email,
      person: pre_customer.person,
      person_2: pre_customer.person_2,
      email_1: pre_customer.email_1,
      email_2: pre_customer.email_2,
      address: pre_customer.address,
      zip: pre_customer.zip,
      city: pre_customer.city,
      phone: pre_customer.phone,
      phone_1: pre_customer.phone_1,
      phone_2: pre_customer.phone_2,
      message: pre_customer.message,
      project_id: pre_customer.project_object.value,
      project_object: pre_customer.project_object
    };

    if (id) {

      self.updatePreCustomer(id, new_pre_customer);
      self.nullPreCustomer();
    } else {
      self.http.post(environment.serverUrl + '/pre_customers.json', new_pre_customer
      ).subscribe(
        response => {
          if (response['pre_customer']) {
            new_pre_customer.id = response['pre_customer']['id'];
            new_pre_customer.created_by = response['pre_customer']['created_by'];

            pre_customers.push(new_pre_customer);
            self.pre_customers = pre_customers;
            self.setOriginalPreCustomers();
          } else {
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create pre-customer`});
          }
        },
        response => {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create pre-customer`});
        }
      );
    }
    overlaypanel.visible = false;
  }

  deleteContact(pre_customer: PreCustomer) {
    const self = this;
    let pre_customers: PreCustomer[] = [...self.pre_customers];
    self.http.delete(environment.serverUrl + '/pre_customers/' + pre_customer.id + '.json'
    ).subscribe(
      response => {
        if (response['message'] === 'Customer successfully deleted') {
          pre_customers = pre_customers.filter(p => p.id !== pre_customer.id);
          self.pre_customers = pre_customers;
          self.messageService.add({severity: 'success', summary: 'Success', detail: `Contact successfully deleted`});
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete pre-customer`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete pre-customer`});
      }
    );
  }

  selectPreCustomer(pre_customer) {
    const self = this;
    self.router.navigate(['/pre_customers', pre_customer['id']]);
  }

  setOriginalPreCustomers () {
    const self = this;
    self.original_pre_customers = JSON.parse(JSON.stringify(self.pre_customers));
  }

  setPrevState() {
    const self = this;
    self.nullPreCustomer();
    self.pre_customers = JSON.parse(JSON.stringify(self.original_pre_customers));
  }

  setPreCustomer(event, pre_customer: PreCustomer, overlaypanel: OverlayPanel) {
    const self = this;
    self.current_pre_customer = pre_customer;
    overlaypanel.toggle(event);
  }

}
