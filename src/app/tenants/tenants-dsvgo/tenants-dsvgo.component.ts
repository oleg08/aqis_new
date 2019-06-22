import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Message, OverlayPanel } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { Persons } from '../../interfaces/persons';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tenants-dsvgo',
  templateUrl: './tenants-dsvgo.component.html',
  styleUrls: ['./tenants-dsvgo.component.scss'],
  providers: [MessageService]
})
export class TenantsDsvgoComponent implements OnInit {
  title: Title;
  msgs: Message[] = [];
  persons: Persons[];
  selectedPerson: Persons;
  copyPersons: Persons[];
  selectedPersons: Persons[];

  loadPerson = false;
  savedPerson = false;
  cols: any[];

  @ViewChild('tenantsDsvgoList', { static: false }) el: ElementRef;

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              title: Title,
              private rd: Renderer2,
              private messageService: MessageService) {
    this.title = title;
    this.title.setTitle('DSVGO | Aqis');
  }

  ngOnInit() {
    const self = this;

    self.cols = [
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
      { field: 'customer_name', header: 'Customer' },
      { field: 'project_name', header: 'Project' },
    ]
    self.loadPerson = true;

    self.http.get(environment.serverUrl + '/customer_tenants/dsvgo_list.json'
    ).subscribe(
      response => {
        if (response['persons']) {
          self.loadPerson = false;
          self.persons = response['persons'];
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
      }
    );
  }

  selectPerson(event, person: Persons, overlaypanel: OverlayPanel) {
    const self = this;
    self.selectedPerson = person;
    self.copyPersons = JSON.parse(JSON.stringify(self.persons));
    overlaypanel.toggle(event);
  }

  editPerson(data) {
    const self = this;

    const params = {
      name: self.selectedPerson.name,
      email: self.selectedPerson.email,
      phone: self.selectedPerson.phone,
      role: self.selectedPerson.role,
    };

    if (params['role'] === 'Participant') {
      const participant_id = self.selectedPerson.participant_id;

      self.http.patch(environment.serverUrl + '/edit_participant/' + participant_id + '.json', params
      ).subscribe(
        response => {
          if (response['person']) {
            self.savedPerson = true;
            self.messageService.add({severity: 'success', summary: 'Success', detail: `Personal data successfully updated`});
          } else {
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't edit person`});
          }
        },
        response => {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't edit person`});
        }
      );
    } else {
      const customer_tenant_id = self.selectedPerson.customer_tenant_id;

      self.http.patch(environment.serverUrl + '/edit_person/' + customer_tenant_id + '.json', params
      ).subscribe(
        response => {
          if (response['person']) {
            self.savedPerson = true;
            self.messageService.add({severity: 'success', summary: 'Success', detail: `Personal data successfully updated`});
          } else {
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't edit person`});
          }
        },
        response => {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't edit person`});
        },
      );
    }
  }

  returnPersons () {
    const self = this;

    if (!self.savedPerson) {
      self.persons = JSON.parse(JSON.stringify(self.copyPersons));
    }
    self.savedPerson = false;
  }

  goToPerson(customer_id, project_id) {
    const self = this;
    window.location.href = '/customers/' + customer_id  + '?project_id=' + project_id + '.json';
  }

}
