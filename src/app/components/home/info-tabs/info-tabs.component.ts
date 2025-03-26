import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { WordPressApiService } from '../../../services/api/wp-api.service';
import { BlogPost, BlogPostId } from 'src/app/models/blog-post.model';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { PdfDownloadViewerComponent } from '@shared/pdf-download-viewer/pdf-download-viewer.component';
import { catchError, throwError } from 'rxjs';
import { ErrorDialogService } from '@shared/errors/error-dialog.service';

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
  errorService = inject(ErrorDialogService);
  private readonly wpApi = inject(WordPressApiService);
  wpInfoPosts = signal<Array<BlogPost>>([]);
  pdfUrl = signal<string>('./public/Grundriss_Konfusi24_A2.pdf');
  private readonly includePosts = [
    BlogPostId.KODEX_INFO,
    BlogPostId.CAMPING_INFO,
    BlogPostId.ANMELDUNG_INFO,
  ];

  tabs = computed<InfoTab[]>(() => {
    return [
      {
        icon: 'icecream',
        label: 'Verpflegung & Camping',
        content: this.camping?.content.rendered,
      },
      {
        icon: 'people',
        label: 'Partizipation & Anmeldung',
        content: this.anmeldung?.content.rendered,
      },
      {
        icon: 'balance',
        label: 'Verhaltenskodex & Klauseregeln',
        content: this.kodex?.content.rendered,
      },
    ];
  });

  ngOnInit(): void {
    this.wpApi
      .getPosts(this.includePosts)
      .pipe(
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
      )
      .subscribe((r) => {
        this.wpInfoPosts.set(r);
      });
  }

  get anmeldung() {
    return this.wpInfoPosts().find((p) => p.id === BlogPostId.ANMELDUNG_INFO);
  }

  get camping() {
    return this.wpInfoPosts().find((p) => p.id === BlogPostId.CAMPING_INFO);
  }

  get kodex() {
    return this.wpInfoPosts().find((p) => p.id === BlogPostId.KODEX_INFO);
  }
}
