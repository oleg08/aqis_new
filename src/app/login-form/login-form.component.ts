import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  signInUser = {
    login: '',
    password: ''
  };

  @Output() onFormResult = new EventEmitter<any>();
  constructor(public authService: AuthService) { }

  ngOnInit() {}

  onSignInSubmit() {

    this.authService.logInUser(this.signInUser).subscribe(

      res => {
        console.log('authSevice res - ', res.headers);
        console.log('authSevice local-storage - ', localStorage);
        if (res.status === 200) {
          this.onFormResult.emit({signedIn: true, res});
        }
      },

      err => {
        console.log('err:', err);
        this.onFormResult.emit({signedIn: false, err});
      }
    );

  }

}
