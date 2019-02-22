import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { MessageService  } from 'primeng/components/common/messageservice';
import { environment } from '../../../environments/environment';
import { InfoLink } from '../../info-links/info-links.component';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-aqis-customer-info-links',
  templateUrl: './customer-info-links.component.html',
  styleUrls: ['./customer-info-links.component.scss'],
  providers: [MessageService]
})
export class CustomerInfoLinksComponent implements OnInit {

  google_search_url = 'https://www.google.com.ua/search?q=';
  wiki_search_url = 'https://en.wikipedia.org/wiki/';
  info_links: InfoLink[];
  msgs: Message[] = [];

  @Input() customer_name: string;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private messageService: MessageService) { }

  ngOnInit() {
    const self = this;
    self.http.get(`${environment.serverUrl}/info_links.json`).subscribe(
      res => {
        if (res['info_links']) {
          self.info_links = res['info_links'];
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load info-links`});
        }
      },
      err => { self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't load info-links`}); }
    );
  }

  goTo(prepend_url, separator) {
    const url = prepend_url + this.customer_name.split(' ').join(separator);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
