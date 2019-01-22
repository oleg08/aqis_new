import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetEmailTemplatesService {
  email_templates: Array<object>;

  constructor(private http: HttpClient) { }

  private extractData (res) {
    const self = this;

    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }

    self.email_templates = res;
    return self.email_templates || {};
  }

  get(path, project_id?): Observable<any> {
    const self = this;
    let url: string;
    if (path.split('?').length > 1) {
      url = '/' + path.split('?')[0] + '.json?' + path.split('?')[1];
      if (project_id) url += `&project_id=${project_id}`;
    } else {
      url = '/' + path + '.json';
      if (project_id) url += `?project_id=${project_id}`;
    }
    return self.http.get(environment.serverUrl + url).pipe(map(self.extractData));
  }
}
