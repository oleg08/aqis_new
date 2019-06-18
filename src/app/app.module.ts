import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // , FormControl, FormGroup
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { DragulaModule } from 'ng2-dragula';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatNativeDateModule } from '@angular/material';

// services
import { AuthInterceptor } from './api.interceptor';
import { AuthService } from './services/auth.service';
import { AssignOriginalValueService } from './services/assign-original-value.service';
import { CheckPatternService } from './services/check-pattern.service';
import { DifferenceArraysService } from './services/difference-arrays.service';
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
import { SortMultipleService } from './services/sort-multiple.service';
import { SortArrayService } from './services/sort-array.service';
import { PassCustomersIdsService } from './services/pass-customers-ids.service';
import { CustomersWithTenantsService } from './services/customers-with-tenants.service';
import { TransformStatesService } from './services/transform-states.service';
import { CustomersSortDataService } from './services/customers-sort-data.service';
import { ShareCustomersIdsService } from './services/share-customers-ids.service';
import { IterateCustomersService } from './services/iterate-customers.service';
import { PassStateService } from './services/pass-state.service';
import { SetGoogleParamsService } from './services/set-google-params.service';
import { ChangeTemplateGreetingService } from './services/change-template-greeting.service';
import { ShareAddressService } from './services/share-address.service';
import { RemoveDuplicatesService } from './services/remove-duplicates.service';
import { BuildCustomerAddressesService } from './services/build-customer-addresses.service';
import { ShareBusinessesService } from './services/share-businesses.service';
import { ShareEmailTemplatesService } from './services/share-email-templates.service';
import { GendersService } from './services/genders.service';
import { PreCustomersService } from './services/pre-customers.service';
import { CheckModelService } from './services/check-model.service';
import { IfHourOrMinService } from './services/if-hour-or-min.service';
import { ShareCategoriesService } from './services/share-categories.service';
import { IsEmptyStringService } from './services/is-empty-string.service';
import { CurrentUserService } from './services/current-user.service';
import { GetToSendEmailsService } from './services/get-to-send-emails.service';
import { SwitchProjectService } from './services/switch-project.service';
import { AssistantProgressesPropsService } from './reports/assistant-progresses-props.service';
import { DifferenceReportsService } from './reports/difference-reports.service';
import { InvoiceTypesBreadcrumbDataService } from './invoice-types/invoice-types-breadcrumb/invoice-types-breadcrumb-data.service';
import { InvoiceTypesPeriodsDataService } from './invoice-types/invoice-types-periods-data.service';
import { GetReportDataService } from './assistant-steps-hours/get-report-data.service';
import { SetRangeDateService } from './services/set-range-date.service';
import { AssistantInvoicesDataService } from './assistant-invoices/assistant-invoices-data.service';
import { GoogleAuthenticationMessagesService } from './services/google-authentication-messages.service';
import { PusherService } from './services/pusher.service';
import { StandardizedBusinessesService } from './businesses/standardized-businesses/standardized-businesses.service';
import { BusinessService } from './businesses/business.service';
import { DecodeStepsUrlService } from './services/decode-steps-url.service';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { SuperAdminGuard } from './guards/super-admin.guard';
import { ForceSslGuard } from './guards/force-ssl.guard';
import { AdminOrSuperAdminGuard } from './guards/admin-or-super-admin.guard';

// primeng
import { PrimeNgModule } from './prime-ng-module';
import { AngularMaterialModule } from './angular-material-module';
// components
import { AngularTokenModule } from 'angular-token';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { CustomerSearchComponent } from './customers/customer-search/customer-search.component';
import { CustomerExportComponent } from './customers/customer-export/customer-export.component';
import { BindingSelectComponent } from './binding-select/binding-select.component';
import { ConnectionPopupComponent } from './customers/connection-popup/connection-popup.component';
import { ConnectionTimeComponent } from './customers/connection-time/connection-time.component';
import { ConnectionDurationComponent } from './customers/connection-duration/connection-duration.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { CustomerInfoComponent } from './customers/customer-info/customer-info.component';
import { GroupedMultiselectComponent } from './grouped-multiselect/grouped-multiselect.component';
import { NewAddressComponent } from './new-address/new-address.component';
import { ParticipantsListComponent } from './participants-list/participants-list.component';
import { PreCustomersListComponent } from './pre-customers/pre-customers-list/pre-customers-list.component';
import { NewPreCustomerComponent } from './pre-customers/new-pre-customer/new-pre-customer.component';
import { PreCustomersDetailsComponent } from './pre-customers/pre-customers-details/pre-customers-details.component';
import { AreaFieldComponent } from './area-field/area-field.component';
import { CustomerTenantStepsComponent } from './steps/customer-tenant-steps/customer-tenant-steps.component';
import { CustomerTenantStepDetailsComponent } from './steps/customer-tenant-step-details/customer-tenant-step-details.component';
import { SelectAutoCompleteComponent } from './select-auto-complete/select-auto-complete.component';
import { AddressListComponent } from './address-list/address-list.component';
import { SelectSearchComponent } from './select-search/select-search.component';
import { BindSelectComponent } from './bind-select/bind-select.component';
import { SelectFieldComponent } from './select-field/select-field.component';
import { ProjectsAllComponent } from './projects/projects-all/projects-all.component';
import { ProjectStepComponent } from './steps/project-step/project-step.component';
import { SelectSlideComponent } from './select-slide/select-slide.component';
import { ProjectStepDetailsComponent } from './steps/project-step-details/project-step-details.component';
import { TenantStepComponent } from './steps/tenant-step/tenant-step.component';
import { TenantStepDetailsComponent } from './steps/tenant-step-details/tenant-step-details.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { StatusesComponent } from './statuses/statuses/statuses.component';
import { ToSendTemplateComponent } from './to-send-template/to-send-template.component';
import { ProjectProgressComponent } from './reports/project-progress/project-progress.component';
import { CustomerInfoLinksComponent } from './customers/customer-info-links/customer-info-links.component';
import { InfoLinksComponent } from './info-links/info-links.component';
import { ProgressAssistantComponent } from './reports/progress-assistant/progress-assistant.component';
import { ProgressProjectsAssistantsComponent } from './reports/progress-projects-assistants/progress-projects-assistants.component';
import { ProgressProjectTableComponent } from './reports/tables/progress-project-table/progress-project-table.component';
import { ProgressAssistantFiltersComponent } from './reports/filters/progress-assistant-filters/progress-assistant-filters.component';
import { UpdateAssistantReportsComponent } from './reports/update-assistant-reports/update-assistant-reports.component';
import { SuperAdminAccountInfoComponent } from './super-admin-account-info/super-admin-account-info.component';
import { SuperAdminInformationComponent } from './super-admin-account-info/super-admin-information/super-admin-information.component';
import { SuperAdminBillingInfoComponent } from './super-admin-account-info/super-admin-billing-info/super-admin-billing-info.component';
import { EditTenantComponent } from './tenants/edit-tenant/edit-tenant.component';
import { InvoiceTypesComponent } from './invoice-types/invoice-types.component';
import { NewInvoiceTypeComponent } from './invoice-types/new-invoice-type/new-invoice-type.component';
import { InvoiceTypeDetailsComponent } from './invoice-types/invoice-type-details/invoice-type-details.component';
import { InvoiceTypesBreadcrumbComponent } from './invoice-types/invoice-types-breadcrumb/invoice-types-breadcrumb.component';
import { InvoiceTypeImageLoadingComponent } from './invoice-types/invoice-type-image-loading/invoice-type-image-loading.component';
import { InvoiceTypeEditComponent } from './invoice-types/invoice-type-edit/invoice-type-edit.component';
import { AssistantStepsHoursComponent } from './assistant-steps-hours/assistant-steps-hours.component';
import { DailyReportEditComponent } from './assistant-steps-hours/daily-report-edit/daily-report-edit.component';
import { AssistantDailyReportsComponent } from './assistant-daily-reports/assistant-daily-reports.component';
import { TenantInvoiceComponent } from './invoice-types/tenant-invoice/tenant-invoice.component';
import { InvoiceTypeInvoicesComponent } from './invoice-types/invoice-type-invoices/invoice-type-invoices.component';
import { AssistantInvoicesComponent } from './assistant-invoices/assistant-invoices.component';
// tslint:disable-next-line:import-spacing
import { AssistantInvoicesSearchComponent } from
    './assistant-invoices/assistant-invoices-search/assistant-invoices-search/assistant-invoices-search.component';
import { DailyReportsFiltersComponent } from './assistant-daily-reports/daily-reports-filters/daily-reports-filters.component';
import { StepReportFilterComponent } from './assistant-steps-hours/step-report-filter/step-report-filter.component';
import { StandardizedBusinessesComponent } from './businesses/standardized-businesses/standardized-businesses.component';
import { HighlightDirective } from './directives/highlight.directive';

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
    CustomerSearchComponent,
    CustomerExportComponent,
    BindingSelectComponent,
    ConnectionPopupComponent,
    ConnectionTimeComponent,
    ConnectionDurationComponent,
    CustomerDetailsComponent,
    CustomerInfoComponent,
    GroupedMultiselectComponent,
    NewAddressComponent,
    ParticipantsListComponent,
    PreCustomersListComponent,
    NewPreCustomerComponent,
    PreCustomersDetailsComponent,
    AreaFieldComponent,
    CustomerTenantStepsComponent,
    CustomerTenantStepDetailsComponent,
    SelectAutoCompleteComponent,
    AddressListComponent,
    SelectSearchComponent,
    BindSelectComponent,
    SelectFieldComponent,
    ProjectsAllComponent,
    ProjectStepComponent,
    SelectSlideComponent,
    ProjectStepDetailsComponent,
    TenantStepComponent,
    TenantStepDetailsComponent,
    UsersListComponent,
    UserDetailsComponent,
    StatusesComponent,
    ToSendTemplateComponent,
    ProjectProgressComponent,
    CustomerInfoLinksComponent,
    InfoLinksComponent,
    ProgressAssistantComponent,
    ProgressProjectsAssistantsComponent,
    ProgressProjectTableComponent,
    ProgressAssistantFiltersComponent,
    UpdateAssistantReportsComponent,
    SuperAdminAccountInfoComponent,
    SuperAdminInformationComponent,
    SuperAdminBillingInfoComponent,
    EditTenantComponent,
    InvoiceTypesComponent,
    NewInvoiceTypeComponent,
    InvoiceTypeDetailsComponent,
    InvoiceTypesBreadcrumbComponent,
    InvoiceTypeImageLoadingComponent,
    InvoiceTypeEditComponent,
    AssistantStepsHoursComponent,
    DailyReportEditComponent,
    AssistantDailyReportsComponent,
    TenantInvoiceComponent,
    InvoiceTypeInvoicesComponent,
    AssistantInvoicesComponent,
    AssistantInvoicesSearchComponent,
    DailyReportsFiltersComponent,
    StepReportFilterComponent,
    StandardizedBusinessesComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularTokenModule.forRoot({apiBase: environment.token_auth_config.apiBase}),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    CommonModule,
    ClickOutsideModule,
    NgSelectModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule,
    DragulaModule.forRoot(),
    PrimeNgModule,
    AngularMaterialModule,
    MatNativeDateModule
  ],
  providers: [
    AngularTokenService,
    AuthService, { provide: HTTP_INTERCEPTORS,       // set headers for each request
      useClass: AuthInterceptor,
      multi: true
    },
    AssignOriginalValueService,
    CheckPatternService,
    DifferenceArraysService,
    CallAlertService,
    FlashHighlightsService,
    TimeZonesDataService,
    CookieService,
    GetStepsService,
    OpenStepsService,
    GetEmailTemplatesService,
    CapitalizeService,
    KeywordsService,
    PassBusinessService,
    PassProjectIdService,
    SortMultipleService,
    SortArrayService,
    PassCustomersIdsService,
    CustomersWithTenantsService,
    TransformStatesService,
    CustomersSortDataService,
    ShareCustomersIdsService,
    IterateCustomersService,
    PassStateService,
    SetGoogleParamsService,
    ChangeTemplateGreetingService,
    ShareAddressService,
    RemoveDuplicatesService,
    BuildCustomerAddressesService,
    ShareBusinessesService,
    ShareEmailTemplatesService,
    GendersService,
    PreCustomersService,
    CheckModelService,
    IfHourOrMinService,
    ShareCategoriesService,
    IsEmptyStringService,
    CurrentUserService,
    GetToSendEmailsService,
    DifferenceReportsService,
    SwitchProjectService,
    AssistantProgressesPropsService,
    InvoiceTypesBreadcrumbDataService,
    InvoiceTypesPeriodsDataService,
    GetReportDataService,
    SetRangeDateService,
    AssistantInvoicesDataService,
    GoogleAuthenticationMessagesService,
    PusherService,
    StandardizedBusinessesService,
    BusinessService,
    DecodeStepsUrlService,
    AuthGuard,
    AdminGuard,
    SuperAdminGuard,
    AdminOrSuperAdminGuard,
    ForceSslGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule);
