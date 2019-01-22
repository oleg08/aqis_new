import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSlideComponent } from './select-slide.component';

describe('SelectSlideComponent', () => {
  let component: SelectSlideComponent;
  let fixture: ComponentFixture<SelectSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
