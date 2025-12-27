import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { parse } from 'path';

@Component({
  selector: 'app-crew-container',
  imports: [
    MatToolbar,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './crew-container.component.html',
  styleUrl: './crew-container.component.scss',
})
export class CrewContainerComponent {}
