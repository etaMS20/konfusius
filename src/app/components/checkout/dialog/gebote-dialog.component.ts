import { CommonModule, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { BlogPost } from 'src/app/models/blog-post.model';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';

@Component({
  selector: 'konfuse-gebote-dialog',
  templateUrl: './gebote-dialog.component.html',
  styleUrls: ['./gebote-dialog.component.scss'],
  imports: [
    MatIconButton,
    MatIconModule,
    MatDividerModule,
    SafeHtmlPipe,
    CommonModule,
  ],
  standalone: true,
})
export class KonfuseGeboteDialog {
  constructor(
    private readonly dialogRef: MatDialogRef<KonfuseGeboteDialog>,
    @Inject(MAT_DIALOG_DATA) public gebote: BlogPost,
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}

// TODO: make dialog generic and shared
