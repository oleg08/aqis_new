import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Step } from '../interfaces/step';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetStepsService {

  constructor(private http: HttpClient) {}

  getSteps (path: string) {
    const self = this;
    const key: string = path.split('sliced_')[1].split('/')[0];
    return self.http.get<any>(environment.serverUrl + '/' + path + '.json')
      .toPromise()
      .then(res => <Step[]>res[key])
      .then(data => { return data; } );
  }
}
