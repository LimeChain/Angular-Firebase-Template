import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ethers } from 'ethers';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  constructor(private http: HttpClient) {}
  async signIn(email: string, password: string) {
    try {
      const currentUser = await firebase.auth().signInWithEmailAndPassword(email, password);
      this.token = await firebase.auth().currentUser.getIdToken();
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
      this.http.post('http://localhost:3000/wallet', {wallet: encryptPromise, uid: currentUser.user.uid, email}).subscribe();
      console.log('Document successfully written!');
      return currentUser.user;
    } catch (e) {
      console.log(e);
    }
  }
  async verifyPasswordResetCode(code: string) {
    try {
      return await firebase.auth().verifyPasswordResetCode(code);
    } catch (e) {
      console.log(e);
    }
  }

  async resetPassword(newPassword: string, confirmPassword: string, code: string, email: string) {
    if (newPassword !== confirmPassword) {
      console.log('New Password and Confirm Password do not match');
    }
    try {
      await firebase.auth().confirmPasswordReset(code, newPassword);
      const currentUser = await firebase.auth().signInWithEmailAndPassword(email, newPassword);
      const wallet = ethers.Wallet.createRandom();
      const encryptPromise = await wallet.encrypt(newPassword);
      this.http.put('http://localhost:3000/wallet', {uid: currentUser.user.uid, wallet: encryptPromise}).subscribe();
    } catch (error) {
      console.log(error);
    }
  }
}
