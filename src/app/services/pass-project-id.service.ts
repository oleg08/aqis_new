import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class PassProjectIdService {

  private projectSource = new BehaviorSubject<Project>(null);
  currentProject = this.projectSource.asObservable();

  constructor () {}

  changeProject (project: Project) {
    this.projectSource.next(project);
  }
}
