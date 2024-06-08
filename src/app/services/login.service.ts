import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  LoginUser(email: string, password: string) {
    localStorage.setItem('token', `${email} + ${password}`);
  }

  LogoutUser() {
    localStorage.removeItem('token');
  }

  get IsLoggedIn() {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('token')) {
        return true;
      }
    }
    return false;
  }
}
