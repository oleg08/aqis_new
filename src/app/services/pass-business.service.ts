import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassBusinessService {

  private businessSource = new BehaviorSubject<object>(null);
  currentBusiness = this.businessSource.asObservable();

  constructor () {}

  changeBusiness(val: object) { this.businessSource.next(val); }
}
