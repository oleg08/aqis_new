import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AssignOriginalValueService } from '../services/assign-original-value.service';

@Component({
  selector: 'app-bind-select',
  templateUrl: './bind-select.component.html',
  styleUrls: ['./bind-select.component.scss'],
  providers: [
    AssignOriginalValueService
  ]
})
export class BindSelectComponent implements OnInit {

  originalValue: object;
  selectedCategory: object;
  selectedStatus: object;

  @Input() object: object;
  @Input() field_name: string;
  @Input() items: Array<object>;
  @Input() label: string;
  @Output() valueChanged: EventEmitter<object> = new EventEmitter<object>();

  constructor(private assignOriginalValue: AssignOriginalValueService) { }

  ngOnInit() {
    const self = this;
    const value = this.object[this.field_name];
    self.items.forEach(item => {
      item['statuses'].forEach(status => {
        if (status.value === value) {
          self.selectedStatus    = status;
          self.selectedCategory  = item;
        }
      });
    });

    self.originalValue = self.assignOriginalValue.handler(self.object, self.field_name);
  }

  changeEvent (value) {
    const self = this;
    self.valueChanged.emit({
      field_name:    self.field_name,
      value:         value,
      originalValue: self.originalValue
    });
  }

  changeStatus (status) {
    const self = this;
    self.selectedStatus = status.statuses[0];
    self.changeEvent(status.statuses[0].value);
  }

  save (model) {
    const self = this;
    self.changeEvent(model.viewModel.value);
  }

}
