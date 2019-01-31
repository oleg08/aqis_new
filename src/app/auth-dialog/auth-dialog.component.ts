import {Component, OnInit, Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  displayLoginForm: boolean;

  @Input('auth-mode') authMode: 'login' | 'register' = 'login';
  modalActions = new EventEmitter<string>();

  constructor() {

  }

  onLoginFormResult(e) {
    if (e.signedIn) {
      this.closeDialog();
    }
  }

  openDialog() {
    this.authMode = 'login';
    this.displayLoginForm = true;
  }

  closeDialog() {
    this.displayLoginForm = false;
  }

  ngOnInit() {
  }

  isLoginMode() { return this.authMode === 'login'; }

}
