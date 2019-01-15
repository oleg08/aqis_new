import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // , FormControl, FormGroup
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { DragulaModule } from 'ng2-dragula';

import 'materialize-css';

// services
import { AuthService } from './services/auth.service';
import { AssignOriginalValueService } from './services/assign-original-value.service';
import { CheckPatternService } from './services/check-pattern.service';
import { CallAlertService } from './services/call-alert.service';
import { FlashHighlightsService } from './services/flash-highlights.service';
import { TimeZonesDataService } from './services/time-zones-data.service';
import { AngularTokenService } from 'angular-token';
import { CookieService } from 'ngx-cookie-service';
import { GetStepsService } from './services/get-steps.service';
import { OpenStepsService } from './services/open-steps.service';
import { GetEmailTemplatesService } from './services/get-email-templates.service';
import { CapitalizeService } from './services/capitalize.service';
import { KeywordsService } from './services/keywords.service';
import { PassBusinessService } from './services/pass-business.service';
import { PassProjectIdService } from './services/pass-project-id.service';

// primeng
import {
  CarouselModule,
  ButtonModule,
  DialogModule,
  GrowlModule,
  ConfirmDialogModule
} from 'primeng/primeng';

import { MessageService      } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';
import { TooltipModule       } from 'primeng/tooltip';
import { DataTableModule     } from 'primeng/datatable';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule      } from 'primeng/dropdown';
import { FieldsetModule      } from 'primeng/fieldset';
import { InputTextModule     } from 'primeng/inputtext';
import { MessagesModule      } from 'primeng/messages';
import { MessageModule       } from 'primeng/message';
import { CalendarModule      } from 'primeng/calendar';
import { OrderListModule     } from 'primeng/orderlist';
import { SliderModule        } from 'primeng/slider';
import { AutoCompleteModule  } from 'primeng/autocomplete';
import { InputSwitchModule   } from 'primeng/primeng';
import { OverlayPanelModule  } from 'primeng/overlaypanel';
import { TableModule         } from 'primeng/table';
import { EditorModule        } from 'primeng/editor';
import { InplaceModule       } from 'primeng/inplace';
import { CardModule          } from 'primeng/card';
import { ToolbarModule       } from 'primeng/toolbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PickListModule        } from 'primeng/picklist';
import { PanelModule           } from 'primeng/panel';
import { PasswordModule        } from 'primeng/password';
import { DataViewModule        } from 'primeng/dataview';
import { SelectButtonModule    } from 'primeng/selectbutton';

// components
import { AngularTokenModule } from 'angular-token';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterializeModule } from 'angular2-materialize';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AlertCloseableComponent } from './alert-closeable/alert-closeable.component';
import { ProfileComponent } from './profile/profile.component';
import { TextFieldComponentComponent } from './text-field-component/text-field-component.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { StepComponent } from './steps/step/step.component';
import { StepsListComponent } from './steps/steps-list/steps-list.component';
import { StepsListSelectedComponent } from './steps/steps-list-selected/steps-list-selected.component';
import { StepsCrudComponent } from './steps/steps-crud/steps-crud.component';
import { StepNewComponent } from './steps/step-new/step-new.component';
import { StepDetailsComponent } from './steps/step-details/step-details.component';
import { StepDetailsActionsComponent } from './steps/step-details-actions/step-details-actions.component';
import { SelectQuestionListComponent } from './questions/select-question-list/select-question-list.component';
import { EmailTemplatesOrderListComponent } from './email-templates/email-templates-order-list/email-templates-order-list.component';
import { SelectEmailTemplatesListComponent } from './email-templates/select-email-templates-list/select-email-templates-list.component';
import { NewEmailTemplateComponent } from './email-templates/new-email-template/new-email-template.component';
import { QuestionsOrderListComponent } from './questions/questions-order-list/questions-order-list.component';
import { CustomerTenantQuestionsOrderListComponent
} from './questions/customer-tenant-questions-order-list/customer-tenant-questions-order-list.component';
import { NewCustomerTenantQuestionComponent } from './questions/new-customer-tenant-question/new-customer-tenant-question.component';
import { NewQuestionComponent } from './questions/new-question/new-question.component';
import { MainEmailTemplatesComponent } from './email-templates/main-email-templates/main-email-templates.component';
import { EmailTemplatesActionsComponent } from './email-templates/email-templates-actions/email-templates-actions.component';
import { EmailTemplatesListComponent } from './email-templates/email-templates-list/email-templates-list.component';
import { TenantEmailTemplatesComponent } from './email-templates/tenant-email-templates/tenant-email-templates.component';
import { ProjectEmailTemplatesComponent } from './email-templates/project-email-templates/project-email-templates.component';
import { CustomerTenantEmailTemplatesComponent
} from './email-templates/customer-tenant-email-templates/customer-tenant-email-templates.component';
import { EmailTemplatesComponent } from './email-templates/email-templates/email-templates.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionsCrudComponent } from './questions/questions-crud/questions-crud.component';
import { ProjectQuestionComponent } from './questions/project-question/project-question.component';
import { NewAnswerComponent } from './questions/new-answer/new-answer.component';
import { EmailTemplatePreviewComponent } from './email-templates/email-template-preview/email-template-preview.component';
import { BusinessAllComponent } from './businesses/business-all/business-all.component';
import { EditBusinessComponent } from './businesses/edit-business/edit-business.component';
import { NewBusinessComponent } from './businesses/new-business/new-business.component';
import { TenantsListComponent } from './tenants/tenants-list/tenants-list.component';
import { TenantDetailsComponent } from './tenants/tenant-details/tenant-details.component';
import { TenantsDsvgoComponent } from './tenants/tenants-dsvgo/tenants-dsvgo.component';
import { AddUserToTenantComponent } from './tenants/add-user-to-tenant/add-user-to-tenant.component';
import { TrippleFieldComponent } from './tripple-field/tripple-field.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    AuthDialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProfileComponent,
    TextFieldComponentComponent,
    DropdownComponent,
    AlertCloseableComponent,
    StepComponent,
    StepsListComponent,
    StepsListSelectedComponent,
    StepsCrudComponent,
    StepNewComponent,
    StepDetailsComponent,
    StepDetailsActionsComponent,
    SelectQuestionListComponent,
    EmailTemplatesOrderListComponent,
    SelectEmailTemplatesListComponent,
    NewEmailTemplateComponent,
    QuestionsOrderListComponent,
    CustomerTenantQuestionsOrderListComponent,
    NewCustomerTenantQuestionComponent,
    NewQuestionComponent,
    MainEmailTemplatesComponent,
    EmailTemplatesActionsComponent,
    EmailTemplatesListComponent,
    TenantEmailTemplatesComponent,
    ProjectEmailTemplatesComponent,
    CustomerTenantEmailTemplatesComponent,
    EmailTemplatesComponent,
    QuestionListComponent,
    QuestionsCrudComponent,
    ProjectQuestionComponent,
    NewAnswerComponent,
    EmailTemplatePreviewComponent,
    BusinessAllComponent,
    EditBusinessComponent,
    NewBusinessComponent,
    TenantsListComponent,
    TenantDetailsComponent,
    TenantsDsvgoComponent,
    AddUserToTenantComponent,
    TrippleFieldComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularTokenModule.forRoot({apiBase: environment.token_auth_config.apiBase}),
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule,
    ModalModule.forRoot(),
    NgbModule,
    DragulaModule.forRoot(),
    CarouselModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    DialogModule,
    PanelModule,
    DropdownModule,
    GrowlModule,
    ConfirmDialogModule,
    DataTableModule,
    InputTextareaModule,
    FieldsetModule,
    MessagesModule,
    MessageModule,
    OrderListModule,
    SliderModule,
    AutoCompleteModule,
    InputSwitchModule,
    OverlayPanelModule,
    TableModule,
    EditorModule,
    InplaceModule,
    CardModule,
    ToolbarModule,
    ProgressSpinnerModule,
    PickListModule,
    PasswordModule,
    DataViewModule,
    SelectButtonModule
  ],
  providers: [
    AngularTokenService,
    AuthService,
    AssignOriginalValueService,
    CheckPatternService,
    CallAlertService,
    FlashHighlightsService,
    TimeZonesDataService,
    MessageService,
    ConfirmationService,
    CookieService,
    GetStepsService,
    OpenStepsService,
    GetEmailTemplatesService,
    CapitalizeService,
    KeywordsService,
    PassBusinessService,
    PassProjectIdService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
