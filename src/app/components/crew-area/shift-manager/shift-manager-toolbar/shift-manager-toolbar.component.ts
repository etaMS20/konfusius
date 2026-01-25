import { Component, input, model, output, signal } from '@angular/core';
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
import { DividerModule } from 'primeng/divider';
import { WcOrderStatus } from '@models/order.model';
import { SelectModule } from 'primeng/select';

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
    DividerModule,
    SelectModule,
  ],
  templateUrl: './shift-manager-toolbar.component.html',
  styleUrl: './shift-manager-toolbar.component.scss',
})
export class ShiftManagerToolbarComponent {
  actionsDisabled = input<boolean>(true);
  nameFilterTypeChange = output<string[]>();
  scopeYearChange = output<string[]>();
  orderStatusChange = output<WcOrderStatus>();

  nameFilterOptions = [
    {
      tooltip: 'Namen einbeziehen',
      value: 'name',
      icon: 'pi pi-user',
    },
    { tooltip: 'E-Mail einbeziehen', value: 'email', icon: 'pi pi-at' },
    {
      tooltip: 'Schicht einbeziehen',
      value: 'shift',
      icon: 'pi pi-hammer',
    },
  ];

  yearOptions = ['2025', '2026', '2027'];

  selectedFilters = model<string[]>([]);
  keywordFilter = model<string>('');
  contactPersonFilter = model<string>('');

  selectedYears = input.required<string[]>();

  buttonConfigs: {
    label: string;
    icon: string;
    tooltip: string;
    severity: ButtonSeverity;
    onClick: () => void;
  }[] = [
    {
      label: 'On-Hold',
      icon: 'pi pi-undo',
      tooltip: 'Ausgewählte Anmeldungen auf "On-Hold" setzen',
      severity: 'secondary',
      onClick: () => this.orderStatusChange.emit('on-hold'),
    },
    {
      label: 'Stornieren',
      icon: 'pi pi-times-circle',
      tooltip: 'Ausgewählte Anmeldungen stornieren',
      severity: 'secondary',
      onClick: () => this.orderStatusChange.emit('cancelled'),
    },
    {
      label: 'Löschen',
      icon: 'pi pi-trash',
      tooltip: 'Ausgewählte Anmeldungen löschen',
      severity: 'secondary',
      onClick: () => this.orderStatusChange.emit('trash'),
    },
    {
      label: 'Bezahlt',
      icon: 'pi pi-check-circle',
      tooltip: 'Ausgewählte Anmeldungen auf Bezahlt setzen',
      severity: 'success',
      onClick: () => this.orderStatusChange.emit('completed'),
    },
  ];

  onScopeYearChange(years: string[]) {
    this.scopeYearChange.emit(years);
  }
}
