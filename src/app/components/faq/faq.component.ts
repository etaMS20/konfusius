import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { BlogPost, BlogPostId } from '@models/blog-post.model';
import { FaqSection } from '@models/types.model';
import { SafeHtmlPipe } from '@pipes/safe-html.pipe';
import { WordPressApiService } from '@services/api/wp-api.service';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { ErrorDialogService } from '@shared/errors/error-dialog.service';

@Component({
  selector: 'app-faq',
  imports: [SafeHtmlPipe, MatExpansionModule, CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent implements OnInit, OnDestroy {
  private readonly wpApi = inject(WordPressApiService);
  private readonly destroy$ = new Subject<void>();
  errorService = inject(ErrorDialogService);

  faqContent = signal<BlogPost | undefined>(undefined);
  faqQuestions = computed(() => {
    return this.extractQuestionsAndAnswers(this.faqContent()?.content.rendered);
  });

  ngOnInit(): void {
    this.wpApi
      .getPostById(BlogPostId.FAQ)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
      )
      .subscribe((post) => {
        this.faqContent.set(post);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  extractQuestionsAndAnswers(content?: string): Array<FaqSection> {
    const questions = [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(content ?? '', 'text/html');

    const headings = doc.querySelectorAll('h3');
    const paragraphs = doc.querySelectorAll('p');

    for (let i = 0; i < headings.length; i++) {
      questions.push({
        question: headings[i].innerHTML,
        answer: paragraphs[i]?.innerHTML || '',
      });
    }
    return questions;
  }
}
