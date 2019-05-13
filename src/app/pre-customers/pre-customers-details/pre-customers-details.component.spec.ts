import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreCustomersDetailsComponent } from './pre-customers-details.component';
import {AppTestingModule} from '../../app-testing-module';

describe('PreCustomersDetailsComponent', () => {
  let component: PreCustomersDetailsComponent;
  let fixture: ComponentFixture<PreCustomersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(PreCustomersDetailsComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
