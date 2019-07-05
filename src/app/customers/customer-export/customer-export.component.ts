import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CallAlertService } from '../../services/call-alert.service';
import { ShareCustomersIdsService } from '../../services/share-customers-ids.service';
import { Event } from '../../interfaces/event';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-customer-export',
  templateUrl: './customer-export.component.html',
  styleUrls: ['./customer-export.component.scss'],
  providers: [
    CallAlertService
  ]
})
export class CustomerExportComponent implements OnInit {

  events:         Event[] = null;
  selectedEvents: Event[];
  customers:      Array<object> = null;
  selectedCustomers: Array<object>;
  alert = false;
  alertType: string;
  alertMessage: string;
  cols: any[];

  constructor(private http:      HttpClient,
              private router:    Router,
              private route:     ActivatedRoute,
              private callAlert: CallAlertService,
              private shareCustomersIds:  ShareCustomersIdsService) { }

  ngOnInit() {
    const self = this;
    let customers_ids: string[];

    this.cols = [
      { field: 'uid', header: 'UID' },
      { field: 'customer_name', header: 'Company' },
      { field: 'date', header: 'Date' },
      { field: 'time', header: 'Time' },
      { field: 'duration', header: 'Duration' },
      { field: 'status', header: 'Status' },
      { field: 'description', header: 'Description' },
    ];

    self.shareCustomersIds.currentCustomersIds.subscribe(cus_ids => { customers_ids = cus_ids; });

    self.http.post(`${environment.serverUrl}/events_export.json`, { customers_ids: customers_ids }
    ).subscribe(
      (response) => {
        if (response['events']) {
          const response_events = response['events'];
          response_events.forEach((event) => {
            let min;
            if (event.start_time_min === 0) {
              min = '00';
            } else {
              min = String(event.start_time_min);
            }
            event.time = String(event.start_time_hours) + ' : ' + min;
          });

          const sorted_events: Event[] = response_events.sort((event1, event2) => {
            if (event1.customer_id > event2.customer_id) {
              return 1;
            }
            if (event1.customer_id < event2.customer_id) {
              return -1;
            }
            if (event1.customer_id === event2.customer_id) {
              if (event1.date > event2.date) {
                return 1;
              }
              if (event1.date < event2.date) {
                return -1;
              }
              if (event1.date === event2.date) {
                if (event1.time > event2.time) {
                  return 1;
                }
                if (event1.time < event2.time) {
                  return -1;
                }
              }
            }
            return 0;
          });
          self.events = sorted_events;
        } else if (response['customers']) {
          self.customers = response['customers'];
        } else {
          self.callAlert.handler(self, 'warning', `Can't load data`, 2000);
        }
      },
      (response) => {
        self.callAlert.handler(self, 'warning', `Can't load data`, 2000);
        console.log(response);
      }
    );
  }
}
