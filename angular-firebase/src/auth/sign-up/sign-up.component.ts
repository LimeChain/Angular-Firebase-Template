import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  fireStore;
  constructor(public fr: AngularFirestore) { this.fireStore = fr}

  ngOnInit(): void {
    const user = {
      email: "Johny63@abv.bg", 
      password: "John123"
    };
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(()=>{
    const currentUser = firebase.auth().currentUser;
    currentUser.sendEmailVerification().then();
    this.fr.collection("users").doc(`${currentUser.uid}`).set({
      email: user.email,
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
}).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }
}