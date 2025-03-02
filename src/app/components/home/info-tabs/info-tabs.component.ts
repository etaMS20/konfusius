import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';

interface InfoTab {
  icon: string;
  label: string;
  content?: string;
}

@Component({
  selector: 'app-info-tabs',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule, MatExpansionModule],
  templateUrl: './info-tabs.component.html',
  styleUrls: ['./info-tabs.component.scss'],
})
export class InfoTabsComponent {
  tabs: InfoTab[] = [
    {
      icon: 'directions_car',
      label: 'Anreise',
      content: '',
    },
    {
      icon: 'restaurant',
      label: 'Verpflegung',
      content: '',
    },
    {
      icon: 'camping',
      label: 'Camping',
      content: '',
    },
  ];
}
