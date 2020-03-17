import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    public constructor(private storageService: StorageService) {
    }
    public intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const user = JSON.parse(this.storageService.getItem('user'));
        let token;
        if (user) {
          token = user.stsTokenManager.accessToken;
        }
        let updatedRequest: any;
        updatedRequest = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`)
                });
        return next.handle(updatedRequest);
  }
}
