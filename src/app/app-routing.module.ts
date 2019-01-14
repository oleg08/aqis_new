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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
