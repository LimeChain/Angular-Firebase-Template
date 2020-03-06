import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  db: AngularFirestore;
  constructor(db: AngularFirestore) { this.db = db}
  ngOnInit(): void {
    const user = {
      email: "Johny61@abv.bg", 
      password: "John123"
    };
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(() => {
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }
}
