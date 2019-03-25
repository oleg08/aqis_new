import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-aqis-super-admin-information',
  templateUrl: './super-admin-information.component.html',
  styleUrls: ['./super-admin-information.component.scss']
})
export class SuperAdminInformationComponent implements OnInit {

  green_highlight = false;
  red_highlight = false;

  @Input() user: User;
  @Output() onBlur:  EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
  }

  save(data) {
    this.onBlur.emit(data);
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
