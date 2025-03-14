import { Component, inject, OnInit, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { WordPressApiService } from '../../services/api/wp-api.service';
import { InfoTabsComponent } from './info-tabs/info-tabs.component';
import { ImageContainerComponent } from './image-container/image-container.component';
import { BlogPost } from 'src/app/models/blog-post.model';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { InfoBoxComponent } from './info-box/info-box.component';

@Component({
  selector: 'app-home',
  imports: [
    MatGridListModule,
    InfoTabsComponent,
    ImageContainerComponent,
    SafeHtmlPipe,
    InfoBoxComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private readonly wpApi = inject(WordPressApiService);

  introText = signal<BlogPost | undefined>(undefined);
  introText2 = signal<BlogPost | undefined>(undefined);
  eckDaten = signal<BlogPost | undefined>(undefined);

  ngOnInit(): void {
    this.wpApi.getPostById(1706).subscribe((post) => {
      this.introText.set(post);
    });

    this.wpApi.getPostById(1733).subscribe((post) => {
      this.introText2.set(post);
    });

    this.wpApi.getPostById(1735).subscribe((post) => {
      this.eckDaten.set(post);
    });
  }
}
