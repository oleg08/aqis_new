import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { CurrentUserService } from '../services/current-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  current_user_id: string;
  url: string;
  @ViewChild('hidden_form') el: ElementRef;

  constructor(private elementRef: ElementRef,
              public rd: Renderer2,
              public authService: AuthService,
              private currentUser: CurrentUserService) { }

  ngOnInit() {
    this.url = `${environment.serverUrl}/request_to_google`;
    this.currentUser.user.subscribe(user_id => this.current_user_id = user_id);
  }

  googleAuthenticate() {
    this.el.nativeElement.submit();
  }

}
