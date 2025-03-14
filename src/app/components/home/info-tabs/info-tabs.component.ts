import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { WordPressApiService } from '../../../services/api/wp-api.service';
import { BlogPost } from 'src/app/models/blog-post.model';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { PdfDownloadViewerComponent } from '@shared/pdf-download-viewer/pdf-download-viewer.component';

interface InfoTab {
  icon: string;
  label: string;
  content?: string;
}

@Component({
  selector: 'app-info-tabs',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatExpansionModule,
    PdfDownloadViewerComponent,
    SafeHtmlPipe,
  ],
  templateUrl: './info-tabs.component.html',
  styleUrls: ['./info-tabs.component.scss'],
})
export class InfoTabsComponent implements OnInit {
  private readonly wpApi = inject(WordPressApiService);

  pdfUrl = signal<string>('./assets/Grundriss_Konfusi24_A2.pdf');

  campingText = signal<BlogPost | undefined>(undefined);
  anmeldungText = signal<BlogPost | undefined>(undefined);
  regelnText = signal<BlogPost | undefined>(undefined);

  tabs = computed<InfoTab[]>(() => {
    return [
      {
        icon: '',
        label: 'Verpflegung & Camping',
        content: this.campingText()?.content.rendered,
      },
      {
        icon: '',
        label: 'Partizipation & Anmeldung',
        content: this.anmeldungText()?.content.rendered,
      },
      {
        icon: '',
        label: 'Verhaltenskodex & Klauseregeln',
        content: this.regelnText()?.content.rendered,
      },
    ];
  });

  ngOnInit(): void {
    this.wpApi.getPostById(1737).subscribe((post) => {
      this.campingText.set(post);
    });

    this.wpApi.getPostById(1739).subscribe((post) => {
      this.anmeldungText.set(post);
    });

    this.wpApi.getPostById(1741).subscribe((post) => {
      this.regelnText.set(post);
    });
  }
}
