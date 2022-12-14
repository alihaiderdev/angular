import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // console.log(`Request interceptor: ${request}`);
    // console.log('Request interceptor: ', request);
    // here we can not modify the original request so we have to clone it first and then modify it
    // return next.handle(request);
    // const cloneRequest = request.clone({
    //   headers: new HttpHeaders({ token: 'token123@abc' }),
    // });
    // return next.handle(cloneRequest);
    if (request.url.includes('/users')) {
      const cloneRequest = request.clone({
        headers: new HttpHeaders({ token: 'token123@abc' }),
      });
      return next.handle(cloneRequest);
    }

    // or just adding headers to all post request only
    if (request.method === 'POST') {
      const cloneRequest = request.clone({
        headers: new HttpHeaders({ token: 'token123' }),
      });
      return next.handle(cloneRequest);
    }

    return next.handle(request);
  }
}
