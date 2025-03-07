import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-pdf-download-viewer',
  templateUrl: './pdf-download-viewer.component.html',
  styleUrls: ['./pdf-download-viewer.component.scss'],
  imports: [MatButtonModule, MatIcon],
})
export class PdfDownloadViewerComponent {
  // URL for the PDF file
  public readonly srcLink = input.required<string>();

  constructor() {}

  downloadPdf(): void {
    const link = document.createElement('a');
    link.href = this.srcLink();
    link.download = 'lageplan_konfusius.pdf';
    link.click();
  }

  // Function to open the PDF in a new window (for viewing)
  openPdfViewer(): void {
    window.open(this.srcLink(), '_blank');
  }
}
