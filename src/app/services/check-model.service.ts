import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckModelService {

  constructor() { }
  handler (model) {
    return  !(model.invalid && model.dirty);
  }
}
