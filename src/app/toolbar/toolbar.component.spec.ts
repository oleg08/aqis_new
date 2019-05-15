import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import {AppTestingModule} from '../app-testing-module';
import {DebugElement, inject} from '@angular/core';
import {By} from '@angular/platform-browser';

import { AuthService } from '../services/auth.service';
import {User} from '../interfaces/user';
import {Router} from '@angular/router';
import {AngularTokenService} from 'angular-token';
import {CurrentUserService} from '../services/current-user.service';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  let authService: AuthService;
  let admin: User;
  let spy: jasmine.Spy;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppTestingModule]
      }).compileComponents();
    }
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    authService = fixture.debugElement.injector.get(AuthService);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.navbar'));
    element = de.nativeElement;
    admin = { name: 'Admin', email: 'admin@email.com', admin: true, super_admin: false, password: 'password' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should have LOGIN', () => {
    expect(element.textContent).toContain('LOGIN');
  });

  it (`should have LOGOUT after user logged in`, async () => {
    spy = spyOn(authService, 'logInUser').and.returnValue(Promise.resolve(admin));

    expect(element.textContent).toContain('LOGOUT');
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(element.textContent).toContain('alkhjsjkg-kjhkjg');
    });
  });
});
