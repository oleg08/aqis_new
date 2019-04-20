import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantInvoicesSearchComponent } from './assistant-invoices-search.component';

describe('AssistantInvoicesSearchComponent', () => {
  let component: AssistantInvoicesSearchComponent;
  let fixture: ComponentFixture<AssistantInvoicesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistantInvoicesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantInvoicesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
