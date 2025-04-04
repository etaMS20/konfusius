import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { BlogPost } from '@models/blog-post.model';
import { FaqSection } from '@models/types.model';
import { SafeHtmlPipe } from '@pipes/safe-html.pipe';
import { WordPressApiService } from '@services/api/wp-api.service';

@Component({
  selector: 'app-faq',
  imports: [SafeHtmlPipe, MatExpansionModule, CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent implements OnInit {
  private readonly wpApi = inject(WordPressApiService);

  faqContent = signal<BlogPost | undefined>(undefined);
  faqQuestions = computed(() => {
    return this.extractQuestionsAndAnswers(this.faqContent()?.content.rendered);
  });

  ngOnInit(): void {
    this.wpApi.getPostById(1926).subscribe((post) => {
      this.faqContent.set(post);
    });
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
