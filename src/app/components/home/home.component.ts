import { Component, inject, OnInit, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { WordPressApiService } from '../../services/api/wp-api.service';
import { InfoTabsComponent } from './info-tabs/info-tabs.component';
import { ImageContainerComponent } from './image-container/image-container.component';
import { BlogPost } from 'src/app/models/blog-post.model';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { InfoBoxComponent } from './info-box/info-box.component';
import { NgOptimizedImage } from '@angular/common';
import { DialogPopupComponent } from '@shared/dialog-popup/dialog-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { BaseDialogData } from '@models/types.model';

@Component({
  selector: 'app-home',
  imports: [
    MatGridListModule,
    InfoTabsComponent,
    ImageContainerComponent,
    SafeHtmlPipe,
    InfoBoxComponent,
    NgOptimizedImage,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private readonly wpApi = inject(WordPressApiService);

  letterText = signal<BlogPost | undefined>(undefined);
  introText = signal<BlogPost | undefined>(undefined);
  introText2 = signal<BlogPost | undefined>(undefined);
  eckDaten = signal<BlogPost | undefined>(undefined);

  constructor(private readonly dialog: MatDialog) {}

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

    this.wpApi.getPostById(1713).subscribe((post) => {
      this.letterText.set(post);
    });
  }

  openLetterDialog(event: Event) {
    const data: BaseDialogData = {
      title: 'Programm 25',
      content: this.letterText(),
      imageMeta: {
        src: 'assets/scroll_image.png',
      },
    };
    event.stopPropagation();
    this.dialog.open(DialogPopupComponent, {
      data: data,
      width: '60vw',
      height: '70vh',
      maxWidth: '800px',
      maxHeight: '800px',
      minWidth: '350px',
    });
  }
}
