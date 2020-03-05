import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fr: AngularFirestore) { }

  async signIn(email: string, password: string) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const currentUser = firebase.auth().currentUser;
      console.log(currentUser);
      return currentUser;
    } catch(e) {
      console.log(e);
    }
  }

  async signUp(email: string, password: string) {
    try{
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const currentUser = firebase.auth().currentUser;
      await currentUser.sendEmailVerification();
      this.fr.collection("users").doc(`${currentUser.uid}`).set({
        email,
      })
      console.log("Document successfully written!");
      console.log(currentUser);
      return currentUser;
    } catch (e) {
      console.log(e);
    }
  }
}