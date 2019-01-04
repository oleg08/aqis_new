import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-alert-closeable',
  templateUrl: './alert-closeable.component.html',
  styleUrls: ['./alert-closeable.component.scss']
})
export class AlertCloseableComponent implements OnInit {

  public alerts: Array<IAlert> = [];
  @Input() type: string;
  @Input() message: string;

  @Output() alertFalse: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.alerts.push({
      type: this.type,
      message: this.message
    });
  }

  public closeAlert() {
    this.alertFalse.emit(false);
  }

}

export interface IAlert {
  type: string;
  message: string;
}
