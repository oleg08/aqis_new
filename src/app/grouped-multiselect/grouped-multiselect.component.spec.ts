import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedMultiselectComponent } from './grouped-multiselect.component';

describe('GroupedMultiselectComponent', () => {
  let component: GroupedMultiselectComponent;
  let fixture: ComponentFixture<GroupedMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupedMultiselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
