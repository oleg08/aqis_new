import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  url: string;
  @ViewChild('hidden_form') el: ElementRef;

  constructor(private elementRef: ElementRef, public rd: Renderer2) { }

  ngOnInit() {
    this.url = `${environment.serverUrl}/request_to_google`;
  }

  googleAuthenticate() {
    console.log(this.el.nativeElement);
    this.el.nativeElement.submit();
    // window.location.href = `${environment.serverUrl}/request_to_google`;
  }

}
