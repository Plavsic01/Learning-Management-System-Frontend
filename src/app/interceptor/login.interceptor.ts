import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login/login.service';


@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private loginService:LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.loginService.token != null){
      let newRequest = request.clone({headers:request.headers.set("Authorization",this.loginService.token)});
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}