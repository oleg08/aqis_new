import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MockComponent } from 'ng-mocks';
import {AppTestingModule} from './app-testing-module';
import {DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppTestingModule]
      }).compileComponents();
    }
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    de = fixture.debugElement.query(By.css('.main-container'));
    element = de.nativeElement;
  });

  it('should create the app', () => {
    app.ngOnInit();
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it(`should have as title 'aqis-new'`, () => {
    fixture.detectChanges();
    expect(app.title).toEqual('aqis-new');
    expect(element.innerHTML).toContain('router-outlet');
  });
});
