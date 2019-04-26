import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthenticationMessagesService {

  constructor() { }

  static fail() {
    let text: string;
    text = 'Authentication with Google expired. To authenticate with Google again follow next link';
    return text;
  }

  static success(calendar_email) {
    let text: string;
    text = `Success Authentication with the Google Calendar to account ${calendar_email}`;
    return text;
  }

  static emails_are_not_equals(calendar_email: string, project_email: string) {
    let text: string;
    text = `You are connected to the Google Calendar as ${calendar_email}.
                If you want all events will be created to the Google Calendar for user ${project_email},
                go to authentication with Google again.`;
    return text;
  }

  static profileAuthTextSuccess (calendar_email) {
    return `You are authenticated with Google as ${calendar_email}`;
  }

  static profileProjectInfo (project_email) {
    return `Project's email is ${project_email}`;
  }

  static profileIsEmailsEquals (calendar_email, project_email) {
    let text = `Project's and google-calendar emails are `;
    text += calendar_email === project_email ? `equals` : `not equals`;
    return text;
  }

  static profileAuthTextFailed () {
    return `You are not authenticated with the Google Calendar.`;
  }
}
