import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { BillingInfo } from '../super-admin-account-info.component';
import {TextFieldComponentComponent} from '../../text-field-component/text-field-component.component';

@Component({
  selector: 'app-aqis-super-admin-billing-info',
  templateUrl: './super-admin-billing-info.component.html',
  styleUrls: ['./super-admin-billing-info.component.scss']
})
export class SuperAdminBillingInfoComponent implements OnInit {

  green_highlight = false;
  red_highlight = false;

  @Input() billing_info: BillingInfo;
  @Output() onBlur:  EventEmitter<object> = new EventEmitter<object>();
  @ViewChild(TextFieldComponentComponent, { static: true }) inputText: TextFieldComponentComponent;

  constructor() { }

  ngOnInit() {
  }

  save(event) {
    const self = this;
    self.onBlur.emit(event);
  }

  ifSuccessUpdate() {
    this.green_highlight = true;
    setTimeout(() => { this.green_highlight = false; }, 2000);
  }

  ifFailUpdate() {
    this.red_highlight = true;
    setTimeout(() => { this.red_highlight = false; }, 2000);
  }


}
