import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-aqis-daily-reports-filters',
  templateUrl: './daily-reports-filters.component.html',
  styleUrls: ['./daily-reports-filters.component.scss']
})
export class DailyReportsFiltersComponent implements OnInit {

  @Input() dropdownItems: object[];
  @Input() items: any[];
  @Input() dropdownItemName: string;
  @Input() showDropdown: boolean;
  // tslint:disable-next-line:no-output-on-prefix
  @Output()onSearchItem: EventEmitter<object> = new EventEmitter<object>();
  selectedDropdownItem: string;
  searchName: string;

  constructor() { }

  ngOnInit() {
  }

  searchStep() {
    const self = this;
    let isIncludesName = true;
    let isIncludesDropdownItem = true;
    let searched_items: any[];

    searched_items = self.items.filter(step => {
      isIncludesName = self.searchName ? step.name.toLowerCase().includes(self.searchName.toLowerCase()) : true;
      isIncludesDropdownItem = self.selectedDropdownItem ? step[self.dropdownItemName] === self.selectedDropdownItem : true;
      return isIncludesName && isIncludesDropdownItem;
    });
    self.onSearchItem.emit({ searched_items: searched_items });
  }
}
