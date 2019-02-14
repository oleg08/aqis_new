import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchProjectService {

  private switchProjectSource = new BehaviorSubject<boolean>(false);
  currentValue = this.switchProjectSource.asObservable();

  constructor() { }
  switchProject(val: boolean) { this.switchProjectSource.next(val); }
}
