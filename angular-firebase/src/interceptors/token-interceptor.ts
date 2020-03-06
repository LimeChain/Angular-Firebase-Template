import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';


import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    public constructor(private readonly authService: AuthService) {}

    public intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        let updatedRequest: any;
        updatedRequest = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`)
                });
        return next.handle(updatedRequest);
}
}
