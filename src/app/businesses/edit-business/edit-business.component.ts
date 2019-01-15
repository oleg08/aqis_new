import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { PassBusinessService } from '../../services/pass-business.service';

@Component({
  selector: 'app-aqis-edit-business',
  templateUrl: './edit-business.component.html',
  styleUrls: ['./edit-business.component.scss']
})
export class EditBusinessComponent implements OnInit {

  initial_value: object;
  @Input() item: object;
  @Input() field: string;
  @Output() saveItem: EventEmitter<object> = new EventEmitter<object>();

  constructor(private passBusiness:   PassBusinessService) { }

  ngOnInit() {
    this.passBusiness.currentBusiness.subscribe(val => this.initial_value = val);
  }

  save(value) {
    const self = this;
    self.saveItem.emit({ id: self.item['id'], value: value, business_domain_id: self.initial_value['business_domain_id'] });
  }

}
