import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { filter } from 'rxjs';

@Component({
  selector: 'app-crew-container',
  imports: [
    RouterModule,
    MatTabsModule, // Import the whole module instead of individual components
    MatIconModule,
  ],
  templateUrl: './crew-container.component.html',
  styleUrl: './crew-container.component.scss',
})
export class CrewContainerComponent {
  tabs = [
    {
      label: 'Anmeldungen Verwalten',
      icon: 'confirmation_number',
      route: 'manage-tickets',
    },
    {
      label: 'Kalender Ansicht',
      icon: 'calendar_today',
      route: 'scheduler',
    },
    {
      label: 'Schichtplan Listenansicht (beta)',
      icon: 'list',
      route: 'list',
    },
    {
      label: 'Anmeldungen Verwalten (beta)',
      icon: 'manage_accounts',
      route: 'manage',
    },
  ];

  selectedIndex = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    // Set initial active tab based on current route
    this.updateSelectedIndex(this.router.url);

    // Listen to route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateSelectedIndex(event.url);
      });
  }

  private updateSelectedIndex(url: string) {
    const index = this.tabs.findIndex((tab) => url.includes(tab.route));
    if (index !== -1) {
      this.selectedIndex = index;
    }
  }

  onTabChange(index: number) {
    this.router.navigate(['/crew-area', this.tabs[index].route]);
  }
}
