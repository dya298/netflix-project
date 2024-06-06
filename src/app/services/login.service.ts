import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  LoginUser(email: string, password: string) {
    localStorage.setItem('token', Math.random() + '');
  }

  LogoutUser() {
    localStorage.removeItem('token');
  }

  get isLoggedIn() {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('token')) {
        return true;
      }
    }
    return false;
  }
}
