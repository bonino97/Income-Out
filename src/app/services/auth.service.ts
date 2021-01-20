import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Store } from '@ngrx/store';
import { AppState } from './../app.reducer';

import { User } from './../models/user.model';

import { AngularFirestore } from '@angular/fire/firestore';

import * as authActions from './../auth/auth.actions';
import * as incomeOutActions from './../income-out/income-out.actions';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubscription: Subscription;
  private _user: User;

  get user() {
    return this._user;
  }

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  createUser(user: any) {
    return this.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((fbUser) => {
        const newUser = new User(fbUser.user.uid, user.name, fbUser.user.email);
        return this.firestore
          .doc(`${fbUser.user.uid}/user`)
          .set({ ...newUser });
      });
  }

  authenticateUser(user: any) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  signOut() {
    return this.auth.signOut();
  }

  initAuthListener() {
    this.auth.authState.subscribe((user) => {
      if (user) {
        return (this.userSubscription = this.firestore
          .doc(`${user.uid}/user`)
          .valueChanges()
          .subscribe((docUser: any) => {
            if (docUser) {
              const user = User.FirebaseUserInstance(docUser);
              this._user = user;
              this.store.dispatch(authActions.setUser({ user }));
            }
          }));
      }

      if (!user) {
        this._user = null;
        this.userSubscription?.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(incomeOutActions.unSetItems());
      }
    });
  }

  isAuth() {
    return this.auth.authState.pipe(map((user) => user !== null));
  }
}
