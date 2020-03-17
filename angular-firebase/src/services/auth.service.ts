import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ethers } from 'ethers';
import * as firebase from 'firebase';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from './notification.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedUserDataSubject$ = new BehaviorSubject<any>(
    this.getUserDataIfAuthenticated()
  );

  public get loggedUserData$() {
    return this.loggedUserDataSubject$.asObservable();
  }
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private notificationService: NotificationService
    ) {
      firebase.auth().onAuthStateChanged(async currentUser => {
        if (currentUser && currentUser.emailVerified) {
          this.storageService.setItem('user', JSON.stringify(currentUser));
          const user = (await firebase.firestore().collection('users').doc(`${currentUser.uid}`).get()).data();
          this.loggedUserDataSubject$.next(user);
          return;
        }
        this.storageService.removeItem('user');
    });
  }

  async checkUserEmailVerified(email: string, password: string) {
    try {
        const currentUser = await firebase.auth().signInWithEmailAndPassword(email, password);
        return currentUser.user.emailVerified ? true : false;
    } catch (e) {
      this.notificationService.error('Invalid email or password !');
    }
  }
  signIn() {
      return this.http.get('http://localhost:3000/users/wallet');
  }
  async signUp(email: string, password: string) {
    try {
      const currentUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await currentUser.user.sendEmailVerification();
      const wallet = ethers.Wallet.createRandom();
      const encryptPromise = await wallet.encrypt(password);
      this.http.post('http://localhost:3000/users/wallet', {wallet: encryptPromise, uid: currentUser.user.uid, email}).subscribe();
    } catch (e) {
      throw new Error(e);
    }
  }
  async verifyPasswordResetCode(code: string) {
    try {
      return await firebase.auth().verifyPasswordResetCode(code);
    } catch (e) {
      this.notificationService.error(e.error.message);
    }
  }

  async resetPassword(newPassword: string, confirmPassword: string, code: string, email: string) {
    if (newPassword !== confirmPassword) {
      this.notificationService.error('New Password and Confirm Password do not match');
    }
    try {
      await firebase.auth().confirmPasswordReset(code, newPassword);
      const currentUser = await firebase.auth().signInWithEmailAndPassword(email, newPassword);
      const wallet = ethers.Wallet.createRandom();
      const encryptPromise = await wallet.encrypt(newPassword);
      this.http.put('http://localhost:3000/users/wallet', {uid: currentUser.user.uid, wallet: encryptPromise}).subscribe();
    } catch (e) {
      this.notificationService.error(e.error.message);
    }
  }
  async getUserDataIfAuthenticated() {
    const loggedUser = JSON.parse(this.storageService.getItem('user'));
    if (loggedUser) {
      return (await firebase.firestore().collection('users').doc(`${loggedUser.uid}`).get()).data();
    }
    return null;
  }

  async logout() {
    this.storageService.removeItem('user');
    this.loggedUserDataSubject$.next(null);
    await firebase.auth().signOut();
  }
}
