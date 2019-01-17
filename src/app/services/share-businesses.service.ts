import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Businesses } from '../interfaces/businesses';

@Injectable({
  providedIn: 'root'
})
export class ShareBusinessesService {

  http: HttpClient;

  private businessesSource = new BehaviorSubject<Businesses[]>(null);
  currentBusinesses = this.businessesSource.asObservable();

  constructor (http: HttpClient) {
    this.http = http;
  }

  changeBusinesses(businesses: Businesses[]) {
    this.businessesSource.next(businesses);
  }
}
