import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { WordPressApiService } from '../../../services/wp-api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PdfViewer } from '../../shared/pdf-viewer/pdf-viewer.component';

interface InfoTab {
  icon: string;
  label: string;
  content?: string | SafeHtml;
}

@Component({
  selector: 'app-info-tabs',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatExpansionModule,
    PdfViewer,
  ],
  templateUrl: './info-tabs.component.html',
  styleUrls: ['./info-tabs.component.scss'],
})
export class InfoTabsComponent {
  private readonly wpApi = inject(WordPressApiService);

  campingText = signal<SafeHtml>('');
  anmeldungText = signal<SafeHtml>('');
  regelnText = signal<SafeHtml>('');

  tabs = computed<InfoTab[]>(() => {
    return [
      {
        icon: '',
        label: 'Verpflegung & Camping',
        content: this.campingText(),
      },
      {
        icon: '',
        label: 'Partizipation & Anmeldung',
        content: this.anmeldungText(),
      },
      {
        icon: '',
        label: 'Verhaltenskodex & Klauseregeln',
        content: this.regelnText(),
      },
    ];
  });

  constructor(private readonly sanitizer: DomSanitizer) {
    this.wpApi.getPostById(1737).subscribe((r) => {
      this.campingText.set(this.sanitizeText(r.content.rendered));
    });

    this.wpApi.getPostById(1739).subscribe((r) => {
      this.anmeldungText.set(this.sanitizeText(r.content.rendered));
    });

    this.wpApi.getPostById(1741).subscribe((r) => {
      this.regelnText.set(this.sanitizeText(r.content.rendered));
    });
  }

  sanitizeText(text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}
