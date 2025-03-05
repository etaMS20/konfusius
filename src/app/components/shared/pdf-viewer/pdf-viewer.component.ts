import { Component, Input, type OnInit } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer',
  imports: [PdfViewerModule],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.scss',
  standalone: true,
})
export class PdfViewer implements OnInit {
  @Input() pdfSrc: string | Uint8Array | undefined =
    './assets/Grundriss_Konfusi24_A2.pdf';

  // Add these properties to control the PDF display
  zoom = 1;
  originalSize = false;
  fitToPage = true;
  showAll = true;

  ngOnInit() {
    // Any initialization logic can go here
  }
}
