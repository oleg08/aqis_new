import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseConfigService {

  constructor(private http: HttpClient) { }

  static get () {
    // this.http.post(`${environment.serverUrl}/fire_config.json`, {}).subscribe(
    //   res => {
    //     return res;
    //   }
    // );

    console.log('FireBase-Config - ');
    return {
      apiKey: 'AIzaSyAp0YHeLkKZXanR15pUFG5IiCqxpoAWOSo',
      authDomain: 'aqis-6fe5b.firebaseapp.com',
      databaseURL: 'https://aqis-6fe5b.firebaseio.com',
      projectId: 'aqis-6fe5b',
      storageBucket: '',
      messagingSenderId: '867099614282',
      appId: '1:867099614282:web:75f2ed41d0fd8f09'
    };
  }
}
