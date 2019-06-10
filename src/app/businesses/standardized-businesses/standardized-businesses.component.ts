import { Component, OnInit } from '@angular/core';
import { CallAlertService } from '../../services/call-alert.service';
import { HttpClient } from '@angular/common/http';
import { StandardizedBusinessesService } from './standardized-businesses.service';
import { Businesses } from '../../interfaces/businesses';
import { BusinessService } from '../business.service';
import {environment} from '../../../environments/environment';
import { StandardizedBusiness } from '../../interfaces/standardized-businesses';
import { Message               } from 'primeng/primeng';
import { MessageService        } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-standardized-businesses',
  templateUrl: './standardized-businesses.component.html',
  styleUrls: ['./standardized-businesses.component.scss'],
  providers: [
    CallAlertService
  ]
})
export class StandardizedBusinessesComponent implements OnInit {

  constructor(private callAlert: CallAlertService,
              private standBusinessSrv: StandardizedBusinessesService,
              private businessSrv: BusinessService,
              private messageService: MessageService,
              private http: HttpClient) { }

  upload_file: any;
  standardized_businesses: StandardizedBusiness[];
  searched_st_businesses: StandardizedBusiness[];
  businesses: Businesses[];
  searched_businesses: Businesses[];
  msgs: Message[] = [];
  alert: boolean;
  alertType: string;
  alertMessage: string;

  static ifFindStBusinesses (search_val, st_bsn: StandardizedBusiness) {
    return st_bsn.name.toLowerCase().includes(search_val.toLowerCase())
      || st_bsn.code.includes(search_val)
      || st_bsn.iaf.includes(search_val);
  }

  static  ifFindBusinesses(search_val, bsn: Businesses) {
    return bsn.description.toLowerCase().includes(search_val.toLowerCase());
  }

  ngOnInit() {
    const self = this;
    self.standBusinessSrv.get().then(bsns => {
      self.standardized_businesses = bsns;
      self.searched_st_businesses = JSON.parse(JSON.stringify(bsns));
    });

    self.businessSrv.get().then(bsns => {
      self.businesses = bsns;
      self.searched_businesses = JSON.parse(JSON.stringify(bsns));
    });
  }

  searchStBusinesses(value) {
    const self = this;
    self.searched_st_businesses = self.standardized_businesses.filter(
      (st_bsn) => StandardizedBusinessesComponent.ifFindStBusinesses(value, st_bsn));
  }

  searchBusinesses(value) {
    const self = this;
    self.searched_businesses = self.businesses.filter(
      (bsn) => StandardizedBusinessesComponent.ifFindBusinesses(value, bsn)
    );
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

      self.http.post(environment.serverUrl + '/load_standardized_businesses.json', formData
      ).subscribe(
        (response) => {

          if (response['standardized_businesses']) {
            self.standardized_businesses = self.standardized_businesses.concat(response['standardized_businesses']);
          } else {
            if (response['message']) {
              // self.loadCustomersMessage = response['message'];
            }

            console.log(response);
            setTimeout(() => {
              self.upload_file = null;
              // self.loadCustomersMessage = null;
            }, 2000);
          }
        },
        (response) => {
          console.log('3', response);
          self.callAlert.handler(self, 'warning', `Can't load data`, 2000);
          self.upload_file = null;
        }
      );
    }
  }

}
