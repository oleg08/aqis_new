import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmailTemplateComponent } from './new-email-template.component';
import {AppTestingModule} from '../../app-testing-module';

describe('NewEmailTemplateComponent', () => {
  let component: NewEmailTemplateComponent;
  let fixture: ComponentFixture<NewEmailTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(NewEmailTemplateComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
