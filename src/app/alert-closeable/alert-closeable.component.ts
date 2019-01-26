import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-alert-closeable',
  templateUrl: './alert-closeable.component.html',
  styleUrls: ['./alert-closeable.component.scss']
})
export class AlertCloseableComponent implements OnInit {

  public alerts: Array<IAlert> = [];
  @Input() type: string;
  @Input() message: string;
  @Input() url: string;
  @Input() return_to_url: string;
  @Input() current_user_id: string;

  @Output() alertFalse: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('hidden_form') el: ElementRef;

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

  redirectTo() {
    this.el.nativeElement.submit();
  }

}

export interface IAlert {
  type: string;
  message: string;
}
