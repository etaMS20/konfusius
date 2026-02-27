import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WcProduct } from '@models/product.model';
import { WcStoreAPI } from '@services/api/wc-store-api.service';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatExpansionModule } from '@angular/material/expansion';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

interface TreeNodeData {
  name: string;
  planned?: number | string;
  inStock?: number | string;
  ordered?: number;
  type: string;
  meta?: {
    parentPlanned?: number;
    variableBasic?: boolean;
  };
}
type KTreeNode = TreeNode<TreeNodeData>;

type ColumnDef = {
  field: keyof TreeNodeData;
  header: string;
  width?: string;
  showFooter?: boolean;
};

@Component({
  selector: 'kf-crew-list',
  imports: [
    TreeTableModule,
    NgFor,
    NgIf,
    MatExpansionModule,
    ToolbarModule,
    ButtonModule,
    AsyncPipe,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true,
})
export class ListComponent implements OnInit {
  private readonly wcStoreApi = inject(WcStoreAPI);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly treeNodes = signal<KTreeNode[]>([]);

  loading$ = new BehaviorSubject<boolean>(false);

  protected readonly columns: ColumnDef[] = [
    { field: 'name', header: 'Schicht', width: '40%' },
    { field: 'planned', header: 'Geplant', width: '20%', showFooter: true },
    {
      field: 'inStock',
      header: 'Live',
      width: '20%',
      showFooter: true,
    },
    { field: 'type', header: 'Typ', width: '20%' },
  ];

  constructor() {}

  ngOnInit() {
    this.loadInitialProducts();
    this.loading$.next(true);
  }

  sumColumn(field: string): number {
    return this.treeNodes().reduce((total, node: TreeNode) => {
      const value = Number(node.data?.[field]) || 0;
      return total + value;
    }, 0);
  }
  private loadInitialProducts() {
    this.wcStoreApi
      .listProducts([22, 32])
      .pipe(
        catchError((error) => {
          console.error('Error loading initial products:', error);
          return throwError(() => error);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((products: WcProduct[]) => {
        const initialNodes: KTreeNode[] = products.map((p) => ({
          data: {
            name: p.name,
            inStock: p.extensions.konfusius_shift?.stock_count,
            type: p.type,
            planned: p.extensions.konfusius_shift?.planned_stock,
          },
          children: p.extensions.konfusius_shift?.variation_data?.map((v) => ({
            data: {
              name: v.name,
              type: 'variation',
              planned: v.planned_stock ?? '...',
              inStock: v.stock_count ?? '...',
            },
          })),
        }));
        this.treeNodes.set(initialNodes);
        this.loading$.next(false);
      });
  }

  flattenTree(nodes: TreeNode[], level = 0): any[] {
    const rows: any[] = [];
    for (const node of nodes) {
      const row: any = {};
      this.columns.forEach((col, index) => {
        // only indent the first column
        row[col.field] =
          index === 0
            ? ' '.repeat(level * 4) + node.data[col.field]
            : node.data[col.field];
      });
      rows.push(row);
      if (node.children?.length) {
        rows.push(...this.flattenTree(node.children, level + 1));
      }
    }
    return rows;
  }

  exportToPDF() {
    const pdf = new jsPDF();
    const rows = this.flattenTree(this.treeNodes());
    const footerRow: Record<string, string | number> = {
      name: 'Total',
      planned: this.sumColumn('planned'),
      inStock: this.sumColumn('inStock'),
      type: '',
    };

    autoTable(pdf, {
      head: [this.columns.map((col) => col.header)],
      body: rows.map((row) => this.columns.map((col) => row[col.field])),
      foot: [this.columns.map((col) => footerRow[col.field])],
      showFoot: 'lastPage',
    });

    pdf.save('export.pdf');
  }
}
