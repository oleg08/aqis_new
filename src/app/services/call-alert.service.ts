import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CallAlertService {

  constructor() { }

  handler (self, type: string, message: string, timeout: number) {
    self.alert = true;
    self.alertType = type;
    self.alertMessage = message;
    setTimeout(() => {
      self.alert = false;
    }, timeout);
  }
}
