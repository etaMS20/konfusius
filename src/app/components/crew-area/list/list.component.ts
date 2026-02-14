import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WcProduct } from '@models/product.model';
import { WcStoreAPI } from '@services/api/wc-store-api.service';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';

interface TreeNodeData {
  name: string;
  planned?: number;
  inStock?: number;
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
  imports: [TreeTableModule, NgFor, NgIf],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true,
})
export class ListComponent implements OnInit {
  private readonly wcStoreApi = inject(WcStoreAPI);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly treeNodes = signal<KTreeNode[]>([]);

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

  constructor() {
    this.loadInitialProducts();
  }

  ngOnInit() {}

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
        console.log('Initial products loaded:', products);
        const initialNodes: KTreeNode[] = products.map((p) => ({
          data: {
            name: p.name,
            inStock:
              p.type === 'variable'
                ? p.extensions.konfusius_shift?.sum_variations_stock_count
                : p.extensions.konfusius_shift?.stock_count,
            type: p.type,
            planned:
              p.type === 'variable'
                ? p.extensions.konfusius_shift?.sum_planned_variations
                : p.extensions.konfusius_shift?.planned_stock,
          },
          children: p.extensions.konfusius_shift?.variation_data?.map((v) => ({
            data: {
              name: v.name,
              type: 'variation',
              planned: v.planned_stock,
              inStock: v.stock_count,
            },
          })),
        }));
        this.treeNodes.set(initialNodes);
      });
  }
}
