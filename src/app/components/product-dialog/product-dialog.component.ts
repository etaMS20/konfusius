import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  standalone: true,
})
export class ProductDialogComponent implements OnInit {
  sanitizedDescription?: SafeHtml;

  constructor(
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
}
