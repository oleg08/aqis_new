import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message         } from 'primeng/primeng';
import { MessageService  } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-aqis-add-user-to-tenant',
  templateUrl: './add-user-to-tenant.component.html',
  styleUrls: ['./add-user-to-tenant.component.scss'],
  providers: [
    MessageService
  ]
})
export class AddUserToTenantComponent implements OnInit {

  new_user_name:         string;
  new_user_email:        string;
  password:              string;
  password_confirmation: string;
  msgs: Message[] = [];

  @Output() submitForm: EventEmitter<object> = new EventEmitter<object>();

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  submit (data: NgForm) {
    const self = this;
    if (self.password === self.password_confirmation) {
      const object = {
        name: self.new_user_name,
        email: data.form.value.new_user_email_input,
        password: self.password,
        password_confirmation: self.password_confirmation
      };
      self.submitForm.emit(object);

      self.new_user_name = null;
      self.new_user_email = null;
      self.password = null;
      self.password_confirmation = null;

      data.form.markAsPristine();
    } else {
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Password and Password Confirmation are not equal`});
    }
  }

  setPristine (model) {
    model.control.markAsPristine();
  }

}
