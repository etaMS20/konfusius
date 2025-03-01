import { Component, Inject, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  standalone: true,
  imports: [MatIconButton, MatIconModule, MatDividerModule],
})
export class ProductDialogComponent implements OnInit {
  sanitizedDescription?: SafeHtml;

  constructor(
    private readonly dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: any,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.sanitizeDescription();
  }

  sanitizeDescription(): void {
    this.sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(
      this.product.description || ''
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
