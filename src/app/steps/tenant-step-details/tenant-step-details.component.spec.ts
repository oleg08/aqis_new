import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantStepDetailsComponent } from './tenant-step-details.component';

describe('TenantStepDetailsComponent', () => {
  let component: TenantStepDetailsComponent;
  let fixture: ComponentFixture<TenantStepDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantStepDetailsComponent ]
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
