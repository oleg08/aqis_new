import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { InvoiceTypesPeriodsDataService } from '../invoice-types-periods-data.service';

export interface InvoicePeriod {
  id?: number;
  label?: string;
}

@Component({
  selector: 'app-aqis-new-invoice-type',
  templateUrl: './new-invoice-type.component.html',
  styleUrls: ['./new-invoice-type.component.scss'],
  providers: [InvoiceTypesPeriodsDataService]
})
export class NewInvoiceTypeComponent implements OnInit {

  newName: string;
  selectedPeriod = 0;
  @Output() createNew:  EventEmitter<object> = new EventEmitter<object>();
  periods: InvoicePeriod[];

  constructor(private periodsData: InvoiceTypesPeriodsDataService) { }

  ngOnInit() {
    const self = this;
    self.periods = self.periodsData.getPeriods();
  }

  create () {
    this.createNew.emit({ name: this.newName, period: this.selectedPeriod });
    this.newName = null;
    this.selectedPeriod = 0;
  }

}
