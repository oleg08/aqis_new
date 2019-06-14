import { Component, OnInit, EventEmitter, Input, Output, ElementRef, Renderer2, ViewChild, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { transition, animate, style, state, trigger } from '@angular/animations';
import { CallAlertService } from '../../services/call-alert.service';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { GetEmailTemplatesService } from '../../services/get-email-templates.service';
import { OpenStepsService } from '../../services/open-steps.service';
import { SetGoogleParamsService } from '../../services/set-google-params.service';
import { ChangeTemplateGreetingService } from '../../services/change-template-greeting.service';
import { ShareAddressService } from '../../services/share-address.service';
import { ShareBusinessesService } from '../../services/share-businesses.service';
import { ShareEmailTemplatesService } from '../../services/share-email-templates.service';
import { RemoveDuplicatesService } from '../../services/remove-duplicates.service';
import { BuildCustomerAddressesService } from '../../services/build-customer-addresses.service';
import { PassCustomersIdsService } from '../../services/pass-customers-ids.service';
import { GendersService } from '../../services/genders.service';
import { IterateCustomersService } from '../../services/iterate-customers.service';
import { PassStateService } from '../../services/pass-state.service';
import { StandardizedBusinessesService } from '../../businesses/standardized-businesses/standardized-businesses.service';

import { Message, OverlayPanel } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';

import { SelectQuestionListComponent } from '../../questions/select-question-list/select-question-list.component';
import { GroupedMultiselectComponent } from '../../grouped-multiselect/grouped-multiselect.component';

import { Customer } from '../../interfaces/customer';
import { EmailAddresses } from '../../interfaces/email-addresses';
import { EmailTemplates } from '../../interfaces/email-templates';
import { Businesses } from '../../interfaces/businesses';
import { BusinessDomain } from '../../interfaces/business-domain';
import { Gender } from '../../interfaces/gender';
import { StandardizedBusiness } from '../../interfaces/standardized-businesses';

import { environment } from '../../../environments/environment';

declare var google: any;

@Component({
  selector: 'app-aqis-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
  animations: [
    trigger('flyDetailsOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}), //
        animate(1000)
      ]),
      transition('* => void', [
        animate(500, style({transform: 'translateX(100%)'}))
      ])
    ]),
    trigger('flyEventsOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}), //
        animate(1000)
      ]),
      transition('* => void', [
        animate(500, style({transform: 'translateX(100%)'}))
      ])
    ]),

    trigger('fadeInOut', [
      transition('void => *', [
        style({opacity: 0}),  // style only for transition transition (after transiton it removes)
        animate(500, style({opacity: 1})) // the new state of the transition(after transiton it removes)
      ]),
      transition('* => void', [
        animate(500, style({opacity: 0})) // the new state of the transition(after transiton it removes)
      ])
    ]),

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
    ])
  ],

  providers: [
    CallAlertService,
    FlashHighlightsService,
    MessageService,
    SetGoogleParamsService,
    RemoveDuplicatesService,
    BuildCustomerAddressesService,
    GetEmailTemplatesService,
    GendersService,
    ChangeTemplateGreetingService,
    IterateCustomersService,
  ]
})
export class CustomerInfoComponent implements OnInit {

  new_date:               object;
  new_time:               object = {hour: 12, minute: 0};
  new_duration            = '00-15';
  new_duration_valid:     boolean;
  new_description:        string;
  show_events:            boolean;
  alert:                  boolean;
  alertType:              string;
  alertMessage:           string;
  order:                  string;
  reverse:                boolean;
  phone_1:                string;
  selectedTemplate:       EmailTemplates;
  email_templates:        EmailAddresses[];
  current_email_address:  EmailAddresses;
  genders:                Gender[];

  businesses:       Businesses[] = [];
  business_domains: BusinessDomain[];
  domains:          BusinessDomain[] = [];
  selectedDomain:   BusinessDomain;

  participants_new: any[];
  participants_customer: any[];
  filteredParticipantsNew: any[];

  new_participant_name: string;
  new_participant_email: string;
  new_participant_phone: string;
  msgs: Message[] = [];

  addresses: Array<object>;
  filteredAddresses: Array<object>;
  newAddress: string;

  customers:                 Customer[];
  customers_ids:             object;
  selectedCustomer:          string = null;
  next_customer:             number;
  prev_customer:             number;
  current_q_id:              string;
  selectedQuestion:          object;
  original_questions:        Array<object>;
  question_saved             = false;
  label_state                = 'active';
  selectedState:             number;
  selectedResponsibleGender: Gender;
  selectedAssistantGender:   Gender;
  initSteps                  = true;
  top_questions_path:        string;
  open_steps                 = false;
  active_input               = false;
  active_inplace:            boolean;
  current_name:              string;
  participantsList:          boolean;
  editBasicData:             boolean;
  standardized_businesses:   StandardizedBusiness[];
  copy_st_businesses:        StandardizedBusiness[];

  @Input () customer:                Customer;
  @Input () customer_tenant:         object;
  @Input () google_task_saved:       boolean;
  @Input () states:                  Array<object>;
  @Input () current_user:            object;
  @Input () contacted_user:          object;
  @Input () super_admin:             boolean;
  @Input () questions:               Array<object>;
  @Input () current_project_id:      number|string;
  @Output() customerInfoChanged:     EventEmitter<object> = new EventEmitter<object>();
  @Output() customerSubArrayChanged: EventEmitter<object> = new EventEmitter<object>();
  @Output() eventInfoChanged:        EventEmitter<object> = new EventEmitter<object>();
  @Output() modalDialog:             EventEmitter<object> = new EventEmitter<object>();

  @ViewChild('q_list') question_list_component: SelectQuestionListComponent;
  @ViewChild('business_multiselect') business_multiselect: GroupedMultiselectComponent;
  @ViewChild('customer_name_input') customer_name_input: ElementRef;

  @ViewChild('customersDetails') el: ElementRef;

  constructor(private http:                   HttpClient,
              private callAlert:              CallAlertService,
              private changeTemplateGreeting: ChangeTemplateGreetingService,
              private flashHighlights:        FlashHighlightsService,
              private setGoogleParams:        SetGoogleParamsService,
              private removeDuplicates:       RemoveDuplicatesService,
              private buildCustomerAddresses: BuildCustomerAddressesService,
              private router:                 Router,
              private elementRef:             ElementRef,
              private modalService:           NgbModal,
              private sanitizer:              DomSanitizer,
              private messageService:         MessageService,
              private next_customers_ids:     PassCustomersIdsService,
              private shareBusinesses:        ShareBusinessesService,
              private emailTemplates:         ShareEmailTemplatesService,
              private getEmailTemplates:      GetEmailTemplatesService,
              private genderService:          GendersService,
              private passStateService:       PassStateService,
              private openSteps:              OpenStepsService,
              private iterateCustomers:       IterateCustomersService,
              private stBusinessService:      StandardizedBusinessesService,
              public rd:                      Renderer2,
              private addresses_data:         ShareAddressService) { }

  ngOnInit() {
    const self = this;
    self.top_questions_path = 'project_questions/' + self.customer.id;

    self.passStateService.currentState.subscribe(st => self.selectedState = st);

    self.openSteps.currentState.subscribe(st => self.open_steps = st);

    self.genders = self.genderService.get();
    self.editBasicData = self.current_user['edit_basic_data'];

    self.initializeSelectedQuestion();

    self.copy_st_businesses = JSON.parse(JSON.stringify(self.customer.standardized_businesses));

    if (self.super_admin || self.editBasicData) {

      self.shareBusinesses.currentBusinesses.subscribe(businesses => self.businesses = businesses);

      if (!self.businesses) self.businesses = [];
      self.http.get(environment.serverUrl + '/business_domains.json'
      ).subscribe(
        response => {
          if (response['business_domains']) {
            self.business_domains = response['business_domains'];

            self.business_domains.forEach(bd => {
              self.domains.push({ id: bd.id, value: bd.label, label: bd.label });
              bd.businesses.forEach(b => {
                b.business_domain = bd.label;
                self.businesses.push(b);
              });
            });
            self.selectedDomain = self.domains[0];
          } else {
            self.callAlert.handler(self, 'warning', `Can't load data`, 2000);
          }
        },
        response => {
          self.callAlert.handler(self, 'warning', `Can't load data`, 2000);
        }
      );

      self.stBusinessService.get().then(data => self.standardized_businesses = data);

    } else {

      self.selectedResponsibleGender = self.genders.find(g => g.value === self.customer_tenant['get_responsible_gender']);
      self.selectedAssistantGender = self.genders.find(g => g.value === self.customer_tenant['get_assistant_gender']);

      // self.initializeSelectedQuestion();
      self.filteredParticipantsNew = JSON.parse(JSON.stringify(self.customer_tenant['participants']));

      self.addresses_data.currentAddresses.subscribe(addresses => self.addresses = addresses);

      let head_quarter: string = null;
      if (self.customer.zip && self.customer.city && self.customer.head_quarter) {
        head_quarter = self.customer.zip + ' ' + self.customer.city + ' ' + self.customer.head_quarter;
      }
      let comment_address: string = null;
      if (self.customer_tenant['zip_2'] && self.customer_tenant['city_2'] && self.customer_tenant['comment_address']) {
        comment_address = self.customer_tenant['zip_2'] + ' ' + self.customer_tenant['city_2'] + ' ' +
          self.customer_tenant['comment_address'];
      }

      self.addresses_data.changeAddresses(
        self.removeDuplicates.handler(
          self.buildCustomerAddresses.handler(head_quarter, comment_address, self.customer_tenant['addresses']
          ), 'city_address'
        )
      );

      self.participants_customer = self.customer_tenant['participants'];
    }

    self.next_customers_ids.currentCustomers.subscribe(ids => self.customers_ids = ids);

    if (self.customers_ids) {
      self.setPrevNextId(self.customers_ids['ids'], self.customers_ids['self_id']);
      self.customers = self.customers_ids['customers'];

    } else {
      const path: string = self.super_admin ? '/customers_for_super_admin.json' :
        `/customers_by_project_props.json?project_id=${self.current_project_id}`;

      self.http.get(environment.serverUrl + path
      ).subscribe(
        (response) => {
          const customers = response['total_customer_ids'];

          const customer_ids = self.iterateCustomers.handle(customers);
          const ids = customer_ids['customer_ids'];

          self.customers = customer_ids['customers'];
          self.customers_ids = {};
          self.customers_ids['ids'] = ids;
          self.customers_ids['self_id'] = self.customer.id;
          self.setPrevNextId(ids, self.customer.id);
        },
        (response) => {
          console.log(response);
        }
      );
    }

    self.phone_1 = self.customer.phone_1;

    const today = new Date();
    self.new_date = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };
  }

  setPrevNextId (array, id) {

    const self = this;
    const self_pos: number = array.indexOf(id);

    if (array.length >= 2) {
      if (self_pos === 0) {
        self.next_customer = array[self_pos + 1];
        self.prev_customer = array[array.length - 1];
      } else if (self_pos === array.length - 1) {
        self.next_customer = array[0];
        self.prev_customer = array[self_pos - 1];
      } else {
        self.next_customer = array[self_pos + 1];
        self.prev_customer = array[self_pos - 1];
      }
    } else {
      self.next_customer = null;
      self.prev_customer = null;
    }
  }

  showEvents() {
    const self  = this;
    self.show_events = !self.show_events;
    setTimeout(() => {
      const el = self.elementRef.nativeElement.querySelector('.events-timepicker');
      const hours_input = el.firstChild.firstChild.children[0].children[0];
      const min_input = el.firstChild.firstChild.children[2].children[0];
      hours_input.addEventListener('focus', self.focusInput.bind(self));
      min_input.addEventListener('focus', self.focusInput.bind(self));
      hours_input.addEventListener('focusout', self.focusOutInput.bind(self));
      min_input.addEventListener('focusout', self.focusOutInput.bind(self));
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const self = this;
    if (event.key === 'Escape' && self.active_inplace) {
      self.focusOutInput();
      self.active_inplace = false;
      self.customer.name = JSON.parse(JSON.stringify(self.current_name));
    }
    if (this.active_input) return;
    if (event.key === 'ArrowLeft') this.goToNextCustomer('prev');
    if (event.key === 'ArrowRight') this.goToNextCustomer(null);
  }

  focusInput() {
    const self = this;
    self.active_input = true;
  }

  focusOutInput() {
    const self = this;
    self.active_input = false;
  }

  onTabOpen (event) {
    const self = this;
    if (event.index === 1) {
      self.getEmailTemplates.get(`c_tenant_email_templates/${self.customer.id}`, self.current_project_id).subscribe(
        data => {
          if (data['c_tenant_email_templates']) {
            self.email_templates = data['c_tenant_email_templates'];
          } else {
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
          }
        },
        data => {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        }
      );
    }
  }

  initMap(element_id, address, showMap?) {
    const self = this;

    setTimeout(() => {
      const myCenter   = new google.maps.LatLng(48.16608, 16.34765);
      const mapCanvas  = document.getElementById(element_id);
      const mapOptions = {center: myCenter, zoom: 15};
      const map        = new google.maps.Map(mapCanvas, mapOptions);

      const geocoder = new google.maps.Geocoder();

      self.geocodeAddress(geocoder, map, address);
    });
  }

  geocodeAddress(geocoder, resultsMap, address) {
    const self = this;
    geocoder.geocode({'address': address}, (results, status) => {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        const marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        self.callAlert.handler(
          self,
          'warning',
          'Geocode was not successful for the following reason: ' + status,
          2000);
      }
    });
  }

  changeState(state, model) {
    const update = {
      field_name: 'state_id',
      value: state,
      originalValue: model.model,
      sub_array: 'customer_tenants'
    };
    this.customerSubArrayChanged.emit(update);
  }

  save(update) {
    this.customerInfoChanged.emit(update);
  }

  setGender(obj, field_name) {
    const self = this;
    const update = {
      field_name: field_name,
      value: obj.value,
      sub_array: 'customer_tenants'
    };
    self.customerSubArrayChanged.emit(update);

  }

  saveSubItem(update, sub_array) {
    const self = this;
    update['sub_array'] = sub_array;
    self.customerSubArrayChanged.emit(update);
  }

  activateInplace(customer_name) {
    const self = this;
    self.current_name = JSON.parse(JSON.stringify(customer_name));
    self.active_inplace = true;
    setTimeout(() => { self.customer_name_input.nativeElement.focus(); });
  }

  saveName(event) {
    const self = this;
    self.saveEditable(event.model, 'name');
    self.active_inplace = false;
  }

  saveEditable (event, field_name) {
    const update = {
      field_name: field_name,
      value: event
    };
    this.customerInfoChanged.emit(update);
  }

  save_event(update, event_id) {
    this.eventInfoChanged.emit({update: update, event_id: event_id});
  }

  validationPattern (model) {
    if (Number(model.viewModel[0]) < 0 || Number(model.viewModel[0]) > 2) {
      this.new_duration_valid = false;
    } else if (Number(model.viewModel[3]) < 0 || Number(model.viewModel[3]) > 5) {
      this.new_duration_valid = false;
    } else {
      this.new_duration_valid = true;
    }
  }

  blurDuration(model) {
    if (!this.new_duration_valid || this.new_duration.length < 5) {
      this.new_duration = '00-15';
      this.new_duration_valid = true;
    }
  }

  addEvent(new_date, new_time, new_duration, new_address, new_description) {
    const self = this;
    let stringDate;
    if (new_date) {
      stringDate = String(new_date.year) + '-' + String(new_date.month) + '-' + String(new_date.day);
    }

    const params = {};

    params['project_id'] = self.current_project_id;

    params['event'] = {};
    params['event']['date']             = stringDate;
    params['event']['start_time_hours'] = new_time.hour;
    params['event']['start_time_min']   = new_time.minute;
    params['event']['duration']         = new_duration;
    params['event']['description']      = new_description;
    params['event']['user_id']          = self.current_user['id'];
    params['event']['customer_tenant_id'] = self.customer_tenant['id'];

    params['event']['customer_id'] = self.customer['id']; // should be deleted

    const timeZoneOffset = (-1) * new Date().getTimezoneOffset();
    params['timeOffset']   = timeZoneOffset / 60;
    params['google_event'] = {};
    params['google_event']['date']         = new_date;
    params['google_event']['time']         = new_time;
    params['google_event']['duration']     = new_duration;
    params['google_event']['summary']      = {value: self.customer['zip'] + ' - ' + self.customer['name']};
    params['google_event']['description']  = new_description;
    params['google_event']['location']     = new_address;

    const address = self.addresses.find(item => item['city_address'] === new_address);

    if (address) {
      if (address['id']) {
        params['event']['address_id'] = address['id'];
      } else {
        params['event']['city_address'] = new_address;
      }
      params['google_event']['address'] = new_address;
    } else {
      params['event']['address_id']     = null;
    }

    if (self.participants_new) {
      const participants_ids: Array<number> = [];
      self.participants_new.forEach(participant => {participants_ids.push(participant.id); });
      params['participants_ids'] = participants_ids;
    }

    const new_event = params['event'];

    self.http.post(environment.serverUrl + '/events.json', params
    ).subscribe(
      function (response) {
        if (response['id'] || response['message'] === 'Unauthorized') {

          let message: string;
          let type:    string;

          new_event['participants'] = response['event']['participants'];
          new_event['address']      = response['event']['address'];

          if (response['google_event']) {
            new_event['google_event_id'] = response['google_event']['id'];
            message = 'Event successfully created on the Google Calendar ';
            type = 'info';
          } else {
            message = 'Authentication with the Google Calendar failed';
            type = 'warning';
          }
          self.callAlert.handler(self, type, message, 2000);

          new_event['id'] = response['id'];
          new_event['saved_to_google'] = response['event']['saved_to_google'];

          if (new_date) {
            self.customer_tenant['events'] = self.customer_tenant['events'].concat(new_event);
            self.customer_tenant['events'].sort((n1, n2) => n1.date > n2.date );

          } else {
            self.customer_tenant['events'].unshift(new_event);
          }
          self.contacted_user = response['user'];
          setTimeout( () => {
            self.flashHighlights.handler(self, '#event_row_', String(new_event['id']),
              'success-updated'
            );
          }, 0);

          const today = new Date();
          self.new_date = {
            year:  today.getFullYear(),
            month: today.getMonth() + 1,
            day:   today.getDate()
          };
          self.new_time = {hour: 12, minute: 0};
          self.new_duration = '00-15';
          self.new_description = '';
          self.participants_new = [];
          self.newAddress = null;
        } else {
          self.callAlert.handler(self, 'warning', `Can't create event`, 2000);
          console.log('1', response);
        }
      },
      function (response) {
        self.callAlert.handler(self, 'warning', `Can't create event`, 2000);
        console.log('2', response);
      }
    );
  }

  removeEvent(content, i, event_id, google_event_id) {
    const self = this;
    self.modalService.open(content).result.then((result) => {
      self.modalDialog.emit({id: event_id});
      self.http.delete(environment.serverUrl + '/events/' + event_id + '.json', {params: {google_event_id: google_event_id}}
      ).subscribe(
        function (response) {
          let message: string;
          let type:    string;

          if (response['event_id'] || response['message'] === 'Unauthorized') {
            self.customer_tenant['events'].splice(i, 1);

            message = response['message'];
            type = response['type'] ? response['type'] : 'warning';

            self.callAlert.handler(self, type, message, 2000);

          } else {
            self.callAlert.handler(self, 'warning', `Can't delete event`, 2000);
          }
        },
        function (response) {
          self.callAlert.handler(self, 'warning', `Can't delete event`, 2000);
        }
      );

    }, (reason) => {

    });
  }

  goToNextCustomer (prev?) {
    const self = this;
    self.initSteps = false;

    const ids = self.customers_ids['ids'];

    if (prev) {

      self.router.navigate(['/customers', self.prev_customer]);
      self.customers_ids['self_id'] = self.prev_customer;

      if (ids.length > 2) {
        if (ids.indexOf(self.next_customer) === 1) {
          self.next_customer = ids[0];
          self.prev_customer = ids[ids.indexOf(self.prev_customer) - 1];

        } else if (ids.indexOf(self.next_customer) === 0) {
          self.next_customer = ids[ids.length - 1];
          self.prev_customer = ids[ids.indexOf(self.prev_customer) - 1];

        } else if (ids.indexOf(self.next_customer) === 2) {
          self.next_customer = ids[ids.indexOf(self.next_customer) - 1];
          self.prev_customer = ids[ids.length - 1];
        } else {
          self.next_customer = ids[ids.indexOf(self.next_customer) - 1];
          self.prev_customer = ids[ids.indexOf(self.prev_customer) - 1];
        }
      } else if (ids.length === 2) {
        if (ids.indexOf(self.next_customer) === 0) {
          self.next_customer = ids[1];
          self.prev_customer = ids[0];
        } else {
          self.next_customer = ids[0];
          self.prev_customer = ids[1];
        }
      } else {
        self.next_customer = null;
        self.prev_customer = null;
      }
    } else {

      self.router.navigate(['/customers', self.next_customer]);

      self.customers_ids['self_id'] = self.next_customer;

      if (ids.length > 2) {
        if (ids.indexOf(self.next_customer) === ids.length - 1) {
          self.next_customer = ids[0];
          self.prev_customer = ids[ids.indexOf(self.prev_customer) + 1];
        } else if (ids.indexOf(self.next_customer) === 0) {
          self.next_customer = ids[ids.indexOf(self.next_customer) + 1];
          self.prev_customer = ids[ids.length - 1];
        } else if (ids.indexOf(self.next_customer) === 1) {
          self.next_customer = ids[ids.indexOf(self.next_customer) + 1];
          self.prev_customer = ids[0];
        } else {
          self.next_customer = ids[ids.indexOf(self.next_customer) + 1];
          self.prev_customer = ids[ids.indexOf(self.prev_customer) + 1];
        }
      } else if (ids.length === 2) {
        if (ids.indexOf(self.next_customer) === 0) {
          self.next_customer = ids[1];
          self.prev_customer = ids[0];
        } else {
          self.next_customer = ids[0];
          self.prev_customer = ids[1];
        }
      } else {
        self.next_customer = null;
        self.prev_customer = null;
      }
    }
    setTimeout(() => {
      self.initSteps = true;
    });
  }

  filterNewParticipants(event) {
    const self = this;
    const query = event.query;
    self.filteredParticipantsNew = self.filteredNewParticipants(query, self.participants_customer);
  }

  filteredNewParticipants(query, participants: any[]): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < participants.length; i++) {
      const participant = participants[i];
      if (participant.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(participant);
      }
    }
    return filtered;
  }

  createParticipant (data: NgForm) {
    const self = this;
    const participant = {};
    participant['name'] = data.value.new_participant_name_input;
    participant['email'] = data.value.new_participant_email_input;
    participant['phone'] = data.value.new_participant_phone_input;
    const existing_participant = self.participants_customer.find(item => item.name === participant['name']);
    if (existing_participant) {
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Participant with that name already exists'});
      return;
    } else {
      participant['customer_id'] = self.customer.id;
      participant['customer_tenant_id'] = self.customer_tenant['id'];
      self.http.post(environment.serverUrl + '/participants.json', {participant: participant}
      ).subscribe(
        (response) => {
          if (response['participant']) {
            participant['id'] = response['participant']['id'];
            self.participants_customer.push(participant);
            self.filteredParticipantsNew = JSON.parse(JSON.stringify(self.participants_customer));
            self.customer_tenant['participants'] = JSON.parse(JSON.stringify(self.participants_customer));
            self.new_participant_name  = null;
            self.new_participant_email = null;
            self.new_participant_phone = null;

            self.messageService.add({
              severity: 'info',
              summary: 'Success',
              detail: 'Participant successfully created'
            });

            data.form.markAsPristine();
          } else {
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: response['message']});

          }
        },
        (response) => {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create participant`});
        }
      );
    }
  }

  removeParticipant(participant) {
    const self = this;
    self.participants_customer = self.participants_customer.filter(obj => obj.id !== participant.id);
  }

  addParticipant(participant, event_id, method) {
    const self = this;
    const params = {};
    params['participant_id'] = participant.id;
    params['google_event']     = {};
    params['participants_ids'] = [];

    const timeZoneOffset = (-1) * new Date().getTimezoneOffset();
    params['timeOffset']   = timeZoneOffset / 60;

    const event = self.customer_tenant['events'].find(ev => ev.id === event_id);

    setTimeout(() => {
      params['google_event'] = self.setGoogleParams.setGoogleEvent(event, self.customer.zip + ' - ' + self.customer.name);
      params['participants_ids'] = self.setGoogleParams.setParticipantsIds(event);
      self.http.post(environment.serverUrl + '/events/' + event_id + '/' + method + '_participant.json', params
      ).subscribe(
        (response) => {
          if (response['participant_id']) {
            self.flashHighlights.handler(self, '#event_participants_', String(event_id),
              'success-updated'
            );
          } else {
            self.flashHighlights.handler(self, '#event_participants_', String(event_id),
              'failed-update'
            );
          }
        },
        (response) => {
          self.flashHighlights.handler(self, '#event_participants_', String(event_id),
            'failed-update'
          );
        }
      );
    });
  }

  addBusiness(object) {
    const self = this;
    const customer_id = self.customer.id;
    const business: Businesses = object.business;
    let customer_businesses: Businesses[];  // = [...self.customer['customer_businesses']];

    if (object.description) {
      const params = { description: object.description, business_domain_id: self.selectedDomain.id, customer_id: self.customer.id };
      self.http.post(environment.serverUrl + '/businesses.json', params
      ).subscribe(
        (response) => {
          if (response['customer_businesses']) {

            customer_businesses = response['customer_businesses'];
            self.customer.customer_businesses = customer_businesses;

            self.flashHighlights.handler(self, '#business_list_', String(customer_id), 'success-updated');
            self.messageService.add({severity: 'info', summary: 'Success', detail: 'Business-domain successfully created'});
          } else {
            self.flashHighlights.handler(self, '#business_list_', String(customer_id), 'failed-update');
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Business-domain`});
          }
        },
        (response) => {
          self.flashHighlights.handler(self, '#business_list_', String(customer_id), 'failed-update');
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Business-domain`});
        }
      );
    } else if (object.business && object.business.description) {
      self.http.post(environment.serverUrl + '/customers/' + customer_id + '/add_business.json', { business_id: business.id }
      ).subscribe(
        response => {
          if (response['customer_businesses']) {
            customer_businesses = response['customer_businesses'];
            self.customer.customer_businesses = customer_businesses;

            self.flashHighlights.handler(self, '#business_list_', String(customer_id), 'success-updated');
          } else {
            self.flashHighlights.handler(self, '#business_list_', String(customer_id), 'failed-update');
          }
        },
        response => {
          self.flashHighlights.handler(self, '#business_list_', String(customer_id),
            'failed-update'
          );
        }
      );
    } else if (object.business_domain) {
      self.addBDomainRequest(object.business_domain, customer_id);
    }
  }

  addStBusinesses(businesses: StandardizedBusiness[], customer_id) {
    const self = this;
    const ids: number[] = [];
    businesses.forEach(b => ids.push(b.id));
    self.stBusinessService.addToCustomer(ids, customer_id).then(
      data => {
        if (data['customer']) {
          self.copy_st_businesses = data['customer']['standardized_businesses'];
          self.flashHighlights.handler(self, '#st_business_list_', String(customer_id), 'success-updated');
        } else {
          self.customer.standardized_businesses = self.copy_st_businesses;
          self.flashHighlights.handler(self, '#st_business_list_', String(customer_id), 'failed-update');
        }
      }
    );
  }

  addBusinessDomain (b_domain, customer_id) {
    const self = this;
    self.addBDomainRequest(b_domain.label, customer_id);
  }

  addBDomainRequest(b_domain, customer_id) {
    const self = this;

    const business_domain = self.business_domains.find(bd => bd.label === b_domain);
    self.http.post(environment.serverUrl + '/customers/' + customer_id + '/add_business_domain.json',
      { business_domain_id: business_domain.id }
    ).subscribe(
      response => {
        if (response['customer_businesses']) {
          const customer_businesses: Businesses[] = response['customer_businesses'];
          self.customer['customer_businesses'] = customer_businesses;
          self.flashHighlights.handler(self, '#business_list_', String(customer_id), 'success-updated');
        } else {
          self.flashHighlights.handler(self, '#business_list_', String(customer_id), 'failed-update');
        }
      },
      response => {
        self.flashHighlights.handler(self, '#business_list_', String(customer_id), 'failed-update');
      }
    );
  }

  subtractBusiness(object) {
    const self = this;
    const customer_id = self.customer.id;
    let customer_businesses: Businesses[] = [...self.customer.customer_businesses];
    const business: Businesses = object.business.value;

    if (object.business.value.description) {
      self.http.post(environment.serverUrl + '/customers/' + customer_id + '/subtract_business.json', { business_id: business.id }
      ).subscribe(
        response => {
          if (response['customer_businesses']) {
            customer_businesses = response['customer_businesses'];
            self.customer.customer_businesses = customer_businesses;
            self.flashHighlights.handler(self, '#business_list_', String(customer_id), 'success-updated');
          } else {
            self.flashHighlights.handler(self, '#business_list_', String(customer_id), 'failed-update');
          }
        },
        response => {
          self.flashHighlights.handler(self, '#business_list_', String(customer_id),
            'failed-update'
          );
        }
      );
    } else if (object.business.value.business_domain) {
      const business_domain = self.business_domains.find(bd => bd.label === object.business.value.business_domain);
      self.http.post(environment.serverUrl + '/customers/' + customer_id + '/subtract_business_domain.json',
        { business_domain_id: business_domain.id }
      ).subscribe(
        response => {
          if (response['customer_businesses']) {
            customer_businesses = response['customer_businesses'];
            self.customer.customer_businesses = customer_businesses;
            self.flashHighlights.handler(self, '#business_list_', String(customer_id), 'success-updated');
          } else {
            self.flashHighlights.handler(self, '#business_list_', String(customer_id), 'failed-update');
          }
        },
        response => {
          self.flashHighlights.handler(self, '#business_list_', String(customer_id), 'failed-update');
        }
      );
    }
  }

  clearBusinesses () {
    const self = this;
    const customer_id = self.customer.id;
    let customer_businesses: Businesses[] = [...self.customer.customer_businesses];

    self.http.post(environment.serverUrl + '/customers/' + customer_id + '/clear_businesses.json', {  }
    ).subscribe(
      response => {
        if (response['customer_businesses']) {
          customer_businesses = response['customer_businesses'];
          self.customer.customer_businesses = customer_businesses;
          self.flashHighlights.handler(self, '#business_list_', String(customer_id), 'success-updated');
        } else {
          self.flashHighlights.handler(self, '#business_list_', String(customer_id), 'failed-update');
        }
      },
      response => {
        self.flashHighlights.handler(self, '#business_list_', String(customer_id), 'failed-update');
      }
    );
  }

  createAddress(object) {
    const self = this;
    self.http.post(environment.serverUrl + '/addresses.json', object
    ).subscribe(
      (response) => {
        if (response['address']) {

          self.addresses.push(response['address']);

          self.addresses_data.changeAddresses(
            self.removeDuplicates.handler(self.addresses, 'city_address')
          );

          self.messageService.add({severity: 'info', summary: 'Success', detail: response['message']});
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: response['message']});
        }
      },
      (response) => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create address`});
      }
    );
  }

  nullifySelectedQuestion() {
    this.selectedQuestion       = {
      id: null,
      content: null,
      customer_tenant_id: null,
    };
  }

  initializeSelectedQuestion() {
    this.nullifySelectedQuestion();
    this.current_q_id = null;
  }

  setCurrentQuestion(question_id) {
    const self = this;
    self.current_q_id = question_id;
  }

  setOriginalQuestions(questions) {
    const self = this;
    if (!self.original_questions) {
      self.original_questions = JSON.parse(JSON.stringify(self.questions));
    }
  }

  setPrevQuestions() {
    const self = this;
    if (!self.question_saved) {
      self.questions = JSON.parse(JSON.stringify(self.original_questions));
    }
    self.question_saved = false;
  }

  selectQuestion(event, question, overlaypanel: OverlayPanel) {
    const self = this;
    self.question_saved = false;
    self.selectedQuestion = question;
    overlaypanel.toggle(event);
  }

  addCTenantQuestion (event, overlaypanel: OverlayPanel) {
    const self = this;
    const question: object = {};

    question['content'] = event['content_input'];

    if (self.current_q_id) {

      self.http.patch(environment.serverUrl + '/customer_tenant_questions/' + self.current_q_id + '.json', question
      ).subscribe(
        response => {
          if (response['customer_tenant_question']) {
            self.questions.find(q => q['id'] === self.current_q_id)['new_label'] = false;
            self.original_questions = JSON.parse(JSON.stringify(self.questions));
            self.question_saved = true;
            overlaypanel.visible = false;
          } else {
            self.questions = JSON.parse(JSON.stringify(self.original_questions));
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't update question`});
          }
        },
        response => {
          self.questions = JSON.parse(JSON.stringify(self.original_questions));
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't update question`});
        }
      );
    } else {
      question['customer_tenant_id'] = self.customer_tenant['id'];

      self.http.post(environment.serverUrl + '/customer_tenant_questions.json', question
      ).subscribe(
        response => {
          if (response['customer_tenant_question']) {
            question['id'] = response['customer_tenant_question']['id'];
            self.questions.unshift(question);
            overlaypanel.visible = false;
          } else {
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create question`});
          }
        },
        response => {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create question`});
        }
      );
    }

  }

  showQuestions (event, overlaypanel: OverlayPanel) {
    this.question_list_component.getQuestions();
    overlaypanel.toggle(event);
  }

  addGeneralQuestions(event, overlaypanel: OverlayPanel) {
    const self = this;
    const ids: number[] = [];
    event.questions.forEach(q => ids.push(q.id));

    self.http.post(environment.serverUrl + '/add_project_questions/' + self.customer_tenant['id'] + '.json', { question_ids: ids }
    ).subscribe(
      response => {
        if (response['questions'] && response['questions'].length > 0) {
          const questions = response['questions'];
          questions.forEach(q => {
            const question: object = {};

            q['new_label'] = true;
            self.questions.push(q); }
          );
          setInterval(() => {
            self.label_state = 'active';
            setTimeout(() => {
              self.label_state = 'inactive';
            }, 1000);
          }, 2000);
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `There isn't any new questions`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load questions`});
      }
    );
    self.question_list_component.clearSelectedQuestions();
    overlaypanel.visible = false;
  }

  deleteCustomerTenantQuestion(question) {
    const self = this;
    self.http.delete(environment.serverUrl + '/customer_tenant_questions/' + question.id + '.json'
    ).subscribe(
      response => {
        if (response['message'] === 'Question successfully deleted') {
          self.questions = self.questions.filter(q => q['id'] !== question.id);
          // self.calcProgress();
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete questions`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete questions`});
      }
    );
  }

  createBusiness (object) {
    const self = this;

    const customer_id: number = self.customer.id;
    const businesses: Businesses[] = [];
    let customer_businesses: Businesses[] = [...self.customer.customer_businesses];
    const params: object = { ...object, ...{ customer_id: customer_id } };

    self.http.post(environment.serverUrl + '/businesses.json', params
    ).subscribe(
      (response) => {
        if (response['customer_businesses']) {

          const business: Businesses = response['business'];
          const business_domain: BusinessDomain = self.business_domains.find(bd => bd.id === object.business_domain_id);
          business.business_domain = business_domain.label;
          self.business_domains.forEach(bd => {
            bd.businesses.forEach(b => {
              b.business_domain = bd.label;
              businesses.push(b);
            });
          });

          self.businesses = businesses;
          customer_businesses = response['customer_businesses'];
          self.customer.customer_businesses = customer_businesses;

          self.business_multiselect.ngOnInit();

          self.flashHighlights.handler(self, '#business_list_', String(customer_id), 'success-updated');
          self.messageService.add({severity: 'info', summary: 'Success', detail: 'Business-domain successfully created'});
        } else {
          self.flashHighlights.handler(self, '#business_list_', String(customer_id), 'failed-update');
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Business-domain`});
        }
      },
      (response) => {
        self.flashHighlights.handler(self, '#business_list_', String(customer_id), 'failed-update');
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Business-domain`});
      }
    );
  }

  filterAddresses (event) {
    const self = this;
    self.filteredAddresses = [];
    for (let i = 0; i < self.addresses.length; i++) {
      const address = self.addresses[i];
      if (address['city_address'].toLowerCase().indexOf(event.query.toLocaleLowerCase()) === 0) {
        self.filteredAddresses.push(address['city_address']);
      }
    }
  }

  callMessageService (message) {
    const self = this;
    self.messageService.add({
      severity: message.severity,
      summary: message.summary,
      detail: message.detail
    });
  }

  goToCustomer (event) {
    const self = this;
    self.next_customers_ids.changeCustomers({ids: self.customers_ids['ids'], self_id:  event.value});
    self.setPrevNextId(self.customers_ids['ids'], event.value);
    self.router.navigate(['/customers', event.value]);
  }

  sendEmail (overlaypanel: OverlayPanel) {
    const self = this;

    if (self.selectedTemplate && self.current_email_address) {
      self.http.post(environment.serverUrl + '/send_notification/' + self.selectedTemplate['id']  + '.json',
        { email_addresses: self.current_email_address }
      ).subscribe(
        response => {
          if (response['id']) {
            self.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Email has been sent.'});

            self.selectedTemplate = null;
            self.current_email_address = null;
          } else {
            self.messageService.add({
              severity: 'warn',
              summary: 'Warning',
              detail: `Can't send email to Company`});
          }
        },
        response => {
          self.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail: `Can't send email to Company`});
        }
      );
    } else {
      self.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: `No templates selected`});
    }
    overlaypanel.visible = false;
  }

  changeGender(prop) {
    const self = this;
    setTimeout(() => {
      if (prop === 'responsible') self.selectedResponsibleGender =
        self.genders.find(g => g.value === self.customer_tenant['get_responsible_gender']);
      if (prop === 'assistant') self.selectedAssistantGender =
        self.genders.find(g => g.value === self.customer_tenant['get_assistant_gender']);
    });
  }

  sendMail(email, overlaypanel: OverlayPanel) {
    const self = this;
    const params = { address: self.current_email_address, email: email, project_id: self.current_project_id };
    self.http.post(environment.serverUrl + '/send_email_without_template.json', params
    ).subscribe(
      response => {
        if (response['id']) {
          self.messageService.add({severity: 'success', summary: 'Success', detail: `Email has been sent.`});
          self.current_email_address = null;
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't send email to Company`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't send email to Company`});
      }
    );
    overlaypanel.visible = false;
  }

  showSelectedTemplate(event, template, person, email, overlaypanel: OverlayPanel) {
    const self = this;
    let gender;
    if (person === 'responsible_name') gender = self.selectedResponsibleGender;
    else if (person === 'office_name') gender = self.selectedAssistantGender;

    self.selectedTemplate = self.changeTemplateGreeting.composeGreeting(template, self.customer_tenant, person, gender);
    self.setCurrentAddress(person, email);

    if (self.selectedTemplate) {
      overlaypanel.show(event);
    }
  }

  setCurrentAddress(name, email) {
    const self = this;
    self.current_email_address = {
      id:           self.customer_tenant['id'],
      name:         self.customer_tenant[name],
      email:        self.customer_tenant[email],
      assistant_id: self.customer_tenant['assistant_id']
    };
  }

  showNewEmailTemplate(event, name, email, overlaypanel: OverlayPanel) {
    const self = this;
    self.setCurrentAddress(name, email);
    overlaypanel.show(event);
  }

}
