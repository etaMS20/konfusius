import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./home/home.component').then((m) => m.HomeComponent);
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'tickets',
    loadComponent: () => {
      return import('./tickets/tickets.component').then(
        (m) => m.TicketsComponent
      );
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () => {
      return import('./login/login.component').then((m) => m.LoginComponent);
    },
  },
];
