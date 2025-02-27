import { Component, inject, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ImageSliderComponent } from '../components/image-slider/image-slider.component';
import { WordPressApiService } from '../services/wp-api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { InfoTabsComponent } from '../components/info-tabs/info-tabs.component';

@Component({
  selector: 'app-home',
  imports: [MatGridListModule, ImageSliderComponent, InfoTabsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly wpApi = inject(WordPressApiService);

  introText = signal<SafeHtml>('');
  programText = signal<SafeHtml>('');
  textLoadedP = signal<boolean>(false);

  constructor(private readonly sanitizer: DomSanitizer) {
    this.wpApi.getPostById(1706).subscribe((r) => {
      this.introText.set(this.sanitizeText(r.content.rendered));
      this.textLoadedP.set(true); // mark as loaded
    });

    this.wpApi.getPostById(1713).subscribe((r) => {
      this.programText.set(this.sanitizeText(r.content.rendered));
    });
  }

  sanitizeText(text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

  carouselImages = [
    { url: 'assets/schichten/abbau.png', alt: 'First slide' },
    { url: 'assets/schichten/bar_keller.png', alt: 'Second slide' },
    { url: 'assets/schichten/bar.png', alt: 'Third slide' },
  ];

  showInfo(item: any) {
    console.log('Info for:', item);
  }
}
