import { Component, inject, OnInit, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { WordPressApiService } from '../../services/api/wp-api.service';
import { InfoTabsComponent } from './info-tabs/info-tabs.component';
import { ImageContainerComponent } from './image-container/image-container.component';
import { BlogPost, BlogPostId } from 'src/app/models/blog-post.model';
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
  private readonly includePosts = [
    BlogPostId.INTRO,
    BlogPostId.KONFUSIUS,
    BlogPostId.ECKDATEN,
    BlogPostId.LETTER,
    BlogPostId.PROGRAMM_SHORT,
  ];

  wpPosts = signal<Array<BlogPost>>([]);

  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.wpApi.getPosts(this.includePosts).subscribe((r) => {
      this.wpPosts.set(r);
    });
  }

  get intro() {
    return this.wpPosts().find((p) => p.id === BlogPostId.INTRO);
  }

  get konfusius() {
    return this.wpPosts().find((p) => p.id === BlogPostId.KONFUSIUS);
  }

  get eckdaten() {
    return this.wpPosts().find((p) => p.id === BlogPostId.ECKDATEN);
  }

  get letter() {
    return this.wpPosts().find((p) => p.id === BlogPostId.LETTER);
  }

  get programm_short() {
    return this.wpPosts().find((p) => p.id === BlogPostId.PROGRAMM_SHORT);
  }

  openLetterDialog(event: Event) {
    const data: BaseDialogData = {
      title: 'Kleine Anekdote zum Programm',
      content: this.letter?.content.rendered,
      imageMeta: {
        src: './public/scroll_image.png',
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
