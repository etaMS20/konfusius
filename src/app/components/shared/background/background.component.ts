import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { WordPressApiService } from '@services/api/wp-api.service';
import { MappingService } from '@services/mapping.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  imports: [CommonModule],
})
export class BackgroundComponent implements OnInit {
  wpApi = inject(WordPressApiService);
  mappingService = inject(MappingService);
  backgroundUrl = signal<string>('');
  backgroundPosition = 'center 0px';

  ngOnInit(): void {
    this.wpApi
      .getMediaImageById(1850)
      .pipe(
        map((data: any) => {
          return this.mappingService.mapImage(data);
        }),
      )
      .subscribe((r) => {
        this.backgroundUrl.set(r.url);
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.scrollY;
    this.backgroundPosition = `center ${scrollPosition * 0.1}px`;
  }
}
