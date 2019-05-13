import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'aqis-new';
  msgs: Message[] = [];
  constructor (public authService: AuthService) {}

  ngOnInit() {
    document.body.classList.add('bg-img');
  }
}
