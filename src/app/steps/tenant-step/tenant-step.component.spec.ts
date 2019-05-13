import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantStepComponent } from './tenant-step.component';
import {AppTestingModule} from '../../app-testing-module';

describe('TenantStepComponent', () => {
  let component: TenantStepComponent;
  let fixture: ComponentFixture<TenantStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(TenantStepComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
