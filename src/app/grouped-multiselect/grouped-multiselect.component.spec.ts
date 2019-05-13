import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedMultiselectComponent } from './grouped-multiselect.component';
import {AppTestingModule} from '../app-testing-module';

describe('GroupedMultiselectComponent', () => {
  let component: GroupedMultiselectComponent;
  let fixture: ComponentFixture<GroupedMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(GroupedMultiselectComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
