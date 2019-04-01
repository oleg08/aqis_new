import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InvoiceType} from '../../interfaces/invoice-type';
import { InvoiceTypesPeriodsDataService } from '../invoice-types-periods-data.service';
import {InvoicePeriod} from '../new-invoice-type/new-invoice-type.component';

@Component({
  selector: 'app-aqis-invoice-type-edit',
  templateUrl: './invoice-type-edit.component.html',
  styleUrls: ['./invoice-type-edit.component.scss'],
  providers: [InvoiceTypesPeriodsDataService]
})
export class InvoiceTypeEditComponent implements OnInit {

  periods: InvoicePeriod[];
  discount_signs: InvoicePeriod[];
  @Input() invoice_type: InvoiceType;
  @Output() onValueChanged:  EventEmitter<object> = new EventEmitter<object>();

  constructor(private periodsData: InvoiceTypesPeriodsDataService) { }

  ngOnInit() {
    const self = this;
    self.periods = self.periodsData.getPeriods();
    self.discount_signs = self.periodsData.getDiscountSigns();
  }

  changeValue(data) {
    this.onValueChanged.emit(data);
  }

  changePeriod (val) {
    this.onValueChanged.emit({ field_name: 'period', value: val });
  }

  changeDiscountSign (val) {
    this.onValueChanged.emit({ field_name: 'discount_sign', value: val });
  }

}
