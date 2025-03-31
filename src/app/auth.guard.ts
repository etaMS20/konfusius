import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (this.authService.isAuthenticatedBase()) {
      if (route.routeConfig?.path === 'crew-area') {
        if (this.authService.isAuthenticatedCrew()) {
          return true;
        } else {
          alert('insufficient access rights for this route');
          return false;
        }
      }
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: { redirect: state.url },
      });
      return false;
    }
  }
}
