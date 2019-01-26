import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private userSource = new BehaviorSubject<string>(null);
  user = this.userSource.asObservable();

  constructor () {}

  changeUser (user_id: string) {
    this.userSource.next(user_id);
  }
}
