import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { NavigationStart, Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (!params) {
                      this.router.navigate(['/home']);
                    }
      const mode = params.mode;
      const actionCode = params.oobCode;
      if (mode === 'verifyEmail') {
                      this.router.navigate(['verifyEmail'], { queryParams: { oobCode: actionCode } });
                      return;
                    }
      if (mode === 'resetPassword') {
                      this.router.navigate(['resetPassword'], { queryParams: { oobCode: actionCode } });
                      return;
                    }
                  });
          }
    }
