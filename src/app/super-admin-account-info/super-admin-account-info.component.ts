import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SuperAdminBillingInfoComponent } from './super-admin-billing-info/super-admin-billing-info.component';
import {User} from '../interfaces/user';
import {SuperAdminInformationComponent} from './super-admin-information/super-admin-information.component';

export interface BillingInfo {
  id?: number;
  uid?: string;
  swift?: string;
  bank?: string;
  bic?: string;
  account?: string;
  iban?: string;
  phone?: string;
  fax?: string;
  zip1?: string;
  city1?: string;
  address1?: string;
  zip2?: string;
  city2?: string;
  address2?: string;
}

@Component({
  selector: 'app-super-admin-account-info',
  templateUrl: './super-admin-account-info.component.html',
  styleUrls: ['./super-admin-account-info.component.scss']
})

export class SuperAdminAccountInfoComponent implements OnInit {

  billing_info: BillingInfo;
  user: User;

  @ViewChild(SuperAdminBillingInfoComponent) billingInfo: SuperAdminBillingInfoComponent;
  @ViewChild(SuperAdminInformationComponent) userInfo: SuperAdminInformationComponent;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const self = this;
    self.http.get(`${environment.serverUrl}/super_admin_infos.json`).subscribe(
      res => {
        if (res['user']) {
          self.user = res['user'];
          self.billing_info = res['billing_info'];
        }
      },
      err => {}
    );
  }

  saveUserInfo(data) {
    const self = this;
    const params: object = {};
    params[data['field_name']] = data['value'];
    self.http.patch(`${environment.serverUrl}/super_admins/${self.user.id}.json`, params).subscribe(
      res => {
        if (res['user']) {
          self.user[data['field_name']] = data['value'];
          self.successUserUpdate();
        } else {
          self.user[data['field_name']] = data['value'];
          self.failUserUpdate();
        }
      },
      err => {
        self.user[data['field_name']] = data['value'];
        self.failUserUpdate();
      }
    );
  }

  saveBillingInfo(data) {
    const self = this;
    const params: object = {};
    params[data['field_name']] = data['value'];
    self.http.patch(`${environment.serverUrl}/super_admin_infos/${self.billing_info.id}.json`, params).subscribe(
      res => {
        if (res['billing_info']) {
          self.billing_info[data['field_name']] = data['value'];
          self.successBillingUpdate();
        } else {
          self.billing_info[data['field_name']] = data['originalValue'];
          self.failBillingUpdate();
        }
      },
      err => {
        self.billing_info[data['field_name']] = data['originalValue'];
        self.failBillingUpdate();
      }
    );
  }

  successBillingUpdate() {
    this.billingInfo.ifSuccessUpdate();
  }

  failBillingUpdate() {
    this.billingInfo.ifFailUpdate();
  }

  successUserUpdate() {
    this.userInfo.ifSuccessUpdate();
  }

  failUserUpdate() {
    this.userInfo.ifFailUpdate();
  }

}
