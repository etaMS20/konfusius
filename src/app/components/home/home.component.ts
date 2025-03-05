import { Component, inject, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { WordPressApiService } from '../../services/wp-api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { InfoTabsComponent } from './info-tabs/info-tabs.component';
import { WPCategory } from '../../models/media.model';
import { map } from 'rxjs';
import { MappingService } from '../../services/mapping.service';
import { ImageContainerComponent } from './image-container/image-container.component';

@Component({
  selector: 'app-home',
  imports: [MatGridListModule, InfoTabsComponent, ImageContainerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly wpApi = inject(WordPressApiService);
  private readonly mappingService = inject(MappingService);

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

    this.wpApi
      .getMediaImages(WPCategory.GALLERY_2024)
      .pipe(
        map((data: any) => {
          return this.mappingService.mapImageUrls(data);
        }),
      )
      .subscribe((r) => {
        console.log(r);
      });
  }

  sanitizeText(text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

  showInfo(item: any) {
    console.log('Info for:', item);
  }
}
