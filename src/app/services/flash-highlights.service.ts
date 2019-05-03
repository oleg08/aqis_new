import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlashHighlightsService {

  constructor() { }
  handler (self: any, selector: string, id: string|number, cssClass: string) {
    self.rd.addClass(self.el.nativeElement.querySelector(selector + id), cssClass);
    setTimeout(() => {
      self.rd.removeClass(self.el.nativeElement.querySelector(selector + id), cssClass);
    }, 2000);
  }
}
