import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WcProduct } from '@models/product.model';
import { SafeHtmlPipe } from '@pipes/safe-html.pipe';
import { WcStoreAPI } from '@services/api/wc-store-api.service';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { of, throwError } from 'rxjs';
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
    { field: 'name', header: 'Name' },
    { field: 'planned', header: 'Planned' },
    { field: 'inStock', header: 'In Stock' },
    { field: 'ordered', header: 'Ordered' },
    { field: 'type', header: 'Type' },
  ];
  constructor() {
    this.loadInitialProducts();
  }

  ngOnInit() {}

  private stockParse(stockStatus: string): number {
    const match = stockStatus.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
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
                ? undefined
                : this.stockParse(p.stock_availability.text),
            type: p.type,
            meta: {
              variableBasic: p.categories.some((cat) => cat.id === 50),
              parentPlanned: p.extensions.konfusius_shift.default_stock,
            },
          },
          children: [],
        }));
        this.treeNodes.set(initialNodes);

        // load variations in the background
        this.loadVariationsInBackground(products, initialNodes);
      });
  }

  private loadVariationsInBackground(products: WcProduct[], nodes: TreeNode[]) {
    products.forEach((product, index) => {
      if (product.variations && product.variations.length > 0) {
        this.wcStoreApi
          .listProductVariations(product.id, ['instock', 'outofstock'])
          .pipe(
            catchError((error) => {
              return of([]);
            }),
            takeUntilDestroyed(this.destroyRef),
          )
          .subscribe((variationDetails) => {
            console.log('Loaded variations for product:', variationDetails);
            const childrenNodes: KTreeNode[] = variationDetails.map(
              (pVariation) => ({
                data: {
                  name: pVariation.extensions.konfusius_shift.time_interval,
                  type: 'variation',
                  planned: pVariation.extensions.konfusius_shift.default_stock,
                  inStock: this.stockParse(pVariation.stock_availability.text),
                },
              }),
            );

            const sumStock = variationDetails.reduce((sum, v) => {
              return sum + this.stockParse(v.stock_availability.text);
            }, 0);
            const updatedNodes = [...this.treeNodes()];
            const node = nodes[index];
            const { meta } = node.data;

            updatedNodes[index] = {
              ...node,
              children: childrenNodes,
              data: {
                ...node.data,
                planned: meta?.variableBasic
                  ? meta.parentPlanned * variationDetails.length
                  : meta.parentPlanned,
                inStock: sumStock,
              },
            };
            this.treeNodes.set(updatedNodes);
          });
      }
    });
  }
}
