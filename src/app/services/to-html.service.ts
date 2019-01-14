import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToHtmlService {

  constructor() { }
  handler (text) {
    return '<small><p>' +  text.replace(/\n/gi,  ' <br/> ') + '</small></p>';
  }
}
