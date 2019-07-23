import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  createToTenant(user: User) {
    const self = this;
    return self.http.post<any>(`${environment.serverUrl}/users/tenant_admin.json`, user)
      .toPromise()
      .then(res => <any>res)
      .then(data => data);
  }

  update(user_id: number, params: object) {
    const self = this;
    return self.http.patch<any>(`${environment.serverUrl}/users/${user_id}.json`, params)
      .toPromise()
      .then(res => <any>res)
      .then(data => data);
  }
}
