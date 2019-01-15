import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Message        } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/api';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.component.html',
  styleUrls: ['./tenant-details.component.scss'],
  providers: [
    FlashHighlightsService,
    MessageService
  ]
})
export class TenantDetailsComponent implements OnInit {

  msgs: Message[] = [];
  tenant: object;
  sortOptions: Array<object>;
  sortKey: string;
  sortField: string;
  sortOrder: number;
  displayDialog: boolean;
  selectedUser: object;
  editedPassword: string;
  editedPasswordConfirmation: string;
  originalEmail: string;
  current_user_id: number;

  roles: Array<object>;
  roles_array: Array<string> = ['admin', 'agent', 'assistant'];
  original_users: Array<object>;

  @ViewChild('tenantsUserList') el: ElementRef;

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private flashHighlights: FlashHighlightsService,
              private rd: Renderer2,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    const self = this;

    self.roles = [
      {
        label: 'Admin',
        value: 'admin_role',
        icon: 'fa fa-user-plus'
      },
      {
        label: 'Agent',
        value: 'agent_role',
        icon: 'fa fa-user'
      },
      {
        label: 'Assistance',
        value: 'assistant_role',
        icon: 'fa fa-user-o'
      }
    ];

    const observableFailed = function (response) {
      alert(response);
    };


    const tenantGetSuccess = function (response) {

      if (response['tenant']) {
        self.tenant = response['tenant'];
        self.current_user_id = response['current_user_id'];

        self.setRoles(self.tenant['users']);
        self.original_users = JSON.parse(JSON.stringify(self.tenant['users']));

        self.sortOptions = [
          {label: 'Newest First', value: '!id'},
          {label: 'Oldest First', value: 'id'},
          {label: 'Email', value: 'email'}
        ];
      } else if (response['message'] === 'Alien tenant') {
        window.location.href = '/';
      }
    };

    const routeSuccess = (params) => {
      self.http.get(environment.serverUrl + '/tenants/' + params['id'] + '.json'
      ).subscribe(
        tenantGetSuccess,
        observableFailed
      );
    };

    self.activatedRoute.params.subscribe(routeSuccess, observableFailed);
  }

  setRoles (users) {
    const self = this;

    const totalRoles = {
      'admin': 0,
      'agent': 0,
      'assistant': 0
    };
    self.roles_array = ['admin', 'agent', 'assistant'];

    users.forEach(user => {

      user['selectedRoles'] = [];
      self.roles_array.forEach(role => {
        user[role + '_role'] = user[role] ? role + '_role' : 'none';
        user['selectedRoles'].push(user[role + '_role']);
      });

      self.roles_array.forEach(role => {
        if (user['selectedRoles'].indexOf(role + '_role') > -1) totalRoles[role] += 1;
      });
    });

    let missing_roles = '';
    self.roles_array.forEach(role => {
      if (totalRoles[role] === 0) missing_roles = missing_roles + (role[0].toUpperCase() + role.substr(1, 8)) + 's ';
    });

    if (missing_roles.length > 0) {
      let message = `There aren't `;
      message = message + missing_roles + 'in your Tenant';
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: message});
    }
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  selectUser(event, user) {
    const self = this;
    self.selectedUser = user;
    self.originalEmail = JSON.parse(JSON.stringify(self.selectedUser['email']));
    self.displayDialog = true;
    event.preventDefault();
  }

  addUser (object) {

    const self = this;
    object['tenant_id'] = self.tenant['id'];


    self.http.post(environment.serverUrl + '/tenant/' + self.tenant['id'] + '/add_user.json', object
    ).subscribe(
      response => {
        if (response['user']) {

          const user = response['user'];

          user['admin_role']     = 'none';
          user['agent_role']     = 'none';
          user['assistant_role'] = 'assistant_role';

          user['selectedRoles'] = [user['admin_role'], user['agent_role'], user['assistant_role']];
          self.tenant['users'].unshift(user);

          self.original_users = JSON.parse(JSON.stringify(self.tenant['users']));

          setTimeout(() => {
            self.flashHighlights.handler(self, '.tenants_', 'user',
              'success-updated'
            );
          });
        } else if (response['message'] === 'Alien tenant') {
          window.location.href = '/';
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create user.`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create user.`});
      }
    );
  }

  deleteUser (user) {
    const self = this;

    if (user.id === self.current_user_id) {
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Admin can't delete himself`});
      return;
    }

    self.confirmationService.confirm({
      message: 'Are you sure that you want to delete this user?',
      header: 'Delete User',
      icon: 'fa fa-question-circle',
      accept: () => {
        self.http.delete(environment.serverUrl + '/users/' + user.id + '.json'
        ).subscribe(
          response => {
            if (response['user_id']) {
              self.tenant['users'] = self.tenant['users'].filter(item => item['id'] !== user.id);
              self.original_users = JSON.parse(JSON.stringify(self.tenant['users']));

              self.messageService.add({severity: 'success', summary: 'Success', detail: `User successfully deleted`});
            } else if (response['message'] === 'Alien tenant') {
              window.location.href = '/';
            } else {
              self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete user.`});
            }
          },
          response => {
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete user.`});
          }
        );
      },
      reject: () => {}
    });
  }

  updateUser (user_id, field, value) {
    const self = this;

    const params = {
      [field]: value
    };

    self.http.patch(environment.serverUrl + '/users/' + user_id + '.json', params
    ).subscribe(
      response => {
        if (response['user']) {
          self.original_users = JSON.parse(JSON.stringify(self.tenant['users']));

          setTimeout(() => {
            self.flashHighlights.handler(self, '#user_', field,
              'success-updated'
            );
          });
        } else {
          self.tenant['users'] = JSON.parse(JSON.stringify(self.original_users));
          setTimeout(() => {
            self.flashHighlights.handler(self, '#user_', field,
              'failed-update'
            );
          });
        }
      },
      response => {
        self.tenant['users'] = JSON.parse(JSON.stringify(self.original_users));
        setTimeout(() => {
          self.flashHighlights.handler(self, '#user_', field,
            'failed-update'
          );
        });
      }
    );
  }

  editName(user_id: string, value, field, model) {
    const self = this;
    self.updateUser(user_id, field, value);
  }

  editEmail(user_id: string, value, field, model) {
    const self = this;

    if (model.control.status === 'INVALID') {
      self.selectedUser['email'] = JSON.parse(JSON.stringify(self.originalEmail));
      self.original_users = JSON.parse(JSON.stringify(self.tenant['users']));

      setTimeout(() => {
        self.flashHighlights.handler(self, '#user_', 'email',
          'failed-update'
        );
      });
      return;
    }

    self.updateUser(user_id, field, value);
  }

  editPassword (user_id) {
    const self = this;

    if (!self.editedPasswordConfirmation) {
      self.editedPassword = null;
      return;
    } else if (self.editedPasswordConfirmation.length < 6) {
      self.editedPassword = null;
      self.editedPasswordConfirmation = null;
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Password must have more than 5 characters`});
      setTimeout(() => {self.flashHighlights.handler(self, '#user_', 'password', 'failed-update'); });
      return;
    }

    if (self.editedPassword !== self.editedPasswordConfirmation) {
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Password and Password Confirmation must be equal`});
      setTimeout(() => {
        self.flashHighlights.handler(self, '#user_', 'password', 'failed-update');
      });
      self.editedPassword = null;
      self.editedPasswordConfirmation = null;
      return;
    }

    const params = {
      user: {
        password: self.editedPassword,
        password_confirmation: self.editedPasswordConfirmation
      }
    };
    self.http.patch(environment.serverUrl + '/user_password/' + user_id + '.json', params
    ).subscribe(
      response => {
        if (response['user']) {

          self.original_users = JSON.parse(JSON.stringify(self.tenant['users']));

          self.editedPassword = null;
          self.editedPasswordConfirmation = null;
          self.flashHighlights.handler(self, '#user_', 'password', 'success-updated');
        } else if (response['message'] === 'Alien tenant') {
          window.location.href = '/';
        } else {
          self.editedPassword = null;
          self.editedPasswordConfirmation = null;
          self.flashHighlights.handler(self, '#user_', 'password', 'failed-update');
        }
      },
      response => {
        self.editedPassword = null;
        self.editedPasswordConfirmation = null;
        self.flashHighlights.handler(self, '#user_', 'password', 'failed-update');
      },
    );
  }

  setPristine (model) {
    model.control.markAsPristine();
  }

  selectRoles(user, values, model) {
    const self = this;

    const params = {};

    params['admin'] = values.indexOf('admin_role') !== -1;
    params['agent'] = values.indexOf('agent_role') !== -1;
    params['assistant'] = values.indexOf('assistant_role') !== -1;

    if (params['admin'] === false && user.id === self.current_user_id) {
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: `You can't set non-admin for yourself`});
      self.tenant['users'] = JSON.parse(JSON.stringify(self.original_users));
      return;
    }
    self.http.patch(environment.serverUrl + '/users/' + user.id + '.json', params
    ).subscribe(
      response => {
        if (response['user']) {
          const usr = self.tenant['users'].find(u => u['id'] === user.id);
          usr['selectedRoles'] = values;

          self.roles_array.forEach(role => {
            usr[role] = params[role.split('?')[0]];
          });

          self.setRoles(self.tenant['users']);
          self.original_users = JSON.parse(JSON.stringify(self.tenant['users']));
          self.flashHighlights.handler(self, '#user_roles-', user.id,
            'success-updated'
          );
        } else {

          self.tenant['users'] = JSON.parse(JSON.stringify(self.original_users));

          setTimeout(() => {
            self.flashHighlights.handler(self, '#user_roles-', user.id,
              'failed-update'
            );
          });
        }
      },
      response => {
        self.tenant['users'] = JSON.parse(JSON.stringify(self.original_users));
        setTimeout(() => {
          self.flashHighlights.handler(self, '#user_roles-', user.id,
            'failed-update'
          );
        });
      }
    );
  }
}
