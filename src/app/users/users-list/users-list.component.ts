import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CallAlertService } from '../../services/call-alert.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [CallAlertService]
})
export class UsersListComponent implements OnInit {

  users: Array<any>;

  constructor(private http: HttpClient, private callAlert: CallAlertService) { }

  ngOnInit() {
    const self = this;
    self.http.get(environment.serverUrl + '/users.json'
    ).subscribe(
      (response) => {
        self.users = response['users'];
      },
      (response) => {
        console.log(response);
      }
    );
  }

}
