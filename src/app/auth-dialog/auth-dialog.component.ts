import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  @Input('auth-mode') authMode: 'login' | 'register' = 'login';
  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor() {

  }

  onLoginFormResult(e) {


    if (e.signedIn) {
      this.closeDialog();
    } else {
      console.log('log in errors', e.err.error.erorrs);
    }
  }

  onRegisterFormResult(e) {
    if (e.signedUp) {
      this.closeDialog();
    } else {
    }
  }



  openDialog(mode: 'login' | 'register' = 'login') {
    this.authMode = mode;
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  closeDialog() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

  ngOnInit() {
  }

  isLoginMode() { return this.authMode === 'login'; }
  isRegisterMode() { return this.authMode === 'register'; }


}
