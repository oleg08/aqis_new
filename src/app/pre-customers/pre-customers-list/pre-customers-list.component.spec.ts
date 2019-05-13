import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreCustomersListComponent } from './pre-customers-list.component';
import {AppTestingModule} from '../../app-testing-module';

describe('PreCustomersListComponent', () => {
  let component: PreCustomersListComponent;
  let fixture: ComponentFixture<PreCustomersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(PreCustomersListComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
