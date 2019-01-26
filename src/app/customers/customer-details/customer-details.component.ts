import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CustomerInfoComponent } from '../customer-info/customer-info.component';
import { CallAlertService } from '../../services/call-alert.service';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { IfHourOrMinService } from '../../services/if-hour-or-min.service';
import { SetGoogleParamsService } from '../../services/set-google-params.service';
import { BuildCustomerAddressesService } from '../../services/build-customer-addresses.service';
import { RemoveDuplicatesService } from '../../services/remove-duplicates.service';
import { ShareAddressService } from '../../services/share-address.service';
import { TransformStatesService } from '../../services/transform-states.service';
import { PassStateService } from '../../services/pass-state.service';
import { PassProjectIdService } from '../../services/pass-project-id.service';
import { CookieService } from 'ngx-cookie-service';

import { Message              } from 'primeng/primeng';
import { MessageService       } from 'primeng/components/common/messageservice';
import { environment } from '../../../environments/environment';
import { Project } from '../../interfaces/project';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
  providers: [
    CallAlertService,
    FlashHighlightsService,
    IfHourOrMinService,
    SetGoogleParamsService,
    BuildCustomerAddressesService,
    RemoveDuplicatesService,
    MessageService,
    TransformStatesService
  ]
})
export class CustomerDetailsComponent implements OnInit {

  id:                any;
  customer:          any;
  current_user:      object;
  current_project:   Project;
  current_project_id: number|string;
  contacted_user:    object;
  customer_tenant:   object;
  project_questions: Array<object>;
  tenant_questions:  Array<object>;
  msgs: Message[] =  [];
  super_admin:       boolean;
  states:            Array<object> = [];
  selectedState:     number;
  google_authorized: boolean;
  google_task_saved: boolean;
  alert: boolean;
  alertType: string;
  alertMessage: string;
  redirect_url: string;
  return_to_url: string;

  @ViewChild('detailsForm') el: ElementRef;
  @ViewChild('customerInfo') customerInfo: CustomerInfoComponent;

  constructor(private activatedRoute:              ActivatedRoute,
              private http:                        HttpClient,
              private callAlert:                   CallAlertService,
              private transformStates:             TransformStatesService,
              private flashHighlights:             FlashHighlightsService,
              private ifHourOrMin:                 IfHourOrMinService,
              private setGoogleParams:             SetGoogleParamsService,
              private buildCustomerAddresses:      BuildCustomerAddressesService,
              private removeDuplicates:            RemoveDuplicatesService,
              private addresses_data:              ShareAddressService,
              private messageService:              MessageService,
              private passStateService:            PassStateService,
              public rd:                           Renderer2,
              private passProjectId:               PassProjectIdService,
              private cookieService:               CookieService) { }

  ngOnInit() {
    const self = this;

    self.passProjectId.currentProject.subscribe(project => self.current_project = project);
    self.current_project_id = self.current_project ? self.current_project.id : self.cookieService.get('project_id');

    const observableFailed = function (response) {
      alert(response);
    };

    const customerGetSuccess = function (response) {
      self.customer        = response['customer'];
      self.current_user    = response['current_user'];
      self.super_admin     = response['super_admin'];
      if (!self.super_admin) {
        self.contacted_user    = response['contacted_user'];
        self.customer_tenant   = response['customer_tenant'];
        self.google_task_saved = self.customer_tenant['google_saved_connection'];
        self.google_authorized = response['google_authorized'];

        if (self.google_authorized) {
          self.callAlert.handler(self, 'info', 'Success Authentication with the Google Calendar.', 10000);
          if (self.current_project && self.current_project.email && self.current_project.email !== response['calendar_email']) {
            self.callAlert.handler(self, 'warning',
              `Project's email and email of the logged in Google account are not equal. Go to authenticate with Google again`,
              10000);
          }
        } else {
          self.redirect_url = `${environment.serverUrl}/request_to_google`;
          self.return_to_url = `${environment.clientUrl}/customers/${self.customer.id}`;
          self.callAlert.handler(self, 'warning',
            'Authentication with Google expired. To authenticate with Google again follow next link', 10000);
        }

        self.project_questions = JSON.parse(JSON.stringify(self.customer_tenant['customer_tenant_questions']));

        self.states = self.transformStates.handler(response['states'], true);
        let state: number;
        if (self.customer_tenant['state_id']) {
          state = self.states.find(st => st['value'] === self.customer_tenant['state_id'])['value'];
        }
        self.setState(state);
      }
    };

    const routeSuccess =  (params) => {
      self.http.get(environment.serverUrl + '/customers/' + params['id'] + '.json?project_id=' + self.current_project_id
      ).subscribe(
        customerGetSuccess,
        observableFailed
      );
    };

    self.activatedRoute.params.subscribe(routeSuccess, observableFailed);
  }

  setState (state: number) {
    const self = this;
    self.passStateService.changeState(state);
  }

  saveCustomerField(field_name, value, originalValue) {

    const self = this;
    let update = {};
    let id_selector;
    if (field_name === 'map1' || field_name === 'map2') {
      update = value;
      id_selector = '#' + field_name + '-';
    } else {

      if (field_name === 'future_connection') {
        update['google_saved_connection'] = false;
      }

      update[field_name] = value;
      id_selector = '#' + self.ifHourOrMin.handler(field_name) + '-';
    }
    self.http.patch(
      environment.serverUrl + '/customers/' + self.customer.id + '.json', update
    ).subscribe(
      (response) => {
        if (response['customer']) {

          self.customer.google_saved_connection = response['customer']['google_saved_connection'];

          if (response['google_task']) {
            self.messageService.add({
              severity: 'info', summary: 'Success', detail: 'Task successfully created on the Google Calendar'});
          } else {
            if (field_name === 'future_connection') {
              self.messageService.add({
                severity: 'warn', summary: 'Warning', detail: `Task wasn't created on the Google Calendar`});
            }
          }

          self.addresses_data.changeAddresses(
            self.removeDuplicates.handler(
              self.buildCustomerAddresses.handler(
                response['customer']['zip'] + ' ' +
                response['customer']['city'] + ' ' +
                response['customer']['head_quarter'],
                null,
                response['customer']['addresses']
              ), 'city_address'
            ));

          self.flashHighlights.handler(self, id_selector,
            self.customer.id, 'success-updated');
        } else if (response['confirm_super_admin']) {
          window.location.href = '/';
        }  else {
          self.flashHighlights.handler(self, id_selector,
            self.customer.id, 'failed-update');
          self.customer[field_name] = originalValue;
        }
      },
      (response) => {
        self.flashHighlights.handler(self, id_selector,
          self.customer.id, 'failed-update');
        self.customer[field_name] = originalValue;
        console.log(response);
      }
    );
  }

  saveCustomer(update) {
    this.saveCustomerField(update.field_name, update.value, update.originalValue);
  }

  saveCustomerSubArray(update) {
    const self = this;

    if (self.super_admin) {
      return;
    }
    const params = {};

    let id_selector;

    if (update['field_name'] === 'future_connection') {
      params['google_saved_connection'] = false;
    }

    params[update['field_name']] = update['value'];
    id_selector = '#' + self.ifHourOrMin.handler(update['field_name']);

    const customer_tenant_id = self.customer_tenant['id'];
    self.http.patch(environment.serverUrl + '/customer_tenants/' + customer_tenant_id + '.json', params
    ).subscribe(
      response => {
        if (response['customer_tenant']) {
          self.flashHighlights.handler(self, id_selector,
            customer_tenant_id, 'success-updated');

          if (update['field_name'] === 'future_connection') {
            self.google_task_saved = response['customer_tenant']['google_saved_connection'];
          }

          self.customer_tenant = response['customer_tenant'];
          if (update['field_name'] === 'responsible_name') self.customerInfo.changeGender('responsible');
          if (update['field_name'] === 'office_name') self.customerInfo.changeGender('assistant');

          if (update['field_name'] === 'city_2' || update['field_name'] === 'comment_address') {
            self.addresses_data.changeAddresses(
              self.removeDuplicates.handler(
                self.buildCustomerAddresses.handler(
                  response['customer']['zip'] + ' ' +
                  response['customer']['city'] + ' ' +
                  response['customer']['head_quarter'],

                  response['customer_tenant']['zip_2'] + ' ' +
                  response['customer_tenant']['city_2'] + ' ' +
                  response['customer_tenant']['comment_address'],

                  response['customer_tenant']['addresses']
                ), 'city_address'
              ));
          }

        } else {
          self.flashHighlights.handler(self, id_selector,
            self.customer.id, 'failed-update');
          self.customer_tenant[update['field_name']] = update['originalValue'];
        }
      },
      response => {
        self.flashHighlights.handler(self, id_selector,
          self.customer.id, 'failed-update');
        self.customer_tenant[update['field_name']] = update['originalValue'];
      }
    );
  }

  saveEventField(field_name, value, originalValue, event_id, address) {

    const self = this;

    if (self.super_admin) {
      return;
    }

    const params = {};
    params['event'] = {};
    params['event'][field_name] = JSON.parse(JSON.stringify(value));
    params['event']['saved_to_google'] = false;

    const edited_event = self.customer_tenant['events'].find(event => event.id === event_id);
    const event = Object.assign({}, edited_event);
    const event_index =
      self.customer_tenant['events'].indexOf(self.customer_tenant['events'].find(event => event.id === event_id));

    if (field_name === 'date') {
      event.date = {
        day: Number(value.split('-')[2]),
        month: Number(value.split('-')[1]),
        year: Number(value.split('-')[0])
      };
    } else {
      event[field_name] = JSON.parse(JSON.stringify(value));
      self.customer_tenant['events'][event_index][field_name] = value;

      if (address) {
        event['address'] = JSON.parse(JSON.stringify(address));
      }
    }

    params['google_event'] = {};
    params['participants_ids'] = [];

    const timeZoneOffset = (-1) * new Date().getTimezoneOffset();
    const event_title = self.customer['zip'] + ' - ' + self.customer['name'];
    params['google_event'] = self.setGoogleParams.setGoogleEvent(event, event_title);
    params['participants_ids'] = self.setGoogleParams.setParticipantsIds(event);

    params['timeOffset']   = timeZoneOffset / 60;
    params['project_id'] = self.current_project_id;

    let message: string;
    let type: string;

    self.http.patch(environment.serverUrl + '/events/' + event_id + '.json', params
    ).subscribe(
      function (response) {
        if (response['event'] || response['message'] === 'Unauthorized') {
          self.flashHighlights.handler(self, '#' + self.ifHourOrMin.handler(field_name),
            event_id, 'alert-success');


          if ((field_name === 'address_id' || field_name === 'city_address')
            && response['first_event_id']) {
            self.customer_tenant['events'][0].address = response['event']['address'];
          }

          if (response['google_event']) {
            message = `Event successfully updated on the Google Calendar `;
            type = 'info';
          } else {
            message = `Authentication with the Google Calendar failed`;
            type = 'warning';
          }
          edited_event['saved_to_google'] = response['event']['saved_to_google'];
          self.callAlert.handler(self, type, message, 2000);
        } else {
          self.flashHighlights.handler(self, '#' + self.ifHourOrMin.handler(field_name),
            event_id, 'alert-danger');
          self.callAlert.handler(self, 'warning', `Can't edit event`, 2000);

          if (field_name === 'address_id') {
            event['address']['city_address'] = originalValue;
          } else {
            event[field_name] = originalValue;
          }
        }
      },
      function (response) {
        if (response['message'] === 'Unauthirized') {
          console.log('Unauthorized, Unauthorized');
        }
        self.flashHighlights.handler(self, '#' + self.ifHourOrMin.handler(field_name),
          event_id, 'alert-danger');
        self.callAlert.handler(self, 'warning', `Can't edit event`, 2000);

        if (field_name === 'address_id') {
          event['address']['city_address'] = originalValue;
        } else {
          event[field_name] = originalValue;
        }
      }
    );
  }

  saveEvent(update) {
    this.saveEventField(
      update.update.field_name,
      update.update.value,
      update.update.originalValue,
      update.event_id,
      update.update.address);
  }

}
