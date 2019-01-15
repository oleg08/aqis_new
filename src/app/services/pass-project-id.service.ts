import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassProjectIdService {

  private projectIdSource = new BehaviorSubject<number>(null);
  currentProjectID = this.projectIdSource.asObservable();

  constructor () {}

  changeProjectID (project_id: number) {
    this.projectIdSource.next(project_id);
  }
}
