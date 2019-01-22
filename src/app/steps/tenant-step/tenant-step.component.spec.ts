import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantStepComponent } from './tenant-step.component';

describe('TenantStepComponent', () => {
  let component: TenantStepComponent;
  let fixture: ComponentFixture<TenantStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
