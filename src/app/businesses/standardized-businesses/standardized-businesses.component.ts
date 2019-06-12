import {Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import { CallAlertService } from '../../services/call-alert.service';
import { HttpClient } from '@angular/common/http';
import { StandardizedBusinessesService } from './standardized-businesses.service';
import { Businesses } from '../../interfaces/businesses';
import { BusinessService } from '../business.service';
import {environment} from '../../../environments/environment';
import { StandardizedBusiness } from '../../interfaces/standardized-businesses';
import { Message               } from 'primeng/primeng';
import { MessageService        } from 'primeng/components/common/messageservice';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-standardized-businesses',
  templateUrl: './standardized-businesses.component.html',
  styleUrls: ['./standardized-businesses.component.scss'],
  providers: [
    CallAlertService,
    FlashHighlightsService
  ],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('0.5s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class StandardizedBusinessesComponent implements OnInit {

  @ViewChild('standardizedBusinessesList') el: ElementRef;

  constructor(private callAlert: CallAlertService,
              private flashHighlights: FlashHighlightsService,
              private standBusinessSrv: StandardizedBusinessesService,
              private businessSrv: BusinessService,
              private messageService: MessageService,
              private rd: Renderer2,
              private http: HttpClient) { }

  upload_file: any;
  standardized_businesses: StandardizedBusiness[];
  searched_st_businesses: StandardizedBusiness[];
  businesses: Businesses[];
  own_businesses: Businesses[];
  businesses_selected: Businesses[] = [];
  searched_businesses: Businesses[];
  msgs: Message[] = [];
  alert: boolean;
  alertType: string;
  alertMessage: string;
  showBusinessesList = false;
  detailedBusiness: StandardizedBusiness;
  searchBusinessClause: string;

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
      bsns.forEach(b => {
        b.stringify_keys = [];
        b.standardized_business_keys.forEach(key => {
          b.stringify_keys.push(key.label);
        });
      });
      self.standardized_businesses = bsns;
      self.searched_st_businesses = JSON.parse(JSON.stringify(bsns));
    });

    self.businessSrv.getNotAssigned().then(bsns => {
      self.businesses = bsns;
      self.businesses.forEach(b => b.selected = false);
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

  addKey(event, business: StandardizedBusiness) {
    const self = this;
    const bsn = self.standardized_businesses.find((b) => b.id === business.id);
    const copy_keys = JSON.parse(JSON.stringify(business.stringify_keys));
    self.standBusinessSrv.addKeyword(business.id, { label: event.value }).then(
      (data) => {
        if (data['standardized_business']) {
          bsn.standardized_business_keys = data['standardized_business']['standardized_business_keys'];
          self.flashHighlights.handler(self, '#st-bsn-', business.id, 'success-updated');
        } else {
          business.stringify_keys = copy_keys;
          self.flashHighlights.handler(self, '#st-bsn-', business.id, 'failed-update');
        }
      }
    );
  }

  removeKey(event, business: StandardizedBusiness) {
    const self = this;
    const bsn = self.standardized_businesses.find((b) => b.id === business.id);
    const copy_keys = JSON.parse(JSON.stringify(business.stringify_keys));

    self.standBusinessSrv.removeKeyword(business.id, { label: event.value }).then(
      data => {
        if (data['standardized_business']) {
          bsn.standardized_business_keys = data['standardized_business']['standardized_business_keys'];
          self.flashHighlights.handler(self, '#st-bsn-', business.id, 'success-updated');
        } else {
          business.stringify_keys = copy_keys;
          self.flashHighlights.handler(self, '#st-bsn-', business.id, 'failed-update');
        }
      }
    );
  }

  assignByKeyword(st_business: StandardizedBusiness) {
    const self = this;
    self.standBusinessSrv.assignByKeywords(st_business.id)
      .then(data => {
        if (data['standardized_business']) {
          const added_business_ids: number[] = data['added_business_ids'];
          self.businesses = self.businesses.filter(b => !added_business_ids.includes(b.id));

          self.searchBusinessClause ? self.searchBusinesses(self.searchBusinessClause) :
            self.searched_businesses = JSON.parse(JSON.stringify(self.businesses));
          self.callAlert.handler(self,
            'success',
            `${added_business_ids.length} businesses were added`,
            2000);
        } else {
          self.callAlert.handler(self, 'warning', `Can't add businesses`, 2000);
        }
      });
  }

  checkBusiness($event, business: Businesses) {
    const self = this;
    const bsn: Businesses = self.businesses.filter(b => b.id === business.id)[0];
    bsn.selected = !bsn.selected;
    if (bsn.selected) {
      self.businesses_selected.push(bsn);
    } else {
      if (self.businesses_selected.includes(bsn)) {
        self.businesses_selected.splice(self.businesses_selected.indexOf(bsn), 1);
      }
    }
  }

  assignBusinesses(business: StandardizedBusiness) {
    const self = this;

    const business_ids: number[] = [];
    self.businesses_selected.forEach(bs => {
      business_ids.push(bs.id);
    });

    self.standBusinessSrv.assignSelected(business.id, business_ids).then(
      data => {
        if (data['added_business_ids']) {
          const added_business_ids: number[] = data['added_business_ids'];
          self.businesses = self.businesses.filter(b => !added_business_ids.includes(b.id));

          self.searchBusinessClause ? self.searchBusinesses(self.searchBusinessClause) :
            self.searched_businesses = JSON.parse(JSON.stringify(self.businesses));

          self.callAlert.handler(self,
            'success',
            `${added_business_ids.length} businesses were added`,
            2000);

          self.businesses_selected = [];
        } else {
          self.callAlert.handler(self, 'warning', `Can't add businesses`, 2000);
        }
      }
    );
  }

  openBusinesses(business: StandardizedBusiness) {
    const self = this;
    self.standBusinessSrv.ownBusinesses(business.id)
      .then(data => {
        if (data['businesses']) {
          self.detailedBusiness = business;
          self.own_businesses = data['businesses'];
          self.showBusinessesList = true;
        } else {
          self.callAlert.handler(self, 'warning', `Can't load data`, 2000);
        }
      });
  }

  hideOwnBusinesses() {
    const self = this;
    self.own_businesses = undefined;
    self.detailedBusiness = undefined;
  }

  removeFromStBusiness(business: Businesses, index: number) {
    const self = this;

    self.standBusinessSrv.removeOwnBusiness(self.detailedBusiness.id, business.id)
      .then(data => {
        if (data['business']) {
          self.own_businesses.splice(index, 1);

          self.businesses.unshift(business);
          self.searchBusinessClause ? self.searchBusinesses(self.searchBusinessClause) :
            self.searched_businesses = JSON.parse(JSON.stringify(self.businesses));
        } else {
          self.callAlert.handler(self, 'warning', `Can't remove business`, 2000);
        }
      });
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
            if (response['message']) {}

            console.log(response);
            setTimeout(() => {
              self.upload_file = null;
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
