import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message         } from 'primeng/primeng';
import { MessageService  } from 'primeng/components/common/messageservice';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-aqis-participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.scss'],
  providers: [
    MessageService
  ]
})
export class ParticipantsListComponent implements OnInit {

  participants_before_edit: Array<object>;
  msgs: Message[] = [];
  cols: object[];

  @Input() participants: Array<object>;
  @Output() showMessage: EventEmitter<object> = new EventEmitter<object>();
  @Output() deleteParticipant: EventEmitter<object> = new EventEmitter<object>();

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  ngOnInit() {
    const self = this;
    self.cols = [
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
    ];
  }

  initEdit () {
    const self = this;
    self.participants_before_edit = JSON.parse(JSON.stringify(self.participants));
  }

  validationFailed (msg) {
    const self = this;
    self.participants = self.participants_before_edit;
    const message = {
      severity: 'warn',
      summary: 'Warning',
      detail: msg
    };
    self.showMessage.emit(message);
  }

  editParticipant(event) {
    const self = this;

    // validation of requiring name
    if (!event.data.name) {
      self.validationFailed('Name is required');
      self.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Name is required'});
      return;
    }

    // validation of uniqueness name
    const existing_participant = self.participants.find(item =>
      (item['name'] === event.data.name && item['id'] !== event.data.id));
    if (existing_participant) {
      self.validationFailed('Participant with the same name already exists');
      self.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Participant with the same name already exists'});
      return;
    }

    // validation email must be as email
    const trigger_email = event.data.email,
      regex_email = new RegExp('^[\\w+\\-.]+@[a-z\\d\\-.]+\\.[a-z]+$'),
      test_email = regex_email.test(event.data.email);
    if (!test_email) {
      self.validationFailed('Email must be as email');
      self.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Email must be as email'});
      return;
    }

    const params = {
      name: event.data.name,
      email: event.data.email,
      phone: event.data.phone
    };

    self.http.patch(environment.serverUrl + '/participants/' + event.data.id + '.json', params
    ).subscribe(
      (response) => {
        if (response['participant']) {
          const message = {severity: 'success', summary: 'Success', detail: 'Participant successfully updated'
          };
          self.showMessage.emit(message);
        } else {
          self.validationFailed(`Can't update Participant`);
        }
      },
      (response) => {
        self.validationFailed(`Can't update Participant`);
      }
    );
  }

  removeParticipant (event, participant) {
    const self = this;

    self.http.delete(environment.serverUrl + '/participants/' + participant.id + '.json'
    ).subscribe(
      (response) => {
        if (response['message'] === 'Participant deleted.') {
          self.participants = self.participants.filter(obj => obj !== participant);
          self.deleteParticipant.emit(participant);
          const message = {severity: 'success', summary: 'Success', detail: `Participant successfully deleted`
          };
          self.showMessage.emit(message);
        } else {
          self.validationFailed(`Can't delete Participant`);
        }
      },
      (response) => {
        self.validationFailed(`Can't delete Participant`);
      }
    );
  }

  esc() {
    const self = this;
    self.participants = JSON.parse(JSON.stringify(self.participants_before_edit));
  }

}
