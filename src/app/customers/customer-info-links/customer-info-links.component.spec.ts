import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInfoLinksComponent } from './customer-info-links.component';
import {AppTestingModule} from '../../app-testing-module';

describe('CustomerInfoLinksComponent', () => {
  let component: CustomerInfoLinksComponent;
  let fixture: ComponentFixture<CustomerInfoLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(CustomerInfoLinksComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
