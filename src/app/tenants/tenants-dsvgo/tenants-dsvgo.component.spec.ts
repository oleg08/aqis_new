import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantsDsvgoComponent } from './tenants-dsvgo.component';
import {AppTestingModule} from '../../app-testing-module';

describe('TenantsDsvgoComponent', () => {
  let component: TenantsDsvgoComponent;
  let fixture: ComponentFixture<TenantsDsvgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(TenantsDsvgoComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
