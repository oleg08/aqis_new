import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToSendTemplateComponent } from './to-send-template.component';
import {AppTestingModule} from '../app-testing-module';

describe('ToSendTemplateComponent', () => {
  let component: ToSendTemplateComponent;
  let fixture: ComponentFixture<ToSendTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(ToSendTemplateComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
