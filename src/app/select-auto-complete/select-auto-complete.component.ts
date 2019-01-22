import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AssignOriginalValueService } from '../services/assign-original-value.service';

@Component({
  selector: 'app-aqis-select-auto-complete',
  templateUrl: './select-auto-complete.component.html',
  styleUrls: ['./select-auto-complete.component.scss'],
  providers: [AssignOriginalValueService]
})
export class SelectAutoCompleteComponent implements OnInit {

  originalValue: object;
  filteredAddresses: Array<object>;

  @Input () addresses:     Array<object>;
  @Input () address:       string;
  @Input () field_name_1:  string;
  @Input () field_name_2:  string;
  @Input () label:         string;
  @Output () valueChanged: EventEmitter<object> = new EventEmitter<object>();
  @Output() focusInput: EventEmitter<object> = new EventEmitter<object>();
  @Output() focusOutInput: EventEmitter<object> = new EventEmitter<object>();

  constructor(private assignOriginalValue: AssignOriginalValueService) { }

  ngOnInit() {
    const self = this;
    if (!self.address) {
      self.address = null;
    } else {
      const address = self.addresses.find(item => item[self.field_name_2] === self.address);
      self.originalValue = self.assignOriginalValue.handler(address, self.field_name_2);
    }
  }

  focus() {
    this.focusInput.emit();
  }

  focusOut() {
    this.focusOutInput.emit();
  }

  filterAddresses (event) {
    const self = this;
    self.filteredAddresses = [];
    for (let i = 0; i < self.addresses.length; i++) {
      const address = self.addresses[i];
      if (address[self.field_name_2].toLowerCase().indexOf(event.query.toLocaleLowerCase()) === 0) {
        self.filteredAddresses.push(address[self.field_name_2]);
      }
    }
  }

  selectAddress (address?) {
    const self = this;
    let selected_address: object;
    if (address) {
      selected_address = self.addresses.find(item => item[self.field_name_2] === address);
    }

    const update: object = {
      originalValue: self.originalValue
    };

    if (selected_address) {
      update['address'] = selected_address;

      if (selected_address['id']) {
        update['field_name'] = self.field_name_1;
        update['value'] = selected_address['id'];
      } else {
        update['field_name'] = self.field_name_2;
        update['value'] = address;
      }

    } else {
      update['field_name'] = self.field_name_1;
      update['value']   = null;
      update['address'] = null;
    }

    if (self.originalValue !== address) {
      self.valueChanged.emit(update);
      self.originalValue = address;
    }
  }

}
