import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AssistantInvoice} from '../../../interfaces/assistant-invoice';

@Component({
  selector: 'app-aqis-assistant-invoices-search',
  templateUrl: './assistant-invoices-search.component.html',
  styleUrls: ['./assistant-invoices-search.component.scss']
})
export class AssistantInvoicesSearchComponent implements OnInit {

  rangeDates: Date[];
  search_identifier: string;
  @Input()assistant_invoices: AssistantInvoice[];
  @Output()onSearchIdentifier: EventEmitter<object> = new EventEmitter<object>();
  @Output()onSearchCreated: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
  }

  searchInvoices() {
    const self = this;
    let created_search = true;
    let identifier_search = true;
    let searchedList: AssistantInvoice[];
    let date1: Date = self.rangeDates && self.rangeDates[0] ? self.rangeDates[0] : null;
    let date2: Date = self.rangeDates && self.rangeDates[1] ? self.rangeDates[1] : null;
    date1 = date1 ? new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) : null;
    date2 = date2 ? new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()) : null;
    searchedList = self.assistant_invoices.filter(
      ass_inv => {
        let created: Date;
        if (date1 && date2) {
          created = new Date(ass_inv.created_at);
          created = new Date(created.getFullYear(), created.getMonth(), created.getDate());
          created_search = created >= date1 && created <= date2;
        } else {
          created_search = true;
        }
        identifier_search = self.search_identifier ? ass_inv.identifier.toLowerCase().includes(self.search_identifier.toLowerCase()) : true;
        return created_search && identifier_search;
      }
    );
    self.onSearchCreated.emit({ searched_invoices: searchedList });
  }

  clearCalendar() {
    const self = this;
    self.rangeDates = null;
    let searchedList: AssistantInvoice[];
    let identifier_search = true;
    searchedList = self.assistant_invoices.filter(
      ass_inv => {
        if (self.search_identifier) {
          identifier_search = ass_inv.identifier.toLowerCase().includes(self.search_identifier.toLowerCase());
        }
        return identifier_search;
      });
    self.onSearchCreated.emit({ searched_invoices: searchedList });
  }

}
