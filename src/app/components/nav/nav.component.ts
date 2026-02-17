import { Component, signal, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TICKETS_ON } from '@config/http.config';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '@services/auth.service';
import { InfoButtonComponent } from './info-button/info-button.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    InfoButtonComponent,
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  authService = inject(AuthService);
  isMenuOpen = signal(false);
  isScrolled = false;
  ticketsActive = signal<boolean>(TICKETS_ON);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMenu() {
    this.isMenuOpen.update((value) => !value);
  }

  logout() {
    this.authService.logout();
  }
}
