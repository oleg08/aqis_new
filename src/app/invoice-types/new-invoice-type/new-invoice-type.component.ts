import {Component, EventEmitter, OnInit, Output} from '@angular/core';

export interface InvoicePeriod {
  id?: number;
  label?: string;
}

@Component({
  selector: 'app-aqis-new-invoice-type',
  templateUrl: './new-invoice-type.component.html',
  styleUrls: ['./new-invoice-type.component.scss']
})
export class NewInvoiceTypeComponent implements OnInit {

  newName: string;
  selectedPeriod = 0;
  @Output() createNew:  EventEmitter<object> = new EventEmitter<object>();
  periods: InvoicePeriod[] = [
    {id: 0, label: 'Two Weeks'},
    {id: 1, label: 'One Month'}
  ];

  constructor() { }

  ngOnInit() {
  }

  create () {
    this.createNew.emit({ name: this.newName, period: this.selectedPeriod });
    this.newName = null;
    this.selectedPeriod = 0;
  }

}
