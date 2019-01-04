import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import 'materialize-css';

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

// services
import { AuthService } from './services/auth.service';
import { AssignOriginalValueService } from './services/assign-original-value.service';
import { CheckPatternService } from './services/check-pattern.service';
import { CallAlertService } from './services/call-alert.service';
import { FlashHighlightsService } from './services/flash-highlights.service';
import { TimeZonesDataService } from './services/time-zones-data.service';
import { AngularTokenService } from 'angular-token';
import { CookieService } from 'ngx-cookie-service';

// primeng
import {
  CarouselModule,
  InputTextModule,
  ButtonModule,
  CalendarModule,
  DialogModule,
  PanelModule,
  DropdownModule,
  GrowlModule,
  ConfirmDialogModule
} from 'primeng/primeng';

import { MessageService } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularTokenModule.forRoot({apiBase: environment.token_auth_config.apiBase}),
    MaterializeModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    NgbModule,
    CarouselModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    DialogModule,
    PanelModule,
    DropdownModule,
    GrowlModule,
    ConfirmDialogModule
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
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
