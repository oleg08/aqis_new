import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrippleFieldComponent } from './tripple-field.component';
import {AppTestingModule} from '../app-testing-module';

describe('TrippleFieldComponent', () => {
  let component: TrippleFieldComponent;
  let fixture: ComponentFixture<TrippleFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(TrippleFieldComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
