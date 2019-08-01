import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from '../services/google-auth.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-aqis-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.scss']
})
export class GoogleSigninComponent implements OnInit {

  constructor(public googleAuthService: GoogleAuthService,
              public authService: AuthService) { }

  ngOnInit() {}
}
