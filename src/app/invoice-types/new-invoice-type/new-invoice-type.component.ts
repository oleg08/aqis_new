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
  newStartIdentifier: string;
  newNameInvalid = false;
  newStartIdentifierInvalid = false;
  selectedPeriod = 0;
  @Output() createNew:  EventEmitter<object> = new EventEmitter<object>();
  periods: InvoicePeriod[];

  constructor(private periodsData: InvoiceTypesPeriodsDataService) { }

  ngOnInit() {
    const self = this;
    self.periods = self.periodsData.getPeriods();
  }

  create () {
    this.createNew.emit({ name: this.newName, start_identifier: this.newStartIdentifier, period: this.selectedPeriod });
    this.newName = null;
    this.newStartIdentifier = null;
    this.selectedPeriod = 0;
  }

  onNameChange() {
    this.newNameInvalid = !this.newName;
  }

  onStartIdentifierChange() {
    this.newStartIdentifierInvalid = !this.newStartIdentifier;
  }

}
