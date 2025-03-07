import type { PipeTransform } from '@angular/core';
import { inject, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  protected sanitizer = inject(DomSanitizer);

  /** sanatize html */
  public transform(value: any): any {
    if (!value || !value.length) {
      return '';
    }
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
