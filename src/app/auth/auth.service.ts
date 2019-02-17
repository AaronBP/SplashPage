import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: boolean = null;

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.authState = !!user;
    });
   }

}
