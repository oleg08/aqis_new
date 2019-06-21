import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Router } from '@angular/router';
import { AuthService} from '../services/auth.service';
import { CallAlertService } from '../services/call-alert.service';
import { FlashHighlightsService } from '../services/flash-highlights.service';
import { TimeZonesDataService } from '../services/time-zones-data.service';
import { GoogleAuthenticationMessagesService } from '../services/google-authentication-messages.service';

import { Project } from '../interfaces/project';
import { TimeZones } from '../interfaces/time-zones';
import { HalfTimeZones } from '../interfaces/half-time-zones';

import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:                User;
  current_user:        User;
  projects:            Project[];
  time_zones:          TimeZones[];
  half_time_zones:     HalfTimeZones[];
  disable_time_zone:   boolean;
  disable_half_zone:   boolean;
  msgs:                Message[] = [];
  alert = false;
  alertType:           string;
  alertMessage:        string;
  google_authorized  = false;
  current_project:     Project;
  calendar_email:      string;
  authentication_text: string;
  current_project_info: string;
  is_project_and_google_emails_equal: string;

  @ViewChild('userProfile', { static: false }) el: ElementRef;

  constructor(public authService: AuthService,
              private router: Router,
              private http: HttpClient,
              private callAlert: CallAlertService,
              private flashHighlights: FlashHighlightsService,
              private timeZonesData: TimeZonesDataService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              public rd: Renderer2
  ) {
    this.disable_time_zone   = false;
    this.disable_half_zone   = false;
  }

  ngOnInit() {
    const self = this;
    self.http.get(environment.serverUrl + '/user_profile.json').subscribe(
      res => {
        if (res['user']) {
          self.current_user = res['user'];
          self.user         = res['user'];
          self.projects     = res['projects'];
          self.current_project = res['current_project'];
          self.google_authorized = res['google_authorized'];
          self.calendar_email = res['calendar_email'];

          if (self.current_project && self.google_authorized && self.calendar_email) {
            self.authentication_text = GoogleAuthenticationMessagesService.profileAuthTextSuccess(self.calendar_email);
            self.current_project_info = GoogleAuthenticationMessagesService.profileProjectInfo(self.current_project.gmail);
            if (self.current_project.gmail) {
              self.is_project_and_google_emails_equal = GoogleAuthenticationMessagesService.profileIsEmailsEquals(
                self.calendar_email,
                self.current_project.gmail);
            }
          } else {
            self.authentication_text = GoogleAuthenticationMessagesService.profileAuthTextFailed();
          }
        }
      },
      err => {
        if (err['statusText'] === 'Unauthorized') {
          self.msgs = [{severity: 'warning', summary: 'Warning', detail: `You are unauthorized`}];
          this.router.navigate(['/']);
        }
        console.log('err - ', err);
      }
    );
    self.time_zones      = self.timeZonesData.getZone();
    self.half_time_zones = self.timeZonesData.getHalfZone();
  }

  save (event) {
    const self = this;
    const originalValue = event.originalValue;

    self.confirmationService.confirm({
      message: 'Changing this field may result in a broken authorization with the Google-Calendar',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        const params = {};

        params['user'] = {};
        params['user'][event['field_name']] = event['value'];

        self.http.patch(environment.serverUrl + '/users/' + self.user['id'] + '.json', params
        ).subscribe(
          (response) => {
            if (response['user']) {

              if (event['field_name'] === 'time_zone') {
                self.disable_half_zone = Math.abs(event['value']) === 12 || !event['value'] ? true : false;
              }
              self.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'Parameter was successfully changed'}];

              setTimeout(() => {
                self.flashHighlights.handler(
                  self,
                  '#' + event['field_name'],
                  String(self.user['id']),
                  'success-updated'
                );
              });
            } else {
              self.callAlert.handler(self, 'warning', response['message'], 2000);
              self.user[event['field_name']] = originalValue;
            }
          },
          (response) => {
            self.callAlert.handler(self, 'warning', `Can't update user`, 2000);
            self.user[event['field_name']] = originalValue;
          }
        );
      },
      reject: () => {
        self.msgs = [{severity: 'info', summary: 'Rejected', detail: `Parameter was't changed`}];
        self.user[event['field_name']] = originalValue;
      }
    });
  }

  setEvent(date) {

    const self = this;
    const event = {
      'summary': 'Google I/O 2015',
      'location': '800 Howard St., San Francisco, CA 94103',
      'description': 'A chance to hear more about Google\'s developer products.',
      'start': {
        'dateTime': '2018-01-22T09:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
      },
      'end': {
        'dateTime': '2018-01-22T17:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
      },
      'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=2'
      ],
      'attendees': [
        {'email': 'lpage@example.com'},
        {'email': 'sbrin@example.com'}
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 10}
        ]
      }
    };
    self.http.post('/users_create_event.json', {}
    ).subscribe(
      (response) => {
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const url = response['url'];

        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        // tslint:disable-next-line:no-shadowed-variable
          .then((response: any) => response.text())
          .then(contents => console.log(contents))
          .catch(() => console.log(`Can’t access ` + url + ' response. Blocked by browser?'));
        console.log('success', response);
      },
      (response) => {
        console.log('error ', response);
      }
    );
  }

}
