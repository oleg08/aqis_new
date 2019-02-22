import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLinksComponent } from './info-links.component';

describe('InfoLinksComponent', () => {
  let component: InfoLinksComponent;
  let fixture: ComponentFixture<InfoLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
