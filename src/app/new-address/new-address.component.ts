import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-aqis-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.scss']
})
export class NewAddressComponent implements OnInit {

  new_city_address: string = null;

  @Input() placeholder: string;
  @Output() addAddress: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
  }

  createAddress (event) {
    const self = this;
    self.addAddress.emit(event.form.value);
    self.new_city_address = null;
  }

  setPristine (model) {
    model.control.markAsPristine();
  }

}
