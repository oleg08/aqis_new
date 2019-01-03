import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import 'materialize-css';

import { AngularTokenModule } from 'angular-token';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterializeModule } from 'angular2-materialize';
import { AngularTokenService } from 'angular-token';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularTokenModule.forRoot({apiBase: environment.token_auth_config.apiBase}),
    MaterializeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AngularTokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
