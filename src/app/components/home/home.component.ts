import { Component, inject, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { WordPressApiService } from '../../services/wp-api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { InfoTabsComponent } from './info-tabs/info-tabs.component';
import { ImageContainerComponent } from './image-container/image-container.component';

@Component({
  selector: 'app-home',
  imports: [MatGridListModule, InfoTabsComponent, ImageContainerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly wpApi = inject(WordPressApiService);

  introText = signal<SafeHtml>('');
  introText2 = signal<SafeHtml>('');
  eckDaten = signal<SafeHtml>('');

  textLoadedP = signal<boolean>(false);

  constructor(private readonly sanitizer: DomSanitizer) {
    this.wpApi.getPostById(1706).subscribe((r) => {
      this.introText.set(this.sanitizeText(r.content.rendered));
      this.textLoadedP.set(true); // mark as loaded
    });

    this.wpApi.getPostById(1733).subscribe((r) => {
      this.introText2.set(this.sanitizeText(r.content.rendered));
    });

    this.wpApi.getPostById(1735).subscribe((r) => {
      this.eckDaten.set(this.sanitizeText(r.content.rendered));
    });
  }

  sanitizeText(text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}
