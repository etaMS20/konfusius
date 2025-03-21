import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrossSaleOptionsComponent } from './cross-sale-options.component';

describe('CrossSaleOptionsComponent', () => {
  let component: CrossSaleOptionsComponent;
  let fixture: ComponentFixture<CrossSaleOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrossSaleOptionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrossSaleOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
