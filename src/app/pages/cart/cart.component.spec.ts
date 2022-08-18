import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from 'src/app/services/product.service';
import { CartComponent } from './cart.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj<ProductService>([
      'getCart',
      'setCart',
    ]);
    const cart = productServiceSpy.getCart.and.returnValue(of());

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CartComponent],
      providers: [{ provide: ProductService, useValue: productServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
