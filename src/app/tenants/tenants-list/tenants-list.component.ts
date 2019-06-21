import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FlashHighlightsService } from '../../services/flash-highlights.service';

import { Message        } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/api';
import { environment } from '../../../environments/environment';
import {Tenant} from '../../interfaces/tenant';
import { EditTenantComponent } from '../edit-tenant/edit-tenant.component';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-tenants-list',
  templateUrl: './tenants-list.component.html',
  styleUrls: ['./tenants-list.component.scss'],
  providers: [
    FlashHighlightsService,
    MessageService,
    ConfirmationService
  ]
})
export class TenantsListComponent implements OnInit {

  tenants: any;
  msgs: Message[] = [];
  password: string = null;
  originalValue: string;
  current_tenantId: number;
  current_tenant: Tenant;
  displayEdit = false;

  @ViewChild('tenantsList', { static: false }) el: ElementRef;
  @ViewChild('edit_tenant', { static: false }) edit_tenant: EditTenantComponent;

  constructor(private http: HttpClient,
              private router: Router,
              private flashHighlights: FlashHighlightsService,
              private rd: Renderer2,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    const self = this;
    self.getTenants();
  }

  getTenants () {
    const self = this;
    self.http.get(environment.serverUrl + '/tenants.json'
    ).subscribe(
      response => {
        if (response['tenants']) {
          self.tenants = response['tenants'];

          self.tenants.forEach(tenant => {
            tenant.tenant_admins = [];
            tenant['users'].forEach(user => {
              if (user['admin'] === true) {
                tenant.tenant_admins.push(user);
              }
            });
          });

        } else if (response['confirm_super_admin']) {
          window.location.href = '/';
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
      }
    );
  }

  passTenantId(tenant_id) {
    const self = this;
    self.current_tenantId = tenant_id;
  }

  showEditDialog(tenant: Tenant) {
    this.current_tenant = tenant;
    this.displayEdit = true;
  }

  hideEditDialog() {
    const self = this;
    self.current_tenant = null;
    self.edit_tenant.assignOriginalValue();
  }

  createTenantAdmin (object) {
    const self = this;
    object['admin'] = true;
    object['tenant_id'] = self.current_tenantId;

    self.http.post(environment.serverUrl + '/users/tenant_admin.json', object
    ).subscribe(
      response => {
        if (response['user']) {
          const tenant = self.tenants.find(item => item.id === self.current_tenantId);
          const t_admin = tenant['tenant_admins']
            .find(user => user.id === response['user']['id'] && user['admin'] === false);
          if (!t_admin) {
            tenant['tenant_admins'].push(response['user']);
          }
          self.messageService.add({severity: 'success', summary: 'Success', detail: `Tenant-Admin successfully created`});
        } else if (response['confirm_super_admin']) {
          window.location.href = '/';
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
      },
    );
  }

  deleteTenantAdmin(tenant, user_id, index) {
    const self = this;
    self.http.patch(environment.serverUrl + '/users/' + user_id + '.json', { admin: false }
    ).subscribe(
      response => {
        if (response['user']) {
          tenant['tenant_admins'].splice(index, 1);
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't update user`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't update user`});
      }
    );
  }

  viewDetails (tenant_id) {
    const self = this;
    self.router.navigate(['/', tenant_id]);
  }

  createTenant (object) {
    const self = this;
    self.http.post(environment.serverUrl + '/tenants.json', object
    ).subscribe(
      (response) => {
        if (response['tenant']) {

          const new_tenant = response['tenant'];
          new_tenant['tenant_admins'] = [];

          const array = JSON.parse(JSON.stringify(self.tenants));
          array.unshift(response['tenant']);
          self.tenants = array;

          setTimeout(() => {
            self.flashHighlights.handler(self, '#tenantRow-', response['tenant']['id'],
              'success-updated'
            );
          });

          self.messageService.add({severity: 'info', summary: 'Success', detail: 'Tenant successfully created'});
        } else if (response['confirm_super_admin']) {
          window.location.href = '/';
        } else if (response['message'] === 'Validation failed: Name has already been taken') {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Tenant already exists`});
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Tenant`});
        }
      },
      (response) => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Tenant`});
      }
    );
  }

  // setOriginalValue (event) {
  //   const self = this;
  //   self.originalValue = event.data.name;
  // }

  editTenant (event) {
    const self = this;
    const tenant_id = event.id;
    const params = event.params;
    self.displayEdit = false;
    self.http.patch(environment.serverUrl + '/tenants/' + tenant_id + '.json', params
    ).subscribe(
      response => {
        if (response['tenant']) {
          self.flashHighlights.handler(self, '#tenantRow-', tenant_id,
            'success-updated'
          );
        } else if (response['confirm_super_admin']) {
          window.location.href = '/';
        } else {
          const tenant = self.tenants.find(item => item['id'] === tenant_id);
          // tenant.name = self.originalValue;
          // tenant.label = self.originalValue;

          self.flashHighlights.handler(self, '#tenantRow-', tenant_id,
            'failed-update'
          );

          if (response['message'] === 'Validation failed: Name has already been taken') {
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Tenant already exists`});
          }
        }
      },
      response => {
        self.flashHighlights.handler(self, '#tenantRow-', tenant_id,
          'failed-update'
        );
      }
    );
  }

  allowEditData(user: User, val) {
    const self = this;
    const params = { edit_basic_data: val };
    self.http.patch(`${environment.serverUrl}/super_admins/${user.id}.json`, params).subscribe(
      res => {
        if (res['user']) {
          self.flashHighlights.handler(self, '#user-', user.id, 'success-updated');
        } else {
          setTimeout(() => { user.edit_basic_data = !val; }, 2000);
          self.flashHighlights.handler(self, '#user-', user.id, 'failed-update');
        }
      },
      err => {
        setTimeout(() => { user.edit_basic_data = !val; }, 2000);
        self.flashHighlights.handler(self, '#user-', user.id, 'failed-update');
      }
    );
  }

  removeTenant(event, tenant) {
    const self = this;
    self.http.delete(environment.serverUrl + '/tenants/' + tenant.id + '.json'
    ).subscribe(
      response => {
        if (response['tenant_id']) {
          self.tenants = self.tenants.filter(item => item['id'] !== tenant['id']);
          self.messageService.add({severity: 'success', summary: 'Success', detail: `Tenant successfully deleted`});
        } else if (response['customers_not_empty']) {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete Tenant. It belongs to customers`});
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete Tenant.`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete Tenant.`});
      }
    );
  }

}
