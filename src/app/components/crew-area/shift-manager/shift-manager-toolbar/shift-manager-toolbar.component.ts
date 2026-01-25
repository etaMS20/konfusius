import { Component, Input, input, OnInit, output, signal } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgFor } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';
import { ButtonSeverity } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'kf-shift-manager-toolbar',
  imports: [
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    SelectButtonModule,
    FormsModule,
    MultiSelectModule,
    NgFor,
    Tooltip,
    InputGroupModule,
    InputGroupAddonModule,
  ],
  templateUrl: './shift-manager-toolbar.component.html',
  styleUrl: './shift-manager-toolbar.component.scss',
})
export class ShiftManagerToolbarComponent {
  actionsDisabled = input<boolean>(true);
  nameFilterTypeChange = output<string[]>();
  scopeYearChange = output<string[]>();

  keywordFilter = signal<string>('');

  nameFilterOptions = [
    { tooltip: 'Name', value: 'name', icon: 'pi pi-user' },
    { tooltip: 'E-Mail', value: 'e-mail', icon: 'pi pi-at' },
    { tooltip: 'Schicht', value: 'shift', icon: 'pi pi-hammer' },
  ];

  yearOptions = ['2025', '2026', '2027'];

  selectedFilters = signal<string[]>(
    this.nameFilterOptions.map((opt) => opt.value),
  );

  selectedYears = signal<string[]>(['2025']);

  buttonConfigs: {
    label: string;
    icon: string;
    tooltip: string;
    severity: ButtonSeverity;
  }[] = [
    {
      label: 'On-Hold',
      icon: 'pi pi-undo',
      tooltip: 'Ausgewählte Anmeldungen auf "On-Hold" setzen',
      severity: 'secondary',
    },
    {
      label: 'Stornieren',
      icon: 'pi pi-times-circle',
      tooltip: 'Ausgewählte Anmeldungen stornieren',
      severity: 'secondary',
    },
    {
      label: 'Löschen',
      icon: 'pi pi-trash',
      tooltip: 'Ausgewählte Anmeldungen löschen',
      severity: 'secondary',
    },
    {
      label: 'Bezahlt',
      icon: 'pi pi-check-circle',
      tooltip: 'Ausgewählte Anmeldungen auf Bezahlt setzen',
      severity: 'success',
    },
  ];

  onFilterChange(values: string[]) {
    this.nameFilterTypeChange.emit(values);
    console.log('Filter changed:', values);
  }

  onFilterTypeChange(value: string) {
    console.log('Filter type changed:', value);
  }

  onScopeYearChange(years: string[]) {
    this.scopeYearChange.emit(years);
    console.log('Scope year changed:', years);
  }
}
