import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated: boolean = null;

  public get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    afAuth.authState.subscribe(user => this._isAuthenticated = !!user);
  }

  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(userCred => {
      // TODO - add user to firestore
      console.log('Created user', userCred);
      this.router.navigate(['/']);
    });
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['/']);
    });
  }

  logout() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/auth/register']);
    });
  }
}
