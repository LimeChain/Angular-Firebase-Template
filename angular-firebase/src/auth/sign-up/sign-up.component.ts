import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  db;
  constructor(db: AngularFirestore) { this.db = db}

  ngOnInit(): void {
    const user = {
      email: "schterev1@abv.bg", 
      password: "John123"
    };
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(()=>{
    const user = firebase.auth().currentUser;
    user.sendEmailVerification().then();
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }
}