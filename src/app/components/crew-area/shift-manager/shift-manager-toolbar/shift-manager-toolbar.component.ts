import { Component, input, OnInit, output, signal } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgFor } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';
import { ButtonSeverity } from 'primeng/button';

@Component({
  selector: 'kf-shift-manager-toolbar',
  imports: [
    ToolbarModule,
    ButtonModule,
    IconField,
    InputIcon,
    InputTextModule,
    SelectButtonModule,
    FormsModule,
    MultiSelectModule,
    NgFor,
    Tooltip,
  ],
  templateUrl: './shift-manager-toolbar.component.html',
  styleUrl: './shift-manager-toolbar.component.scss',
})
export class ShiftManagerToolbarComponent {
  actionsDisabled = input<boolean>(true);
  nameFilterTypeChange = output<string[]>();
  scopeYearChange = output<string[]>();

  nameFilterOptions = [
    { label: 'Name', value: 'name' },
    { label: 'E-Mail', value: 'e-mail' },
    { label: 'Schicht', value: 'shift' },
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

  onScopeYearChange(years: string[]) {
    this.scopeYearChange.emit(years);
    console.log('Scope year changed:', years);
  }
}
