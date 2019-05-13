import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEmailTemplatesListComponent } from './select-email-templates-list.component';
import {AppTestingModule} from '../../app-testing-module';

describe('SelectEmailTemplatesListComponent', () => {
  let component: SelectEmailTemplatesListComponent;
  let fixture: ComponentFixture<SelectEmailTemplatesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(SelectEmailTemplatesListComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
