import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

/**
 * This is the backend interceptor. It is used to intercept the API calls to the backend. It will add the authorization token to the headers of the API call.
 */
@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  /**
   * This is the constructor of the backend interceptor.
   * @param commonService is used to get the token from the session storage.
   */
  constructor(private commonService: CommonService) {}

  /**
   * This method is used to intercept the API calls to the backend. It will add the authorization token to the headers of the API call.
   * @param request is the request to be sent to the backend.
   * @param next is the next handler in the chain.
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    /**  return next.handle(request); */ // This will send the request to the backend without any modification.

    /**
     * If the request is for sign in or sign up API, then there is no need to add the authorization token to the headers.
     */
    if (request.url.includes('signin') || request.url.includes('signup')) {
      return next.handle(request);
    }
    const token: string = this.commonService.token;

    /**
     * Attaching the authorization token to the headers of the every other backend requests.
     */
    return next.handle(
      request.clone({
        setHeaders: { Authorization: `Bearer ${token.split(' ')[1]}` },
      })
    );
  }
}
