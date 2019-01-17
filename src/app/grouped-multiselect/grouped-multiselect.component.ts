import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { AssignOriginalValueService } from '../services/assign-original-value.service';
import { Observable, of } from 'rxjs';

import { Businesses } from '../interfaces/businesses';
import { BusinessDomain } from '../interfaces/business-domain';

@Component({
  selector: 'app-grouped-multiselect',
  templateUrl: './grouped-multiselect.component.html',
  styleUrls: ['./grouped-multiselect.component.scss'],
  providers: [
    AssignOriginalValueService
  ]
})
export class GroupedMultiselectComponent implements OnInit {
  selectedObject: string = null;
  items: Observable<any[]>;
  prevBusinesses: Businesses[];

  @Input() businesses:          Businesses[];
  @Input() business_domains:    BusinessDomain[];
  @Input() selectedBusinesses:  Businesses[];
  @Input() field_name:          string;
  @Input() filter_by:           string;
  @Input() label:               string;
  @Input() placeholder:         string;
  @Input() filter_placeholder:  string;
  @Input() addTag:  boolean;

  @Output() addBusiness: EventEmitter<object> = new EventEmitter<object>();
  @Output() subtractBusiness: EventEmitter<object> = new EventEmitter<object>();
  @Output() clearBusinesses: EventEmitter<object> = new EventEmitter<object>();
  @Output() focusInput: EventEmitter<object> = new EventEmitter<object>();
  @Output() focusOutInput: EventEmitter<object> = new EventEmitter<object>();

  accounts: any;
  selectedAccountsFn = (item, selected) => {
    if (selected.business_domain && item.business_domain) {
      return item.business_domain === selected.business_domain;
    }
    if (item.description && selected.description) {
      return item.description === selected.description;
    }
    return false;
  }

  constructor(private assignOriginalValue: AssignOriginalValueService) { }

  ngOnInit() {
    const self = this;
    self.prevBusinesses = JSON.parse(JSON.stringify(self.selectedBusinesses));
    self.accounts = self.businesses.slice();
  }

  add(business) {
    const self = this;
    self.addBusiness.emit(business);
  }

  remove(business) {
    const self = this;
    self.subtractBusiness.emit({ business: business });
  }

  clear() {
    const self = this;
    self.clearBusinesses.emit();
  }

  focus() {
    this.focusInput.emit();
  }

  focusOut() {
    this.focusOutInput.emit();
  }

}
