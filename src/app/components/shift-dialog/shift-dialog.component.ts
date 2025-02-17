import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-shift-dialog',
  templateUrl: './shift-dialog.component.html',
  styleUrls: ['./shift-dialog.component.scss'],
  standalone: true,
})
export class ShiftDialogComponent implements OnInit {
  sanitizedDescription?: SafeHtml;

  constructor(
    @Inject(MAT_DIALOG_DATA) public shift: any,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.sanitizeDescription();
  }

  sanitizeDescription(): void {
    this.sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(
      this.shift.description || ''
    );
  }
}
