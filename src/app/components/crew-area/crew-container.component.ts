import { AsyncPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-crew-container',
  imports: [RouterModule, TabsModule],
  templateUrl: './crew-container.component.html',
  styleUrl: './crew-container.component.scss',
})
export class CrewContainerComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  currentTabRoute = signal<string>('manage');

  // TODO: Bind tabs to route
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const tabRoute = params['tab'] || 'manage';
      this.currentTabRoute.set(tabRoute);
    });
  }
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
}
