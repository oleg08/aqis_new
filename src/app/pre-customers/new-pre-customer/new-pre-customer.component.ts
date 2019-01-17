import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../interfaces/project';
import { PreCustomer } from '../../interfaces/pre-customer';

@Component({
  selector: 'app-aqis-new-pre-customer',
  templateUrl: './new-pre-customer.component.html',
  styleUrls: ['./new-pre-customer.component.scss']
})
export class NewPreCustomerComponent implements OnInit {

  dropdown_items:   object[] = [];
  selectedProject:  object;

  @Input() selectedPreCustomer: PreCustomer;
  @Input() projects: Project[];
  @Output() addPreCustomer: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
    const self = this;

    self.projects.forEach(pr => {
      const item = {
        value: pr.id,
        label: pr.name
      };
      self.dropdown_items.push(item);
    });
    self.selectedPreCustomer.project_object = self.dropdown_items[0];
  }

  createPreCustomer (event) {
    const self = this;
    const obj: PreCustomer = event.form.value;
    if (!obj.uid) {
      obj.uid = obj.zip + obj.name;
      self.selectedPreCustomer.uid = obj.uid;
    }
    obj.project_object = self.selectedPreCustomer.project_object;
    self.addPreCustomer.emit(obj);
  }

  setPristine (model) {
    model.control.markAsPristine();
  }

}
