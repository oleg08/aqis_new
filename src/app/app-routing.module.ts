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
import { ProjectsAllComponent } from './projects/projects-all/projects-all.component';
import { ProjectStepComponent } from './steps/project-step/project-step.component';
import { ProjectStepDetailsComponent } from './steps/project-step-details/project-step-details.component';
import { ProjectQuestionComponent } from './questions/project-question/project-question.component';
import { TenantStepComponent } from './steps/tenant-step/tenant-step.component';
import { TenantStepDetailsComponent } from './steps/tenant-step-details/tenant-step-details.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { StatusesComponent } from './statuses/statuses/statuses.component';
import { ToSendTemplateComponent } from './to-send-template/to-send-template.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { SuperAdminGuard } from './guards/super-admin.guard';

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
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'steps',
    component: StepComponent,
    canActivate: [SuperAdminGuard]
  },
  {
    path: 'steps/:id',
    component: StepDetailsComponent,
    canActivate: [SuperAdminGuard]
  },
  {
    path: 'main_email_templates',
    component: MainEmailTemplatesComponent,
    canActivate: [SuperAdminGuard]
  },
  {
    path: 'tenant_email_templates',
    component: TenantEmailTemplatesComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'email_templates',
    component: EmailTemplatesComponent,
    canActivate: [SuperAdminGuard]
  },
  {
    path: 'project_email_templates/:id',
    component: ProjectEmailTemplatesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'questions',
    component: QuestionListComponent,
    canActivate: [SuperAdminGuard]
  },
  {
    path: 'businesses',
    component: BusinessAllComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tenants',
    component: TenantsListComponent,
    canActivate: [SuperAdminGuard]
  },
  {
    path: 'tenants/dsvgo_list',
    component: TenantsDsvgoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tenants/:id',
    component: TenantDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    component: CustomerSearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'authenticate_with_google',
    component: CustomerSearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'authenticate_with_google/:id',
    component: CustomerSearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'export_customers',
    component: CustomerExportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customers/:id',
    component: CustomerDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'c_tenant_steps/:id',
    component: CustomerTenantStepDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pre_customers',
    component: PreCustomersListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pre_customers/:id',
    component: PreCustomersDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    component: ProjectsAllComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'projects/:id',
    component: ProjectStepComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'project_steps/:id',
    component: ProjectStepDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'project_questions/:id',
    component: ProjectQuestionComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'project_email_templates/:id',
    component: ProjectEmailTemplatesComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'tenant_steps',
    component: TenantStepComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'tenant_steps/:id',
    component: TenantStepDetailsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'tenant_email_templates',
    component: TenantEmailTemplatesComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/:id',
    component: UserDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'statuses',
    component: StatusesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'to_send_emails',
    component: ToSendTemplateComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
