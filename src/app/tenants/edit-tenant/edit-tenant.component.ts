import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Tenant } from '../../interfaces/tenant';

@Component({
  selector: 'app-aqis-edit-tenant',
  templateUrl: './edit-tenant.component.html',
  styleUrls: ['./edit-tenant.component.scss']
})
export class EditTenantComponent implements OnInit {

  originalTenant: Tenant;
  doSave = false;

  @Input() tenant: Tenant;
  @Output() saveTenant:  EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
    const self = this;
    self.originalTenant = {...self.tenant};
  }

  save() {
    const self = this;
    self.doSave = true;
    if (self.tenant.name.length === 0) {
      self.tenant.name = JSON.parse(JSON.stringify(self.originalTenant.name));
      return;
    }
    const data: object = {
      id: self.tenant.id,
      params: {
        name: self.tenant.name,
        uid: self.tenant.uid,
        email: self.tenant.email,
        phone: self.tenant.phone,
        zip: self.tenant.zip,
        city: self.tenant.city,
        address: self.tenant.address
      }
    };
    self.saveTenant.emit(data);
  }

  assignOriginalValue() {
    const self = this;
    if (!self.doSave) {
      self.tenant.name = self.originalTenant.name;
      self.tenant.uid = self.originalTenant.uid;
      self.tenant.email = self.originalTenant.email;
      self.tenant.phone = self.originalTenant.phone;
      self.tenant.zip = self.originalTenant.zip;
      self.tenant.city = self.originalTenant.city;
      self.tenant.address = self.originalTenant.address;
    }
    self.doSave = false;
  }

}
