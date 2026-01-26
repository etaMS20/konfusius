import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';

@Component({
  selector: 'kf-crew-list',
  imports: [TreeTableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true,
})
export class ListComponent {
  files: TreeNode[] = [
    {
      data: { name: 'Documents', size: '75kb', type: 'Folder' },
      children: [
        {
          data: { name: 'Resume.pdf', size: '30kb', type: 'PDF' },
        },
        {
          data: { name: 'CoverLetter.docx', size: '15kb', type: 'Word' },
        },
      ],
    },
    {
      data: { name: 'Pictures', size: '150kb', type: 'Folder' },
      children: [
        {
          data: { name: 'Vacation.jpg', size: '100kb', type: 'Image' },
        },
        {
          data: { name: 'Family.png', size: '50kb', type: 'Image' },
        },
      ],
    },
  ];
}
