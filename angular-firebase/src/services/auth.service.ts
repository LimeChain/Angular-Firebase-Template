import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ethers } from 'ethers';
import * as firebase from 'firebase';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from './notification.service';
import { environment } from '../environments/environment';
import { Api } from './api.service';
import { switchMap, tap } from 'rxjs/operators';
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
    private storageService: StorageService,
    private notificationService: NotificationService,
    private api: Api
    ) {
      firebase.auth().onAuthStateChanged(async currentUser => {
        if (currentUser) {
          console.log(currentUser);
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
      return this.api.get(`${environment.apiUrl}/users/wallet`);
  }

  async signUp(email: string, password: string) {
    try {
      const currentUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await currentUser.user.sendEmailVerification();
      const wallet = ethers.Wallet.createRandom();
      const encryptPromise = await wallet.encrypt(password);
      return this.api.post(`${environment.apiUrl}/users/createUser`, {wallet: encryptPromise, uid: currentUser.user.uid, email}).pipe(tap((user: any) => {
        this.storageService.setItem('user', JSON.stringify(currentUser.user));
        this.loggedUserDataSubject$.next(user.user);
      }));
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

  async resetPassword(newPassword: string, code: string, email: string) {
    try {
      await firebase.auth().confirmPasswordReset(code, newPassword);
      const currentUser = await firebase.auth().signInWithEmailAndPassword(email, newPassword);
      const wallet = ethers.Wallet.createRandom();
      const encryptPromise = await wallet.encrypt(newPassword);
      this.api.put(`${environment.apiUrl}/users/wallet`, {uid: currentUser.user.uid, wallet: encryptPromise}).subscribe();
      await this.logout();
    } catch (e) {
      this.notificationService.error(e.message);
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

  async sentResetPasswordEmail(email: string) {
    await firebase.auth().sendPasswordResetEmail(email);
  }
  async verifyEmail(actCode: string) {
    try {
      await firebase.auth().applyActionCode(actCode);
      this.logout();
    } catch (e) {
      throw new Error(e);
    }
  }
}
