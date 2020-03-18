import { Injectable } from '@angular/core';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private readonly toastr: ToastService) {}

  public success(message: string): void {
    this.toastr.show(message, {
      classname: 'bg-success text-light',
      delay: 3000 ,
      autohide: true,
    });
  }

  public error(message: string): void {
    this.toastr.show(message, {
      classname: 'bg-danger text-light',
      delay: 3000 ,
      autohide: true,
    });
  }

}
