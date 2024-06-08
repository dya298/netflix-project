import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const AuthGuardLogin: CanActivateFn = (route, state) => {
  const _loginService = inject(LoginService);
  const _router = inject(Router);

  if (!_loginService.IsLoggedIn) {
    return _router.createUrlTree(['/login']);
  } else {
    return true;
  }
};
