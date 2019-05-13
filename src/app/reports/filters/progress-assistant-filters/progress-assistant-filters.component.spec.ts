import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressAssistantFiltersComponent } from './progress-assistant-filters.component';
import {AppTestingModule} from '../../../app-testing-module';

describe('ProgressAssistantFiltersComponent', () => {
  let component: ProgressAssistantFiltersComponent;
  let fixture: ComponentFixture<ProgressAssistantFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(ProgressAssistantFiltersComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
