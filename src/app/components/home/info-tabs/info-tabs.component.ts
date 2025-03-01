import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

interface InfoTab {
  icon: string;
  label: string;
  title: string;
  description: string;
  bulletPoints: string[];
}

@Component({
  selector: 'app-info-tabs',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule],
  templateUrl: './info-tabs.component.html',
  styleUrls: ['./info-tabs.component.scss'],
})
export class InfoTabsComponent {
  tabs: InfoTab[] = [
    {
      icon: 'directions_car',
      label: 'Anreise',
      title: 'Anreise & Parken',
      description:
        'Details zur Anreise und Parkmöglichkeiten werden nach erfolgreicher Anmeldung bekannt gegeben.',
      bulletPoints: [
        'Shuttleservice vom Bahnhof verfügbar',
        'Ausreichend Parkplätze vorhanden',
        'Fahrgemeinschaften werden empfohlen',
      ],
    },
    {
      icon: 'restaurant',
      label: 'Verpflegung',
      title: 'Essen & Getränke',
      description:
        'Für Getränke und Speisen ist während des gesamten Festivals gesorgt.',
      bulletPoints: [
        'Verschiedene Food Trucks vor Ort',
        'Getränkestand mit lokalen Spezialitäten',
        'Vegetarische und vegane Optionen',
        'Eigene Getränke für das Camping erlaubt',
      ],
    },
    {
      icon: 'camping',
      label: 'Camping',
      title: 'Camping Informationen',
      description:
        'Zeltplätze sind im Ticketpreis inbegriffen. Bringt euer eigenes Camping-Equipment mit.',
      bulletPoints: [
        'Sanitäre Anlagen vorhanden',
        'Stromanschlüsse in ausgewiesenen Bereichen',
        'Gemeinsamer Grillbereich',
        '24/7 Security auf dem Gelände',
      ],
    },
  ];
}
