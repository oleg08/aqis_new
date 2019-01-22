import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { States } from '../../interfaces/states';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss'],
  providers: [MessageService]
})
export class StatusesComponent implements OnInit {

  selectedCategory:   object;
  new_status:         string;
  msgs: Message[] = [];

  states: States[];
  cols: Array<object>;
  selectedState: States;
  state: States = {};
  newState: boolean;
  displayDialog: boolean;
  checkbox = false;

  @ViewChild('statesList') el: ElementRef;

  constructor(private http: HttpClient,
              private router: Router,
              private messageService: MessageService,
              public rd: Renderer2) { }

  ngOnInit() {
    const self = this;
    self.http.get(environment.serverUrl + '/states.json'
    ).subscribe(
      response => {
        if (response['states']) {
          self.states = response['states'];
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load data`});
      }
    );

    this.cols = [
      { field: 'label', header: 'Label' },
      { field: 'description', header: 'Description' },
      { field: 'active', header: 'Active' },
      { field: 'removable', header: 'Removable' }
    ];
  }

  showDialogToAdd() {
    const self = this;
    self.newState = true;
    self.state = {};
    self.displayDialog = true;
  }

  save() {
    const self = this;
    const states = [...self.states];
    if (self.newState) {
      self.http.post(environment.serverUrl + '/states.json', { label: self.state.label, description: self.state.description }
      ).subscribe(
        response => {
          if (response['state']) {
            self.state.id = response['state']['id'];
            self.state.order = response['state']['order'];
            self.state.active = response['state']['active'];
            self.state.removable = true;
            states.push(self.state);

            self.states = states;
            self.state = null;
            self.displayDialog = false;
          } else {
            self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create state`});
            self.state = null;
            self.displayDialog = false;
          }
        },
        response => {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't create state`});
          self.state = null;
          self.displayDialog = false;
        }
      );
    } else {
      self.updateRequest(self.state, states, { label: self.state.label, description: self.state.description });
    }
  }

  setActive(state: States) {
    const self = this;
    self.checkbox = true;
    const states = [...self.states];
    self.updateRequest(state, states, { active: state.active });
  }

  updateRequest (state: States, states, params) {
    const self = this;
    self.http.patch(environment.serverUrl + '/states/' + state.id + '.json', params
    ).subscribe(
      response => {
        if (response['state']) {
          states[self.states.indexOf(self.selectedState)] = self.state;
          self.messageService.add({severity: 'success', summary: 'Success', detail: 'State successfully updated'});

          self.states = states;
          self.state = null;
          self.displayDialog = false;
          self.checkbox = false;
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't update state`});
          self.state = null;
          self.displayDialog = false;
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't update state`});
        self.state = null;
        self.displayDialog = false;
      }
    );
  }

  reorder(sts: States[]) {
    const self = this;
    const states: States[] = [...self.states];
    const ids: number[] = [];
    sts.forEach(state => {
      ids.push(state.id);
    });
    self.http.post(environment.serverUrl + '/states_reorder.json', { state_ids: ids }
    ).subscribe(
      response => {
        if (response['states']) {
          self.states.forEach(st => {
            st.order = response['states'].find(s => s.id === st.id).order;
          });
          self.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully reordered'});
        } else {
          self.states = states;
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: response['message']});
        }
      },
      response => {
        self.states = states;
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't reorder the steps`});
      }
    );
  }

  selectState(event) {
    const self = this;
    self.selectedState = event.value[0];
  }

  delete() {
    const self = this;

    if (!self.selectedState.removable) {
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: 'This State is unremovable'});
      return;
    }

    self.http.delete(environment.serverUrl + '/states/' + self.selectedState.id + '.json'
    ).subscribe(
      response => {
        if (response['message'] === 'State successfully deleted') {
          const index = self.states.indexOf(self.selectedState);
          self.states = self.states.filter((st, i) => i !== index );
          self.states.forEach(st => {
            if (self.states.indexOf(st) >= index) st.order -= 1;
          });
          self.state = null;
          self.selectedState = null;
          self.displayDialog = false;
          self.messageService.add({severity: 'success', summary: 'Success', detail: response['message']});
          self.checkbox = false;
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete state`});
          self.state = null;
          self.displayDialog = false;
        }
      },
      response => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't delete state`});
        self.state = null;
        self.displayDialog = false;
      }
    );
  }

  onRowSelect(state) {
    const self = this;
    self.newState = false;
    self.state = self.cloneState(state);
    if (!self.checkbox) {
      self.displayDialog = true;
    }
  }

  cloneState(s: States): States {
    const state = {};
    for (const prop in s) {
      state[prop] = s[prop];
    }
    return state;
  }

}
