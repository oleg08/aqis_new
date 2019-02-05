import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  displayLoginForm: boolean;

  @Input('auth-mode') authMode: 'Log in' | 'register' = 'Log in';
  @Output() getUserProps: EventEmitter<object> = new EventEmitter<object>();
  modalActions = new EventEmitter<string>();

  constructor() {

  }

  onLoginFormResult(e) {
    if (e.signedIn) {
      this.getUserProps.emit();
      this.closeDialog();
    }
  }

  openDialog() {
    this.authMode = 'Log in';
    this.displayLoginForm = true;
  }

  closeDialog() {
    this.displayLoginForm = false;
  }

  ngOnInit() {
  }

  isLoginMode() { return this.authMode === 'Log in'; }

}
