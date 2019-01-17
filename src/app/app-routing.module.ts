import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { StepComponent } from './steps/step/step.component';
import { StepDetailsComponent } from './steps/step-details/step-details.component';
import { MainEmailTemplatesComponent } from './email-templates/main-email-templates/main-email-templates.component';
import { TenantEmailTemplatesComponent } from './email-templates/tenant-email-templates/tenant-email-templates.component';
import { ProjectEmailTemplatesComponent } from './email-templates/project-email-templates/project-email-templates.component';
import { EmailTemplatesComponent } from './email-templates/email-templates/email-templates.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { BusinessAllComponent } from './businesses/business-all/business-all.component';
import { TenantsListComponent } from './tenants/tenants-list/tenants-list.component';
import { TenantDetailsComponent } from './tenants/tenant-details/tenant-details.component';
import { TenantsDsvgoComponent } from './tenants/tenants-dsvgo/tenants-dsvgo.component';
import { CustomerSearchComponent } from './customers/customer-search/customer-search.component';
import { CustomerExportComponent } from './customers/customer-export/customer-export.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { CustomerTenantStepDetailsComponent } from './steps/customer-tenant-step-details/customer-tenant-step-details.component';
import { PreCustomersListComponent } from './pre-customers/pre-customers-list/pre-customers-list.component';
import { PreCustomersDetailsComponent } from './pre-customers/pre-customers-details/pre-customers-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'steps',
    component: StepComponent
  },
  {
    path: 'steps/:id',
    component: StepDetailsComponent
  },
  {
    path: 'main_email_templates',
    component: MainEmailTemplatesComponent
  },
  {
    path: 'tenant_email_templates',
    component: TenantEmailTemplatesComponent
  },
  {
    path: 'email_templates',
    component: EmailTemplatesComponent
  },
  {
    path: 'project_email_templates/:id',
    component: ProjectEmailTemplatesComponent
  },
  {
    path: 'questions',
    component: QuestionListComponent
  },
  {
    path: 'businesses',
    component: BusinessAllComponent
  },
  {
    path: 'tenants',
    component: TenantsListComponent
  },
  {
    path: 'tenants/dsvgo_list',
    component: TenantsDsvgoComponent
  },
  {
    path: 'tenants/:id',
    component: TenantDetailsComponent
  },
  {
    path: 'customers',
    component: CustomerSearchComponent
  },
  {
    path: 'export_customers',
    component: CustomerExportComponent
  },
  {
    path: 'customers/:id',
    component: CustomerDetailsComponent
  },
  {
    path: 'c_tenant_steps/:id',
    component: CustomerTenantStepDetailsComponent
  },
  {
    path: 'pre_customers',
    component: PreCustomersListComponent
  },
  {
    path: 'pre_customers/:id',
    component: PreCustomersDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
