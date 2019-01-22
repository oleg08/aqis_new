import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Message         } from 'primeng/primeng';
import { MessageService  } from 'primeng/components/common/messageservice';
import { ShareAddressService } from '../services/share-address.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss'],
  providers: [
    MessageService
  ]
})
export class AddressListComponent implements OnInit {

  msgs: Message[] = [];
  init_value: string;

  addresses: Array<object>;

  @Output () updateAddress: EventEmitter<object> = new EventEmitter<object>();
  @Output () deleteAddress: EventEmitter<object> = new EventEmitter<object>();

  constructor(private messageService: MessageService,
              private addresses_data: ShareAddressService) { }

  ngOnInit() {
    const self = this;
    self.addresses_data.currentAddresses.subscribe(addresses => self.addresses = addresses);
  }

  initEdit(event) {
    const self = this;
    self.init_value = JSON.parse(JSON.stringify(event.data.city_address));
  }

  editAddress (event) {
    const self = this;

    const existing_address = self.addresses.find(item =>
      (item['city_address'] === event.data.city_address && item['id'] !== event.data.id));
    if (existing_address) {
      self.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'This Address already exists'});
      event.data.city_address = JSON.parse(JSON.stringify(self.init_value));
      return;
    }

    const id = event.data.id;
    const field = event.column.field;
    const params = {
      id: id,
      update: {
        [field]: event.data[field]
      },
      previous_address: self.init_value
    };
    self.updateAddress.emit(params);
  }

  removeAddress (event, address) {
    const self = this;
    self.deleteAddress.emit(address);
  }

}
