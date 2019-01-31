import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHeaders, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'client': 'rupG59m7EJDAQ6KEEHC6bA',
      'access-token': 'mdV9ifPLT646A-CXQJyEfQ',
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'uid': 'oleg.gudak@gmail.com',
      'token-type': 'Bearer'
    });
    const authReq = req.clone({headers});
    if (req.url.includes('auth/sign_in')) {
      return next.handle(req);
    } else {
      return next.handle(req);
    }
  }
}
