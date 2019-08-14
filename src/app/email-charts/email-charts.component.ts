import {Component, OnInit, ViewChild} from '@angular/core';
import { EmailResponsesService } from './email-responses.service';
import { EmailResponses } from './email-responses';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Table} from 'primeng/table';

@Component({
  selector: 'app-email-charts',
  templateUrl: './email-charts.component.html',
  styleUrls: ['./email-charts.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})

export class EmailChartsComponent implements OnInit {

  email_responses: EmailResponses[];
  cols: any[];
  states: any[];
  rangeDates: Date[];

  @ViewChild('dt', { static: false }) dataTable: Table;

  constructor(private email_responses_srv: EmailResponsesService) { }

  static isBetween(value: any, filter: any[]) {
    return filter[0] <= value && filter[1] >= value;
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewChecked() {
    const customFilterConstraints = this.dataTable.filterConstraints;
    customFilterConstraints['between'] = EmailChartsComponent.isBetween;
    this.dataTable.filterConstraints = customFilterConstraints;
  }

  ngOnInit() {
    const self = this;

    self.cols = [
      { field: 'email', header: 'Recipient' },
      { field: 'event', header: 'State' },
      { field: 'date', header: 'Date' }
    ];

    self.states = [
      { label: 'All States', value: null },
      { label: 'proceed', value: 'proceed' },
      { label: 'delivered', value: 'delivered' },
      { label: 'open', value: 'open' }
    ];

    self.email_responses_srv.get()
      .then(data => {
        self.email_responses = data;
        self.email_responses.forEach(er => {
          er.date = er.updated_at.split('T')[0].split('-').reverse().join('-');
        });
      })
      .catch(err => console.log(err)
    );
  }

  searchByEmail(event, dt) {
    dt.filter(event.target.value, 'email');
  }

  selectDates(event, dt) {
    const start_date = this.rangeDates[0].toLocaleDateString().split('.').join('-');
    const end_date = this.rangeDates[1].toLocaleDateString().split('.').join('-');
    dt.filter([start_date, end_date], 'date', 'between');
  }

}
