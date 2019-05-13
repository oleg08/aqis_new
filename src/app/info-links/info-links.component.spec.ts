import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLinksComponent } from './info-links.component';
import {AppTestingModule} from '../app-testing-module';

describe('InfoLinksComponent', () => {
  let component: InfoLinksComponent;
  let fixture: ComponentFixture<InfoLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(InfoLinksComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
