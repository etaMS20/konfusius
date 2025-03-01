import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ErrorDialogComponent } from './error-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { WcStoreError } from './error-types';

@Injectable({
  providedIn: 'root',
})
export class ErrorDialogService {
  constructor(private readonly dialog: MatDialog) {}

  handleError(error: HttpErrorResponse) {
    this.openDialog(error.error);
  }

  openDialog(data: WcStoreError): Observable<boolean> {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: data,
      width: '400px',
    });

    return dialogRef.afterClosed();
  }
}
