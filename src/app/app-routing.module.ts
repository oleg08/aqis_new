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
import { ProjectProgressComponent } from './reports/project-progress/project-progress.component';
import { InfoLinksComponent } from './info-links/info-links.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { SuperAdminGuard } from './guards/super-admin.guard';
import { AdminOrSuperAdminGuard } from './guards/admin-or-super-admin.guard';
import { ForceSslGuard } from './guards/force-ssl.guard';

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
    canActivate: [ForceSslGuard, AuthGuard]    // auth-guard
  },
  {
    path: 'steps',
    component: StepComponent,
    canActivate: [ForceSslGuard, AuthGuard]   // super-admin-guard
  },
  {
    path: 'steps/:id',
    component: StepDetailsComponent,
    canActivate: [ForceSslGuard, AuthGuard]  // super-admin-guard
  },
  {
    path: 'main_email_templates',
    component: MainEmailTemplatesComponent,
    canActivate: [ForceSslGuard, AuthGuard]   // super-admin-guard
  },
  {
    path: 'tenant_email_templates',
    component: TenantEmailTemplatesComponent,
    canActivate: [ForceSslGuard, AuthGuard]    // admin-guard
  },
  {
    path: 'email_templates',
    component: EmailTemplatesComponent,
    canActivate: [ForceSslGuard, AuthGuard]   // super-admin-guard
  },
  {
    path: 'project_email_templates/:id',
    component: ProjectEmailTemplatesComponent,
    canActivate: [ForceSslGuard, AuthGuard]   // admin-guard
  },
  {
    path: 'questions',
    component: QuestionListComponent,
    canActivate: [ForceSslGuard, AuthGuard]   // super-admin-guard
  },
  {
    path: 'businesses',
    component: BusinessAllComponent,
    canActivate: [ForceSslGuard, AuthGuard]   // admin-or-super-admin-guard
  },
  {
    path: 'tenants',
    component: TenantsListComponent,
    canActivate: [ForceSslGuard, AuthGuard]    // super-admin-guard
  },
  {
    path: 'tenants/dsvgo_list',
    component: TenantsDsvgoComponent,
    canActivate: [ForceSslGuard, AuthGuard]    // admin-guard
  },
  {
    path: 'tenants/:id',
    component: TenantDetailsComponent,
    canActivate: [ForceSslGuard, AuthGuard]    // admin-guard
  },
  {
    path: 'customers',
    component: CustomerSearchComponent,
    canActivate: [ForceSslGuard, AuthGuard]      // auth-guard
  },
  {
    path: 'authenticate_with_google',
    component: CustomerSearchComponent,
    canActivate: [ForceSslGuard, AuthGuard]       // auth-guard
  },
  {
    path: 'authenticate_with_google/:id',
    component: CustomerSearchComponent,
    canActivate: [ForceSslGuard, AuthGuard]       // auth-guard
  },
  {
    path: 'export_customers',
    component: CustomerExportComponent,
    canActivate: [ForceSslGuard, AuthGuard]       // auth-guard
  },
  {
    path: 'customers/:id',
    component: CustomerDetailsComponent,
    canActivate: [ForceSslGuard, AuthGuard]          // auth-guard
  },
  {
    path: 'c_tenant_steps/:id',
    component: CustomerTenantStepDetailsComponent,
    canActivate: [ForceSslGuard, AuthGuard]           // auth-guard
  },
  {
    path: 'pre_customers',
    component: PreCustomersListComponent,
    canActivate: [ForceSslGuard, AuthGuard]   // admin-or-super-admin-guard
  },
  {
    path: 'pre_customers/:id',
    component: PreCustomersDetailsComponent,
    canActivate: [ForceSslGuard, AuthGuard]  // admin-or-super-admin-guard
  },
  {
    path: 'projects',
    component: ProjectsAllComponent,
    canActivate: [ForceSslGuard, AuthGuard]    // admin-guard
  },
  {
    path: 'projects/:id',
    component: ProjectStepComponent,
    canActivate: [ForceSslGuard, AuthGuard]    // admin-guard
  },
  {
    path: 'project_steps/:id',
    component: ProjectStepDetailsComponent,
    canActivate: [ForceSslGuard, AuthGuard]    // admin-guard
  },
  {
    path: 'project_questions/:id',
    component: ProjectQuestionComponent,
    canActivate: [ForceSslGuard, AuthGuard]  // admin-guard
  },
  {
    path: 'project_email_templates/:id',
    component: ProjectEmailTemplatesComponent,
    canActivate: [ForceSslGuard, AuthGuard]  // admin-guard
  },
  {
    path: 'tenant_steps',
    component: TenantStepComponent,
    canActivate: [ForceSslGuard, AuthGuard]   // admin-guard
  },
  {
    path: 'tenant_steps/:id',
    component: TenantStepDetailsComponent,
    canActivate: [ForceSslGuard, AuthGuard]  // admin-guard
  },
  {
    path: 'tenant_email_templates',
    component: TenantEmailTemplatesComponent,
    canActivate: [ForceSslGuard, AuthGuard]  // admin-guard
  },
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [ForceSslGuard, AuthGuard]  // admin-guard
  },
  {
    path: 'users/:id',
    component: UserDetailsComponent,
    canActivate: [ForceSslGuard, AuthGuard]  // admin-guard
  },
  {
    path: 'statuses',
    component: StatusesComponent,
    canActivate: [ForceSslGuard, AuthGuard]   // admin-guard
  },
  {
    path: 'to_send_emails',
    component: ToSendTemplateComponent,
    canActivate: [ForceSslGuard, AuthGuard]   // auth-guard
  },
  {
    path: 'reports_project_progress',
    component: ProjectProgressComponent,
    canActivate: [ForceSslGuard, AuthGuard]    // admin-guard
  },
  {
    path: 'info_links',
    component: InfoLinksComponent,
    canActivate: [ForceSslGuard, AuthGuard]    // admin-guard
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
