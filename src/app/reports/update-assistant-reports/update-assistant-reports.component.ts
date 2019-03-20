import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/primeng';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-aqis-update-assistant-reports',
  templateUrl: './update-assistant-reports.component.html',
  styleUrls: ['./update-assistant-reports.component.scss'],
  providers: [MessageService]
})
export class UpdateAssistantReportsComponent implements OnInit {

  @Input() cookies_key_date_update: string;
  @Input() cookies_key_start_update: string;
  @Input() update_path: string;
  @Input() tenant_update_date_path: string;
  @Output() reload:  EventEmitter<object> = new EventEmitter<object>();
  @Output() update:  EventEmitter<object> = new EventEmitter<object>();

  displayDialog = false;
  msgs: Message[] = [];
  update_running = false;
  reload_button = false;
  last_update: string;
  start_updating = 'false';   // evaluate to 'true' when click 'Yes' on the confirmation dialog

  constructor(private http: HttpClient, private cookieService: CookieService, private messageService: MessageService) { }

  ngOnInit() {
    const self = this;
    self.start_updating = self.cookieService.get(self.cookies_key_start_update); // checks whether button 'Yes' on the confirmation was clicked
    self.last_update = self.cookieService.get(self.cookies_key_date_update);
  }

  openDialog() {
    const self = this;
    self.update_running = false;
    self.http.get(`${environment.serverUrl}/${self.tenant_update_date_path}.json`).subscribe(
      res => {
        if (res[self.cookies_key_date_update]) {
          if (self.last_update && self.last_update === res[self.cookies_key_date_update] && self.start_updating === 'true') {
            self.update_running = true;
            self.displayDialog = true;
            setTimeout(() => { self.displayDialog = false; }, 5000);
          } else {
            self.last_update = res[self.cookies_key_date_update];
            self.cookieService.set(self.cookies_key_date_update, self.last_update);
            if (self.start_updating === 'true') { self.reload_button = true; }
            self.start_updating = 'false';
            self.cookieService.set(self.cookies_key_start_update, 'false');
            self.displayDialog = true;
          }
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Updating is not available`});
        }
      },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Updating is not available`});
      }
    );
  }

  updateData() {
    const self = this;
    self.start_updating = 'true';
    self.cookieService.set(self.cookies_key_start_update, 'true', ((45 / 24) / 60));
    self.http.get(`${environment.serverUrl}/${self.update_path}.json`).subscribe(
      res => {
        if (res['message'] !== 'Update is running' && res['message'] !== 'Update just started' &&
          res['message'] !== 'Update of another tenant is running') {
          self.start_updating = 'false';
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Error Updating`});
        }
      },
      err => { self.start_updating = 'false'; }
    );
    self.displayDialog = false;
  }

  reloadPage() { this.reload.emit(); }
}
