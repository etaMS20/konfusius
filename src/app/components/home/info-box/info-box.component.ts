import { Component, inject, OnInit, signal } from '@angular/core';
import { BlogPost } from 'src/app/models/blog-post.model';
import { WordPressApiService } from 'src/app/services/wp-api.service';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';

@Component({
  selector: 'app-info-box',
  imports: [SafeHtmlPipe],
  templateUrl: './info-box.component.html',
  styleUrl: './info-box.component.scss',
})
export class InfoBoxComponent implements OnInit {
  private readonly wpApi = inject(WordPressApiService);

  eckDaten = signal<BlogPost | undefined>(undefined);

  ngOnInit(): void {
    this.wpApi.getPostById(1735).subscribe((post) => {
      this.eckDaten.set(post);
    });
  }
}
