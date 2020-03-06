import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token;
  constructor(private http: HttpClient) {}
  async signIn(email: string, password: string) {
    try {
      const currentUser = await firebase.auth().signInWithEmailAndPassword(email, password);
      this.token = await firebase.auth().currentUser.getIdToken();
      const res = this.http.get('http://localhost:3000/token');
      console.log(currentUser.user);
      res.subscribe(data => console.log(data));
      return currentUser.user;
    } catch (e) {
      console.log(e);
    }
  }
  getToken() {
    return this.token;
  }
  async signUp(email: string, password: string) {
    try {
      const currentUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await currentUser.user.sendEmailVerification();
      firebase.firestore().collection('users').doc(`${currentUser.user.uid}`).set({
        email,
      });
      console.log('Document successfully written!');
      console.log(currentUser.user);
      return currentUser.user;
    } catch (e) {
      console.log(e);
    }
  }
}
