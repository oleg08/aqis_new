import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CallAlertService } from '../../services/call-alert.service';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { SortArrayService } from '../../services/sort-array.service';
import { SortMultipleService } from '../../services/sort-multiple.service';
import { GetEmailTemplatesService } from '../../services/get-email-templates.service';
import { PassCustomersIdsService } from '../../services/pass-customers-ids.service';
import { CustomersWithTenantsService } from '../../services/customers-with-tenants.service';
import { TransformStatesService } from '../../services/transform-states.service';
import { OpenStepsService } from '../../services/open-steps.service';
import { SortCustomers } from '../../interfaces/sort-customers';
import { CustomersSortDataService } from '../../services/customers-sort-data.service';
import { PassProjectIdService } from '../../services/pass-project-id.service';
import { GoogleAuthenticationMessagesService } from '../../services/google-authentication-messages.service';
import { CookieService } from 'ngx-cookie-service';
import { Message, OverlayPanel } from 'primeng/primeng';
import { MessageService        } from 'primeng/components/common/messageservice';
import { ShareCustomersIdsService } from '../../services/share-customers-ids.service';
import { IterateCustomersService } from '../../services/iterate-customers.service';
import { SwitchProjectService } from '../../services/switch-project.service';
import { EmailTemplates } from '../../interfaces/email-templates';
import { States } from '../../interfaces/states';
import { EmailAddresses } from '../../interfaces/email-addresses';
import { environment } from '../../../environments/environment';
import { Project } from '../../interfaces/project';
import {Customer} from '../../interfaces/customer';

import { PusherService } from '../../services/pusher.service';

@Component({
  selector: 'app-aqis-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss'],
  providers: [
    CallAlertService,
    FlashHighlightsService,
    SortArrayService,
    SortMultipleService,
    CustomersSortDataService,
    MessageService,
    GetEmailTemplatesService,
    CustomersWithTenantsService,
    TransformStatesService,
    IterateCustomersService
  ]
})
export class CustomerSearchComponent implements OnInit {

  constructor(private http: HttpClient,
              private router: Router,
              public rd: Renderer2,
              private messageService: MessageService,
              private callAlert: CallAlertService,
              private sortArray: SortArrayService,
              private sortMultiple: SortMultipleService,
              private next_customers_ids: PassCustomersIdsService,
              private getEmailTemplates: GetEmailTemplatesService,
              private customersWithTenants: CustomersWithTenantsService,
              private transformStates: TransformStatesService,
              private openSteps: OpenStepsService,
              private customersSortData: CustomersSortDataService,
              private shareCustomersIds: ShareCustomersIdsService,
              private iterateCustomers: IterateCustomersService,
              private flashHighlights: FlashHighlightsService,
              private passProjectId: PassProjectIdService,
              private switchProject: SwitchProjectService,
              private cookieService: CookieService,
              private pusherService: PusherService
  ) {
    this.copy_customers    = null;
    this.projects          = null;
    this.keywords          = '';
    this.order             = '';
    this.upload_file       = null;
    this.short_customers_list = true;

    this.customers_options_select = [
      { label: 'Deselect All Companies',    value: 1 },
      { label: 'Select All Companies',      value: 2 },
      { label: 'Select Filtered Companies', value: 3 },
    ];
    this.selectedOption = 1;
  }

  customers:            Array<object> = [];
  customer_ids:         Array<any> = [];
  total_customer_ids:   Array<any> = [];
  projects:             any;
  tenant_user:          any;
  tenant_users:         Array<object>;
  agent_users:          Array<object>;
  assistant_users:      Array<object>;
  filteredUsers:        any[];
  filteredAgentUsers:   any[];
  filteredAssistantUsers: any[];
  user_id:              number;
  current_project:      Project;
  current_project_id:   number|string;
  current_user:         object = { id: null };
  is_admin:             boolean;
  is_agent:             boolean;
  is_assistant:         boolean;
  keywords:             string;
  order:                string;
  new_name:             string;
  new_email:            string;
  new_identifier:       string;
  upload_file:          any;
  customers_ids:        string[] = [];
  sort_properties:      SortCustomers[];
  email_templates:      EmailAddresses[];
  selectedTemplate:     EmailTemplates;
  email_addresses:      EmailAddresses[] = [];

  short_customers_list: boolean;
  customers_options_select: object[];
  selectedOption: number;

  lazyCustomers:      Customer[] = [];
  used_pages:         number[] = [];

  copy_customers:     Array<object>;
  super_admin         = false;
  agent_or_assistant: boolean;
  assistant:          boolean;
  init               = true;
  size_page          = 100;
  customers_count    = 0;
  states:            States[];
  filter_states:     Array<object> = [];
  customer_states:   object;
  filter_roles:      Array<object> = [];
  selectedStates:    any[] = [];
  selectedRoles:     string[];
  status_search:     string[] = [];
  roles_search:      string;
  users_search:      string;
  current_request_url: string;  // to avoid multiple getting users from server

  redirect_url: string;
  return_to_url: string;

  msgs: Message[] = [];
  alert: boolean;
  alertType: string;
  alertMessage: string;
  loadCustomersMessage: string;

  @ViewChild('customersList') el: ElementRef;

  static generalFilterUsers(event, users, filtered_array) {

    for (let i = 0; i < users.length; i++) {
      const user = users[i]['email'];
      if (user.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        filtered_array.push(user);
      }
    }
  }

  ngOnInit() {
    const self = this;

    self.pusherService.channel.bind('my-event', data => {
      const customer: Customer = self.lazyCustomers.find(c => c.id === 4087);
      console.log('customer - ', customer);
      customer.name = 'New Name';
      self.flashHighlights.handler(self, '#customer_row_', '4087',
        'success-updated');
      console.log('data - ', data);
    });

    this.switchProject.currentValue.subscribe(val => {
      if (val) {
        this.nullifyAndGetCustomers();
        this.switchProject.switchProject(false);
      }
    });

    self.lazyCustomers = [];
    self.loadCustomersLazy(0);

    self.filter_roles = [
      { label: 'Agent', value: 'Agent' }, { label: 'Assistant', value: 'Assistant' }
    ];

    self.getEmailTemplates.get('email_templates').subscribe(
      data => {
        if (data['email_templates']) {
          self.email_templates = data['email_templates'];
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        }
      },
      data => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        console.log(data);
      }
    );

    self.http.get(environment.serverUrl + '/user_properties.json'
    ).subscribe(
      response => {
        if (response['user_id']) {

          const super_admin       = response['super_admin'];
          self.agent_or_assistant = response['agent_or_assistant'];
          self.projects           = response['projects'];
          self.assistant          = super_admin ? false : response['assistant'];
          self.is_admin           = response['is_admin'];
          self.is_agent           = response['is_agent'];
          self.is_assistant       = response['is_assistant'];

          if (!super_admin) {
            self.states = response['states'];
            self.customer_states = self.transformStates.customer_states(self.states);
            self.filter_states = self.transformStates.handler(self.states, !self.assistant);
          }
        }
      },
      response => { console.log(response); }
    );
  }

  getCustomers(page): string {
    const self = this;

    let project: Project;
    self.passProjectId.currentProject.subscribe(p => project = p);
    if (project) { self.current_project_id = project.id; }
    if (!self.current_project_id) {
      self.current_project_id = self.cookieService.get('project_id');
    }

    const timeZoneOffset = (-1) * new Date().getTimezoneOffset() / 60;
    let request: string;
    request = '/customers.json?page=' + page + '&timeOffset=' + timeZoneOffset;

    self.redirect_url = `${environment.serverUrl}/request_to_google`;
    self.return_to_url = `${environment.clientUrl}/customers`;

    if (self.current_project_id) { request += `&project_id=${self.current_project_id}`; }

    if (self.keywords) {
      request += '&keywords=' + self.keywords;
    }

    if (self.roles_search) {
      request += '&step_role=' + self.roles_search;
    }

    if (self.users_search) {
      request += '&user_id=' + self.users_search;
    }

    if (self.status_search && self.status_search.length > 0 && !self.super_admin) {
      request += '&states_ids=' + self.status_search;
    }

    if (self.order) {
      request += '&order=' + self.order;
    }

    self.current_request_url = request;
    return request;
    // return self.http.get(request).pipe(map(response => response));
  }

  loadCustomersLazy(event: number) {
    const self = this;
    if (!(Number.isInteger((event + 10) / self.size_page)) && event !== 0) { return; }
    const page = event === 0 ? 0 : (event + 10) / self.size_page;
    if (self.used_pages.indexOf(page) === -1) { self.used_pages.push(page);
    } else {
      return;
    }

    const customers = [...self.lazyCustomers];
    let next_customers: object[] = [];
    const url = self.getCustomers(page);
    if (!url) { return; }
    self.http.get(environment.serverUrl + url).subscribe(
      response => {
        if (response['customers']) {
          self.init = false;

          self.super_admin = response['super_admin'];
          self.customers_count = response['customers_count'];

          self.total_customer_ids = response['total_customer_ids'];
          self.customer_ids = response['customer_ids'];

          self.user_id = response['user_id'];
          let message: string;
          let type: string;

          if (!self.super_admin) {
            self.current_project = response['current_project'];
            if (response['google_authorized']) {
              const calendar_email: string = response['calendar_email'];
              if (self.current_project && self.current_project.gmail && self.current_project.gmail !== response['calendar_email']) {
                type = 'warning';
                message = GoogleAuthenticationMessagesService.emails_are_not_equals(calendar_email, self.current_project.gmail);
              } else {
                type = 'success';
                message = GoogleAuthenticationMessagesService.success(calendar_email);
              }
            } else {
              type = 'warning';
              message = GoogleAuthenticationMessagesService.fail();
            }
            self.callAlert.handler(self, type, message, 10000);
          }

          if (!self.super_admin && !self.tenant_users) {
            self.tenant_users = response['users'];

            self.agent_users = self.tenant_users.filter(u => u['agent'] === true);
            self.assistant_users = self.tenant_users.filter(u => u['assistant'] === true);
            if (!self.current_user['id']) { self.current_user = self.tenant_users.find(u => u['id'] === self.user_id); }
          }

          const project_id = self.current_project ? self.current_project['id'] : null;
          next_customers =
            self.customersWithTenants.assignTenants(response['customers'], project_id,
              self.user_id, self.agent_users, self.assistant_users);
          customers.push(...next_customers);
          self.lazyCustomers = JSON.parse(JSON.stringify(customers));
          self.copy_customers = JSON.parse(JSON.stringify(self.lazyCustomers));

          self.sort_properties = self.customersSortData.get(self.super_admin);
        } else {
          self.callAlert.handler(self, 'warning', `Can't load data`, 2000);
        }
      },
      response => {
        self.callAlert.handler(self, 'warning', `Can't load data`, 2000);
        console.log(response);
      },
    );

  }

  selectState (event) {
    const self = this;
    setTimeout(() => {
      let states = [...self.selectedStates];
      if (event.stated === 'Without States') {
        states = [0];
        self.selectedStates = states;
      } else {

        if (states.indexOf(0) !== -1) {
          const index1 = states.indexOf(0);
          if (index1 !== -1) { states.splice(index1, 1); }
        }
        if (states.length === 1 && states[0] === 'With States') {
          const states_with_value = [];
          self.filter_states.forEach(st => {
            if (st['value'] !== 0) { states_with_value.push(st['value']); }
          });
          states = states_with_value;
        }
        self.selectedStates = states;
      }
    });


  }

  changeStates () {
    const self = this;
    if (self.selectedStates && self.selectedStates.length > 0) {
      self.status_search = self.selectedStates;

    } else {
      self.status_search = null;
      self.lazyCustomers = JSON.parse(JSON.stringify(self.copy_customers));
    }

    self.nullifyAndGetCustomers();
  }

  nullifyAndGetCustomers() {
    const self = this;
    self.lazyCustomers = [];
    self.init = true;
    self.used_pages = [];
    self.loadCustomersLazy(0);
  }

  changeRoles (roles) {
    const self = this;

    self.roles_search = '';
    if (roles && roles.length > 0 ) {
      roles.forEach(role => {
        self.roles_search += role + ',';
      });
      self.roles_search = self.roles_search.slice(0, -1);
    }

    self.nullifyAndGetCustomers();
  }

  filterUsers(event) {
    const self = this;
    self.filteredUsers = [];
    self.filteredUsers.push('Not assigned Customers');
    CustomerSearchComponent.generalFilterUsers(event, self.tenant_users, self.filteredUsers);
  }

  filterAgentUsers(event) {
    const self = this;

    if (self.filteredAgentUsers) {
      self.filteredAgentUsers = JSON.parse(JSON.stringify(self.filteredAgentUsers));
    } else {
      self.filteredAgentUsers = [];

      for (let i = 0; i < self.agent_users.length; i++) {
        const user = self.agent_users[i]['email'];
        if (user.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
          self.filteredAgentUsers.push(user);
        }
      }
    }
  }

  filterAssistantUsers(event) {
    const self = this;
    if (self.filteredAssistantUsers) {
      self.filteredAssistantUsers = JSON.parse(JSON.stringify(self.filteredAssistantUsers));
    } else {
      self.filteredAssistantUsers = [];

      for (let i = 0; i < self.assistant_users.length; i++) {
        const user = self.assistant_users[i]['email'];
        if (user.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
          self.filteredAssistantUsers.push(user);
        }
      }
    }
  }

  clearTenantUsers() {
    const self = this;
    self.tenant_user = null;
    self.users_search = null;

    self.nullifyAndGetCustomers();
  }

  getMyLeads () {
    const self = this;

    self.tenant_user = self.tenant_users.find(u => u['id'] === self.user_id)['email'];
    self.users_search = String(self.user_id);

    self.nullifyAndGetCustomers();
  }

  changeTenantUsers (user) {
    const self = this;

    const tenant_user = self.tenant_users.find(u => u['email'].toLowerCase() === user.toLowerCase());

    self.users_search = tenant_user ? tenant_user['id'] : '0';

    self.nullifyAndGetCustomers();
  }

  viewDetails (customer, newTab?: string) {
    const self = this;
    let prop: string;
    prop = self.short_customers_list ? 'customer_ids' : 'total_customer_ids';

    let customers;
    customers = self.iterateCustomers.handle(self[prop]);
    //
    self.openSteps.changeOpenStepsState(false);        // to close Lead Qualification on customer-details
    self.next_customers_ids.changeCustomers({ customers: customers['customers'], ids: customers['customer_ids'], self_id: customer.id });

    const url = `${environment.clientUrl}/customers/${customer.id}`;

    newTab ? self.router.navigate(['/customers', customer['id']]) :
      self.router.navigate([]).then(result => { window.open(url, '_blank'); });

  }

  searchCustomers (model) {
    const self = this;
    self.keywords = model.viewModel;
    self.lazyCustomers = [];
    self.customers_count = 0;
    self.init = true;
    self.used_pages = [];
    self.loadCustomersLazy(0);
  }

  addCustomer (new_name, new_email, new_identifier) {

    let new_customer = {
      name:       new_name,
      email:      new_email,
      identifier: new_identifier
    };
    if (!new_name) { return; }
    const self = this;

    const customers = [...self.lazyCustomers];

    self.http.post(environment.serverUrl + '/customers.json', new_customer
    ).subscribe(
      function (response) {
        if (response['customer']) {
          new_customer = response['customer'];
          customers.unshift(new_customer);
          self.lazyCustomers = customers;
          self.customers_count += 1;
          self.new_name       = '';
          self.new_email      = '';
          self.new_identifier = '';
        } else {
          self.callAlert.handler(self, 'warning', response['message'], 2000);
        }
      },
      function (response) {
        self.callAlert.handler(self, 'warning', `Can't create customer`, 2000);
        console.log(response);
      }
    );
  }


  removeCustomer (index, customer) {
    const self = this;
    const customers = [...self.lazyCustomers];

    self.http.delete(environment.serverUrl + '/customers/' + customer.id + '.json'
    ).subscribe(
      function (response) {
        if (response['id']) {
          customers.splice(index, 1);
          self.lazyCustomers = customers;
          self.customers_count -= 1;
        } else {
          self.callAlert.handler(self, 'warning', response['message'], 2000);
        }
      },
      function (response) {
        self.callAlert.handler(self, 'warning', `Can't delete customer`, 2000);
        console.log(response);
      }
    );
  }

  setInputToPristine (field) {
    field._parent.form.markAsPristine();
  }

  fileChange(event) {
    const self = this;

    const fileList: FileList = event.target.files;

    if (fileList[0].name.split('.').slice(-1)[0] !== 'xlsx' &&
      fileList[0].name.split('.').slice(-1)[0] !== 'csv'  &&
      fileList[0].name.split('.').slice(-1)[0] !== 'ods'
    ) {
      self.callAlert.handler(
        self,
        'warning',
        `You should select '.csv' or '.xlsx' files`,
        2000
      );
      setTimeout(() => {
        self.upload_file = null;
      }, 2000);
      return; }

    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);

      self.http.post(environment.serverUrl + '/customers/fetch_excel_data.json', formData
      ).subscribe(
        (response) => {

          if (response['message']) {
            self.loadCustomersMessage = response['message'];
          }

          console.log(response);
          setTimeout(() => {
            self.upload_file = null;
            self.loadCustomersMessage = null;
          }, 2000);
        },
        (response) => {
          console.log('3', response);
          self.callAlert.handler(self, 'warning', `Can't load data`, 2000);
          self.upload_file = null;
        }
      );
    }
  }

  sortCustomersBy (event) {
    const self = this;

    self.lazyCustomers = [];
    self.init = true;

    self.order = event.value instanceof Array ? self.order = event.value[0] + ',' + event.value[1] : event.value;
    self.used_pages = [];
    self.loadCustomersLazy(0);
  }

  sendEmail() {
    const self = this;

    if (self.email_addresses.length < 1) {
      self.messageService.add({
        severity: 'warn', summary: 'Warning', detail: 'Select one or more company to send email'});
      return;
    }

    if (self.selectedTemplate) {
      self.http.post(environment.serverUrl + '/send_notification/' + self.selectedTemplate['id']  + '.json',
        { email_addresses: self.email_addresses }
      ).subscribe(
        response => {
          if (response['id']) {
            self.messageService.add({
              severity: 'success', summary: 'Success', detail: 'Email has been sent.'});

            self.email_addresses = [];
          } else {
            self.messageService.add({
              severity: 'warn', summary: 'Warning', detail: `Can't send email to Company`});
          }
        },
        response => {
          self.messageService.add({
            severity: 'warn', summary: 'Warning', detail: `Can't send email to Company`});
          console.log(response);
        }
      );
    } else {
      self.messageService.add({
        severity: 'warn', summary: 'Warning', detail: 'No templates selected'});
    }
  }

  selectTemplate(event, template: EmailTemplates, overlaypanel: OverlayPanel) {

    if (!template) { return; }

    const self = this;
    self.selectedTemplate = template;
    self.selectedTemplate.greeting = null;
    if (self.selectedTemplate) { self.selectedTemplate.body = self.selectedTemplate.body.replace(/\n/gi,  ' <br/> ' ); }
    if (self.selectedTemplate) {
      overlaypanel.toggle(event.originalEvent);
    }
  }

  assigningRequest (id, params) {
    const self = this;
    params['project_id'] = self.current_project_id;
    self.http.post(environment.serverUrl + '/assign_customer_to_user/' + id + '.json', params
    ).subscribe(
      response => {
        if (response['message'] === 'Successfully updated') {
          self.flashHighlights.handler(self, '#customer_assign_', String(id),
            'success-updated'
          );
        } else {
          self.flashHighlights.handler(self, '#customer_assign_', String(id),
            'failed-update'
          );
        }
      },
      response => {
        self.flashHighlights.handler(self, '#customer_assign_', String(id),
          'failed-update'
        );
      }
    );
  }

  assignCustomerToMe(customer, prop1, prop2) {
    const self = this;
    if (self.super_admin) { return; }
    self.assigningRequest(customer.id, { [prop1]: customer[prop1] });
    const email =  JSON.parse(JSON.stringify(self.current_user['email']));
    customer[prop2]['email'] = customer[prop1] ? email : null;
  }

  assignSelectedCustomer (customer_id, email, prop, clear?) {
    const self = this;

    if (self.super_admin) { return; }
    const prop1 = 'assigned_as_' + prop;
    const prop2 = prop + '_id';
    const user = self[prop + '_users'].find(u => u['email'] === email);
    const params = { [prop2]: user['id'] };
    if (clear) { params['clear'] = true; }
    if (user) {
      self.assigningRequest(customer_id, params);

      const customer = self.lazyCustomers.find(c => c.id === customer_id);
      if (clear) {
        customer[prop + '_user']['email'] = null;
        customer[prop1] = false;
      } else {
        customer[prop1] = user['id'] === self.user_id ? !customer[prop1] : false;
      }
    }
  }

  selectCustomer (ids) {
    const self = this;
    self.customers_ids = ids;
    self.shareCustomersIds.changeCustomersIds(ids);
  }

  selectCustomers() {
    const self = this;

    const selected_customers: string[] = [];
    switch (self.selectedOption) {
      case 1:
        self.customers_ids = [];
        break;
      case 2:
        self.total_customer_ids.forEach(c => {
          selected_customers.push(String(c[0]));
        });
        self.customers_ids = selected_customers;
        break;
      case 3:
        self.customer_ids.forEach(c => {
          selected_customers.push(String(c[0]));
        });
        self.customers_ids = selected_customers;
        break;
      default:
        self.customers_ids = [];
    }
  }

  loadSteps() {
    const self = this;
    if (self.super_admin) { return; }

    if (self.customers_ids.length < 1) {
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: 'You should select at least one company'});
      return;
    }

    const ids: string[] = [];
    self.customers_ids.forEach(id => { ids.push(id); });

    self.http.post(environment.serverUrl + '/load_projects_steps/' + self.current_project['id'] + '.json', { customer_ids: ids }
    ).subscribe(
      response => {
        if (response['message'] === 'All requested steps are loaded.') {
          self.messageService.add({severity: 'success', summary: 'Success', detail: response['message']});
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load steps`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load steps`});
        console.log(response);
      }
    );
  }

}
