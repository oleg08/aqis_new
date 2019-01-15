import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AssignOriginalValueService } from '../services/assign-original-value.service';
import { Persons } from '../interfaces/persons';

@Component({
  selector: 'app-aqis-tripple-field',
  templateUrl: './tripple-field.component.html',
  styleUrls: ['./tripple-field.component.scss'],
  providers: [
    AssignOriginalValueService
  ]
})
export class TrippleFieldComponent implements OnInit {

  originalValue: object;

  @Input() selectedPerson: Persons;
  @Output() savePerson: EventEmitter<object> = new EventEmitter<object>();
  constructor(private assignOriginalValue: AssignOriginalValueService) { }

  ngOnInit() {
  }

  editPerson(data) {
    const self = this;
    self.savePerson.emit(self.selectedPerson);
  }

}
