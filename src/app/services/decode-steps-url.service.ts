import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecodeStepsUrlService {

  constructor() { }

  static handler(values) {
    let main_path: string;
    let parent_path: string;
    if (!values.parameters.parent_path) {
      for (let i = 0; i < 50; i++) {
        if (values.path.split(';').length < 2) {
          values.path = decodeURIComponent(values.path);
        } else {
          main_path = decodeURIComponent(values.path).split(';')[0];
          parent_path = decodeURIComponent(values.path).split('=')[1];
          break;
        }
      }
    } else {
      main_path = values.path;
      parent_path = values.parameters.parent_path;
    }

    return { main_path: main_path, parent_path: parent_path };
  }
}
