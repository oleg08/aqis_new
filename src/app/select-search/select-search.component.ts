import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AssignOriginalValueService } from '../services/assign-original-value.service';
import { ShareBusinessesService } from '../services/share-businesses.service';

@Component({
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss'],
  providers: [
    AssignOriginalValueService
  ]
})
export class SelectSearchComponent implements OnInit {

  selectedObject: string = null;

  @Input() array:              Array<object>;
  @Input() field_name:         string;
  @Input() filter_by:          string;
  @Input() label:              string;
  @Input() placeholder:        string;
  @Input() filter_placeholder: string;

  @Output() valueChanged: EventEmitter<object> = new EventEmitter<object>();

  constructor(private assignOriginalValue: AssignOriginalValueService,
              private shareBusinesses: ShareBusinessesService) { }

  ngOnInit() {
    const self = this;
    this.shareBusinesses.currentBusinesses.subscribe(businesses => self.array = businesses);
  }

  selectObject(event) {
    const self = this;
    self.valueChanged.emit({
      value: event.value
    });
    setTimeout(() => {
      self.selectedObject = undefined;
    }, 500);
  }

}
