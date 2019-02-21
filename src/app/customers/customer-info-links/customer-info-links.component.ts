import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-aqis-customer-info-links',
  templateUrl: './customer-info-links.component.html',
  styleUrls: ['./customer-info-links.component.scss']
})
export class CustomerInfoLinksComponent implements OnInit {

  google_search_url = 'https://www.google.com.ua/search?q=';
  wiki_search_url = 'https://en.wikipedia.org/wiki/';

  @Input() customer_name: string;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  goTo(prepend_url, separator) {
    return prepend_url + this.customer_name.split(' ').join(separator);
  }
}
