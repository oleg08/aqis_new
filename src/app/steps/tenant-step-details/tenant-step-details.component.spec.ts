import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantStepDetailsComponent } from './tenant-step-details.component';
import {AppTestingModule} from '../../app-testing-module';

describe('TenantStepDetailsComponent', () => {
  let component: TenantStepDetailsComponent;
  let fixture: ComponentFixture<TenantStepDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantStepDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
