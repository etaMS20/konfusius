import { Component, Input } from '@angular/core';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';

@Component({
  selector: 'app-info-box',
  imports: [SafeHtmlPipe],
  templateUrl: './info-box.component.html',
  styleUrl: './info-box.component.scss',
})
export class InfoBoxComponent {
  @Input() content? = '';
  @Input() title? = '';
}
