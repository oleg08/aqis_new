import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassStateService {

  private stateSource = new BehaviorSubject<number>(null);
  currentState = this.stateSource.asObservable();

  constructor () {}

  changeState(state: number) {
    this.stateSource.next(state);
  }
}
