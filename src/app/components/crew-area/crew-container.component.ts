import { Component, OnInit, signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-crew-container',
  imports: [RouterModule, TabsModule],
  templateUrl: './crew-container.component.html',
  styleUrl: './crew-container.component.scss',
})
export class CrewContainerComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  currentTabRoute = signal('manage');

  tabs = [
    {
      label: 'Anmeldungen Verwalten',
      icon: 'pi pi-address-book',
      route: 'manage',
    },
    {
      label: 'Kalender Ansicht',
      icon: 'pi pi-calendar',
      route: 'scheduler',
    },
    {
      label: 'Schichtplan Listenansicht',
      icon: 'pi pi-list',
      route: 'list',
    },
  ];

  ngOnInit() {
    const getTab = () => {
      const child = this.route.firstChild;
      return child?.snapshot.url[0]?.path ?? 'manage';
    };

    this.currentTabRoute.set(getTab());

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.currentTabRoute.set(getTab()));
  }
}
