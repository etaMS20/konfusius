import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '@services/auth.service';
import { TICKETS_ON } from '@config/http.config';

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
    const ticketRoutes = ['tickets', 'checkout'];
    if (ticketRoutes.includes(route.routeConfig?.path ?? '') && !TICKETS_ON) {
      this.router.navigate(['/']);
      return false;
    }

    if (this.authService.isAuthenticatedBase()) {
      if (route.routeConfig?.path === 'crew-area') {
        if (this.authService.isAuthenticatedCrew()) {
          return true;
        } else {
          alert('insufficient access rights for this route');
          this.router.navigate(['/login'], {
            queryParams: { redirect: state.url },
          });
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
