import { Injectable } from '@angular/core';
import {Customer} from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersWithTenantsService {

  constructor() { }

  assignTenants (customers, project_id, user_id, agent_users, assistant_users) {
    customers.forEach((customer: Customer) => {

      if (customer.agent_id) {
        customer.agent_user = JSON.parse(JSON.stringify(agent_users.find(u => u['id'] === customer['agent_id'])));
      } else {
        customer.agent_user = {};
        customer.agent_user.email = null;
      }
      if (customer.assistant_id) {
        customer.assistant_user = JSON.parse(JSON.stringify(assistant_users.find(u => u['id'] === customer.assistant_id)));
      } else {
        customer.assistant_user = {};
        customer.assistant_user.email = null;
      }

      customer.assigned_as_agent = customer.agent_id === user_id;
      customer.assigned_as_assistant = customer.assistant_id === user_id;

      this.emailAddresses(customer);

      // if (project_id && customer.project_tenant) {
      //
      //     let c_t = customer.project_tenant;
      //     let questions = c_t.customer_tenant_questions.filter(q => q.category_id === customer.category_id);
      //     let sum_questions_weight = 0;
      //     let sum_answ_val= 0;
      //     questions.forEach(q => {
      //         if (q.answer) sum_answ_val += q.answer.value * q.weight / 100;
      //         sum_questions_weight += q.weight;
      //     });
      //
      //     customer.progress = ( sum_answ_val * 100 / sum_questions_weight ).toFixed(2);
      //     if (isNaN(customer.progress)) customer.progress = 0;
      //
      // } else {
      //     customer.progress = 0;
      // }
    });
    return customers;
  }

  emailAddresses(customer: Customer, customer_tenant?) {
    const email_addresses = [];

    if (!customer_tenant) { customer_tenant = customer; }

    if (customer.email) {
      email_addresses.push({
        id: customer.customer_tenant_id,
        name: null,
        email: customer.email,
        assistant_id: customer.assistant_id
      });
    }

    if (customer.email_2 && customer_tenant.email_2 !== customer.email) {
      email_addresses.push({
        id: customer.customer_tenant_id,
        name: customer_tenant.responsible_name,
        email: customer_tenant.email_2,
        assistant_id: customer_tenant.assistant_id
      });
    } else {
      if (email_addresses[0]) {
        email_addresses[0].name = customer_tenant.responsible_name;
      }
    }

    if (customer_tenant.assistant_email) {
      email_addresses.push({
        id: customer.customer_tenant_id,
        name: customer_tenant.office_name,
        email: customer_tenant.assistant_email,
        assistant_id: customer_tenant.assistant_id
      });
    }

    customer.email_addresses = [...email_addresses];
  }
}
