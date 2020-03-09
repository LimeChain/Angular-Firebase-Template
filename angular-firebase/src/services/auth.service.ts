import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ethers } from 'ethers';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private actionCodeChecked = false;
  constructor(private http: HttpClient) {}
  async signIn(email: string, password: string) {
    try {
      const currentUser = await firebase.auth().signInWithEmailAndPassword(email, password);
      this.token = await firebase.auth().currentUser.getIdToken();
      // await firebase.auth().sendPasswordResetEmail(email);
      this.http.get('http://localhost:3000/token').subscribe(async (data: any) => {
        const wallet = await ethers.Wallet.fromEncryptedJson(data.wallet, password);
        console.log(wallet);
      });
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
      const wallet = ethers.Wallet.createRandom();
      const encryptPromise = await wallet.encrypt(password);
      // tslint:disable-next-line:max-line-length
      this.http.post('http://localhost:3000/wallet', {wallet: encryptPromise, uid: currentUser.user.uid, email}).subscribe();
      // move into backend
      console.log('Document successfully written!');
      console.log(currentUser.user);
      return currentUser.user;
    } catch (e) {
      console.log(e);
    }
  }
  async verifyPasswordResetCode(code: string) {
    try {
      const result = await firebase.auth().verifyPasswordResetCode(code);
      if (result) {
        this.actionCodeChecked = true;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
