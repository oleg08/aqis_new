import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenStepsService {

  private openStepsSource = new BehaviorSubject<boolean>(false);
  currentState = this.openStepsSource.asObservable();

  constructor() { }

  changeOpenStepsState(value: boolean) {
    this.openStepsSource.next(value);
  }
}
