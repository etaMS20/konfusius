import { Component, Inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  standalone: true,
  imports: [MatIconButton, MatIconModule, MatDividerModule, SafeHtmlPipe],
})
export class ProductDialogComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: any,
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
