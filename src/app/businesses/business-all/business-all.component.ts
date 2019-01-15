import { Component, OnInit, Renderer2, ElementRef, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FlashHighlightsService } from '../../services/flash-highlights.service';
import { Message        } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { BusinessDomain } from '../../interfaces/business-domain';
import { Businesses } from '../../interfaces/businesses';
import { animate, style, transition, trigger } from '@angular/animations';
import { DragulaService } from 'ng2-dragula';
import { Subscription   } from 'rxjs';
import { PassBusinessService } from '../../services/pass-business.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-business-all',
  templateUrl: './business-all.component.html',
  styleUrls: ['./business-all.component.scss'],
  providers: [
    FlashHighlightsService,
    MessageService
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('1s ease-out', style({ opacity: '1' })),
      ]),
    ]),
    trigger('fadeOut', [
      transition(':leave', [
        style({ opacity: '1' }),
        animate('1s ease-out', style({ opacity: '0' })),
      ]),
    ]),
  ]
})
export class BusinessAllComponent implements OnInit {

  business_domains: BusinessDomain[];
  businesses: Businesses[];
  new_business_domain = '';
  originalValue: string;
  msgs: Message[] = [];
  cols: any[];
  super_admin: boolean;
  repeat_business_domain = false;
  edit_business_domain = false;
  access_edit = false;
  selectedItem: BusinessDomain = {};
  selectedField: string;
  originalItem: BusinessDomain = {};
  subs = new Subscription();
  leftDomains: BusinessDomain[] = [];
  rightDomains: BusinessDomain[] = [];

  @ViewChild('BusinessAllList') el: ElementRef;

  constructor(private http: HttpClient,
              private router: Router,
              private flashHighlights: FlashHighlightsService,
              private rd: Renderer2,
              private messageService: MessageService,
              private passBusiness:   PassBusinessService,
              private dragulaService: DragulaService
  ) {
    this.subs.add(this.dragulaService.drop('DRAGULA_FACTS')
      .subscribe(({ name, el, target, source, sibling }) => {
        this.dragBusinesses(name, el, target, source, sibling);
      })
    );
  }

  ngOnInit() {
    const self = this;

    self.http.get(environment.serverUrl + '/business_domains.json'
    ).subscribe(
      response => {
        if (response['business_domains']) {
          self.business_domains = response['business_domains'];
          const len: number = self.business_domains.length;
          self.super_admin = response['super_admin'];
          self.business_domains.forEach(bd => {
            bd.new_business = '';
            bd.searchTerm = '';
            bd.copy_businesses = JSON.parse(JSON.stringify(bd.businesses));

            if (self.business_domains.indexOf(bd) <= len / 2 ) self.leftDomains.push(bd);
            else self.rightDomains.push(bd);
          });
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
      }
    );
  }

  ngOnDestroy() {
    // destroy all the subscriptions at once
    this.subs.unsubscribe();
  }

  createBusinessDomain() {
    const self = this;
    if (!self.super_admin) { return; }
    if (self.business_domains.find(bd => bd.label === self.new_business_domain)) {
      self.repeat_business_domain = true;
      return;
    }
    const business_domains: BusinessDomain[] = [...self.business_domains];
    const rightDomains: BusinessDomain[] = [...self.rightDomains];
    const new_business_domain: BusinessDomain = { label: self.new_business_domain, businesses: [], new_business: '' };

    self.http.post(environment.serverUrl + '/business_domains.json', new_business_domain
    ).subscribe(
      response => {
        if (response['business_domain']) {
          new_business_domain.id = response['business_domain']['id'];
          business_domains.push(new_business_domain);
          rightDomains.push(new_business_domain);
          self.business_domains = business_domains;
          self.rightDomains = rightDomains;
          self.new_business_domain = '';
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create group`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create group`});
      }
    );
  }

  showBusiness(item: BusinessDomain, field, b_domain_id) {
    const self = this;
    if (!self.super_admin) { return; }
    self.selectedItem = item;
    self.selectedField = field;
    const obj = { value: item[field] };
    if (field === 'description') { obj['business_domain_id'] = b_domain_id; }
    self.passBusiness.changeBusiness(obj);
    self.originalItem = JSON.parse(JSON.stringify(item));
    self.edit_business_domain = true;
  }

  cancelEditBDomain () {
    const self = this;
    if (!self.access_edit) { self.selectedItem[self.selectedField] = JSON.parse(JSON.stringify(self.originalItem[self.selectedField])); }
    self.access_edit = false;
  }

  repeatDescAllDomians (business_domains, b_domain) {
    const self = this;
    let repeat = false;
    const break_exception = {};
    const description: string = b_domain.new_business.toLowerCase();
    try {
      business_domains.forEach(bd => {

        bd.businesses.forEach(b => {
          if (description === b.description.toLowerCase()) {
            if (b.business_domain_ids.indexOf(b_domain.id) !== -1) {
              self.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Business already exists'});
              repeat = true;
              throw break_exception;
            } else {
              b.domain_names.push(b_domain.label);
              b.business_domain_ids.push(b_domain.id);
            }
          }
        });
      });
    } catch (e) {
      if (e !== break_exception) { throw e; }
    }
    return repeat;
  }

  repeatDescOneDomain(b_domain: BusinessDomain, desc, business_id) {
    const self = this;
    let repeat = false;
    const break_exception = {};
    const description: string = desc.toLowerCase();

    try {
      b_domain.businesses.forEach(b => {
        if (b.id !== business_id && b.description.toLowerCase() === description) {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Business already exists'});
          repeat = true;
          throw break_exception;
        }
      });
    } catch (e) {
      if (e !== break_exception) { throw e; }
    }
    return repeat;
  }

  changeDomainNameForBsns (value, b_domain_id) {
    const self = this;
    self.business_domains.forEach(bd => {
      bd.businesses.forEach(b => {
        const index: number = b.business_domain_ids.indexOf(b_domain_id);
        if (index !== -1) { b.domain_names[index] = value; }
      });
    });
  }

  save(item) {
    const self = this;
    if (!self.super_admin) { return; }

    if (self.selectedField === 'label') {

      // check uniqueness
      const break_exception = {};
      let repeat = false;
      self.business_domains.forEach(bd => {
        try {
          if (bd.id !== item.id && bd.label.toLowerCase() === item.value.toLowerCase()) {
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Business-Domain already exists`});
            repeat = true;
            throw break_exception;
          }
        } catch (e) {
          if (e !== break_exception) { throw e; }
        }
      });

      if (repeat) { return; }

      self.http.patch(environment.serverUrl + '/business_domains/' + item.id + '.json', { label: item.value }
      ).subscribe(
        response => {
          if (response['business_domain']) {

            // edit the business-domain's name for all businesses
            self.changeDomainNameForBsns(item.value, item.id);

            self.flashHighlights.handler(self, '#b_domain-', String(item.id), 'success-updated');
          } else {
            self.cancelEditBDomain();
            self.flashHighlights.handler(self, '#b_domain-', String(item.id), 'failed-update');
          }
        },
        response => {
          self.cancelEditBDomain();
          self.flashHighlights.handler(self, '#b_domain-', String(item.id), 'failed-update');
        }
      );
    }

    if (self.selectedField === 'description') {
      const b_domain = self.business_domains.find(bd => bd.id === item.business_domain_id);

      if (self.repeatDescOneDomain(b_domain, item.value, item.id)) { return; }

      self.http.patch(environment.serverUrl + '/businesses/' + item.id + '.json', { description: item.value }
      ).subscribe(
        response => {
          if (response['business']) {
            // edit businesses from others domains
            self.business_domains.forEach(bd => {
              if (bd.id !== item.business_domain_id) {
                const bsn: Businesses = bd.businesses.find(b => b.id === item.id);
                if (bsn) { bsn.description = response['business']['description']; }
              }
            });

            self.flashHighlights.handler(self, '#business-', String(item.id), 'success-updated');
          } else {
            self.flashHighlights.handler(self, '#business-', String(item.id), 'failed-update');
          }
        },
        response => {
          self.flashHighlights.handler(self, '#business-', String(item.id), 'failed-update');
        }
      );
    }
    self.edit_business_domain = false;
    self.access_edit = true;
  }

  removeDomainFromBusiness(business_domain: BusinessDomain, business_id, removing_domain) {
    const break_exception = {};
    try {
      business_domain.businesses.forEach(b => {
        if (b.id === business_id) {
          b.domain_names.splice(b.domain_names.indexOf(removing_domain.label), 1);
          b.business_domain_ids.splice(b.business_domain_ids.indexOf(removing_domain.id), 1);
          throw break_exception;
        }
      });
    } catch (e) {
      if (e !== break_exception) { throw e; }
    }
  }

  dragBusinesses(name, el, target, source, sibling) {
    const self = this;
    const giving_domain_id: number = Number(source['id'].split('-')[1]);
    const receiving_domain_id: number = Number(target['id'].split('-')[1]);
    const dragged_business_id: number = Number(el.firstChild['id'].split('-')[1]);
    const giving_domain: BusinessDomain = self.business_domains.find(bd => bd.id === giving_domain_id);
    const receiving_domain: BusinessDomain = self.business_domains.find(bd => bd.id === receiving_domain_id);
    let dragged_business: Businesses;

    const same_businesses: Businesses[] = receiving_domain.businesses.filter(b =>  b.id === dragged_business_id );
    if (same_businesses.length > 1) {
      const ind = receiving_domain.businesses.indexOf(receiving_domain.businesses.find(b => b.id === dragged_business_id));
      receiving_domain.businesses.splice(ind, 1);
      self.business_domains.forEach(bd => {
        self.removeDomainFromBusiness(bd, dragged_business_id, giving_domain);
      });
    }
    dragged_business = same_businesses[0];

    if (dragged_business) {
      self.http.patch(environment.serverUrl + '/drag_business/' + dragged_business_id + '.json',
        { giving_domain_id: giving_domain_id, receiving_domain_id: receiving_domain_id }
      ).subscribe(
        response => {
          if (response['business']) {
            self.messageService.add({severity: 'success', summary: 'Success', detail: 'Business moved'});
            dragged_business.domain_names.splice(dragged_business.domain_names.indexOf(giving_domain.label), 1);
            dragged_business.business_domain_ids.splice(dragged_business.business_domain_ids.indexOf(giving_domain_id), 1);
            dragged_business.domain_names.push(receiving_domain.label);
            dragged_business.business_domain_ids.push(receiving_domain_id);

            self.business_domains.forEach((bd => {
              if (bd.id !== giving_domain_id && bd.id !== receiving_domain_id) {
                for (const bsn in bd.businesses) {
                  if (bsn['id'] === dragged_business_id) {
                    bsn['domain_names'].splice(bsn['domain_names'].indexOf(giving_domain.label), 1);
                    bsn['business_domain_ids'].splice(bsn['business_domain_ids'].indexOf(giving_domain_id), 1);
                    break;
                  }
                }
              }
            }));
          } else {
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't move business`});
          }
        },
        response => {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't move business`});
        }
      );
    }
  }

  removeBusinessDomain(id) {
    const self = this;
    if (!self.super_admin) { return; }
    let business_domains: BusinessDomain[] = [...self.business_domains];
    let rightDomains: BusinessDomain[] = [...self.rightDomains];
    let leftDomains: BusinessDomain[] = [...self.leftDomains];
    self.http.delete(environment.serverUrl + '/business_domains/' + id + '.json'
    ).subscribe(
      response => {
        if (response['business_domain_id']) {
          business_domains = business_domains.filter(bd => bd.id !== id);
          rightDomains = rightDomains.filter(bd => bd.id !== id);
          leftDomains = leftDomains.filter(bd => bd.id !== id);
          self.business_domains = business_domains;
          self.rightDomains = rightDomains;
          self.leftDomains = leftDomains;
          self.messageService.add({severity: 'success', summary: 'Success', detail: `Group successfully deleted`});
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete group`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete group`});
      }
    );
  }

  removeBusiness(b_domain: BusinessDomain, business_id) {
    const self = this;

    if (!self.super_admin) { return; }

    self.http.post(environment.serverUrl + '/destroy_business/' + business_id + '.json', { business_domain_id: b_domain.id }
    ).subscribe(
      response => {
        if (response['business_id']) {
          b_domain.businesses = b_domain.businesses.filter(b => b.id !== business_id);

          self.business_domains.forEach(bd => {
            self.removeDomainFromBusiness(bd, business_id, b_domain);
          });

          self.messageService.add({severity: 'success', summary: 'Success', detail: `Business successfully deleted`});
        } else if (response['customers_not_empty']) {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete Business. It belongs to customers`});
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete Business.`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete Business.`});
      }
    );
  }

  createBusiness (b_domain: BusinessDomain) {
    const self = this;

    if (!self.super_admin) { return; }
    let business: Businesses;

    if (self.repeatDescAllDomians(self.business_domains, b_domain)) { return; }
    business = { description: b_domain.new_business, business_domain_id: b_domain.id };

    self.http.post(environment.serverUrl + '/businesses.json', business
    ).subscribe(
      (response) => {
        if (response['business']) {

          business.id = response['business']['id'];
          business.description = response['business']['description'];
          business.business_domain_ids = response['business']['business_domain_ids'];
          business.domain_names = response['business']['domain_names'];
          business.customers_number = response['business']['customers_number'];
          b_domain.businesses.unshift(business);
          b_domain.new_business = '';

          self.messageService.add({severity: 'info', summary: 'Success', detail: 'Business successfully created'});
        } else if (response['message'] === 'Validation failed: Description has already been taken') {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Business already exists`});
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Business`});
        }
      },
      (response) => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create Business`});
      }
    );
  }

  search(business_domain: BusinessDomain): void {
    const self = this;
    const term = business_domain.searchTerm.toLowerCase();
    business_domain.businesses = business_domain.copy_businesses.filter( b => {
      return b.description.toLowerCase().indexOf(term) >= 0;
    });
  }

}
