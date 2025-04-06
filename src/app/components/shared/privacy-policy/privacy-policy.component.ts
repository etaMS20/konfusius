import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { BlogPost, BlogPostId } from '@models/blog-post.model';
import { SafeHtmlPipe } from '@pipes/safe-html.pipe';
import { WordPressApiService } from '@services/api/wp-api.service';
import { ErrorDialogService } from '@shared/errors/error-dialog.service';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  imports: [SafeHtmlPipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {
  errorService = inject(ErrorDialogService);
  private readonly wpApi = inject(WordPressApiService);
  private readonly destroy$ = new Subject<void>();

  privacyPost = signal<BlogPost | undefined>(undefined);

  constructor() {}

  ngOnInit(): void {
    this.wpApi
      .getPostById(BlogPostId.PRIVACY)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
      )
      .subscribe((r) => {
        this.privacyPost.set(r);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
