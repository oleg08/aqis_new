import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

// Components
import {AppModule} from './app.module';

@NgModule({
  imports: [
    AppModule,
    RouterTestingModule
  ]
})
export class AppTestingModule {}
