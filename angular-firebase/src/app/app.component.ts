import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-firebase';
  async onButtonClick() {
    await firebase.auth().sendPasswordResetEmail('test123123@abv.bg');
  }
}
