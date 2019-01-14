import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Keywords } from '../interfaces/keywords';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeywordsService {

  constructor(private http: HttpClient) { }

  getKeywords () {
    const self = this;
    return self.http.get<any>(environment.serverUrl + '/keywords.json')
      .toPromise()
      .then(res => <Keywords[]>res.keywords)
      .then(data => { return data; });
  }

  getHotKeywords () {
    const self = this;
    return self.http.get<any>(environment.serverUrl + '/hot_keywords.json')
      .toPromise()
      .then(res => <Keywords[]>res.hot_keywords)
      .then(data => { return data; });
  }
}
