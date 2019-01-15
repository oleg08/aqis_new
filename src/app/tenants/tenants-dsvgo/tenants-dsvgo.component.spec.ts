import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantsDsvgoComponent } from './tenants-dsvgo.component';

describe('TenantsDsvgoComponent', () => {
  let component: TenantsDsvgoComponent;
  let fixture: ComponentFixture<TenantsDsvgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantsDsvgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantsDsvgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
