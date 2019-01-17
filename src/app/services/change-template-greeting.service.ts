import { Injectable } from '@angular/core';
import { EmailTemplates } from '../interfaces/email-templates';

@Injectable({
  providedIn: 'root'
})
export class ChangeTemplateGreetingService {

  constructor() { }

  composeGreeting (template: EmailTemplates, customer_tenant: any, recipient: string, person_gender) {

    const general_appeal = 'Hallo ';
    const official_appeal_male1 = 'Sehr geehrter ';
    const official_appeal_male2 = 'herr';
    const official_appeal_female1 = 'Sehr geehrte ';
    const official_appeal_female2 = 'frau';

    let appeal: string;
    let gender: number;
    let name_array: any;
    let name = '';

    if (!template) return;

    gender = person_gender.value;
    if (customer_tenant[recipient]) {
      name_array = customer_tenant[recipient].split(' ');
      name = customer_tenant[recipient];
    }

    const first_word = name_array ? name_array[0].toLowerCase() : null;


    if (first_word === official_appeal_male2) {
      appeal = official_appeal_male1 + name;
    } else if (first_word === official_appeal_female2) {
      appeal = official_appeal_female1 + name;
    } else {
      if (!gender || !name_array || gender === 0) {
        appeal = general_appeal + name;
      } else {
        if (gender === 1) {
          appeal = official_appeal_male1 +  this.capitalize(official_appeal_male2) + ' ' + name;
        } else if (gender === 2) {
          appeal = official_appeal_female1 +  this.capitalize(official_appeal_female2) + ' ' + name;
        }
      }
    }
    template.greeting = appeal;
    // template.footer = "TamaG GmbH, 1050 Wien, Krongasse 4 TamaG Kundensupport.";
    // template.footer += " Stets für Sie bereit: " + customer_tenant['assistant']['name'] + " +431-914 47 46";

    return template;
  }

  capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
