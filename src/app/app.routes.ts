import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./components/home/home.component').then(
        (m) => m.HomeComponent,
      );
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'tickets',
    loadComponent: () => {
      return import('./components/tickets/tickets.component').then(
        (m) => m.TicketsComponent,
      );
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () => {
      return import('./components/login/login.component').then(
        (m) => m.LoginComponent,
      );
    },
  },
  {
    path: 'checkout',
    loadComponent: () => {
      return import(
        './components/checkout/checkout-container/checkout-container.component'
      ).then((m) => m.CheckoutContainerComponent);
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'order/:id',
    loadComponent: () => {
      return import(
        './components/order-overview/order-overview.component'
      ).then((m) => m.OrderOverviewComponent);
    },
  },
  {
    path: 'privacy',
    loadComponent: () => {
      return import(
        './components/shared/privacy-policy/privacy-policy.component'
      ).then((m) => m.PrivacyPolicyComponent);
    },
  },
];
