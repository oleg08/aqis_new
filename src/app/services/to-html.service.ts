import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToHtmlService {

  constructor() { }
  handler (text) {
    text = text.replace(/<p/gi, '<p class="email-template-paragraph"');
    return '<small>' +  text.replace(/\n/gi,  ' <br/> ') + '</small>';
  }
}
