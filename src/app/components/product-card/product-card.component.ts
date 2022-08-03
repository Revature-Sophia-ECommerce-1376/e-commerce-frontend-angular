import { DisplayProductsComponent } from './../../pages/display-products/display-products.component';
import { Product } from './../../models/product';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { AppComponent } from 'src/app/app.component';
import { User } from '../../models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})

/**
 * Create a product card for each product.
 * Also contains functions to add product to cart
 */
export class ProductCardComponent implements OnInit {
  currentUserString: any = sessionStorage.getItem('user');
  currentUser: User = JSON.parse(this.currentUserString);


  wantToDelete: boolean = false;
  wantToUpdate: boolean = false;
  cartCount!: number;

  // array of products
  products: {
    product: Product;
    quantity: number;
  }[] = [];

  subscription!: Subscription;
  totalPrice: number = 0;
  msg: string = '';

  modalVisibility: string = '';
  role: string = this.authentication.role;



  @Input() productInfo!: Product;
  constructor(
    public appcomponent: AppComponent,
    private productService: ProductService,
    private router: Router,

    public authService: AuthService,
    public disProdComp: DisplayProductsComponent,
    private authentication: AuthenticationService


  ) { }
  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe((cart) => {
      this.cartCount = cart.cartCount;
      this.products = cart.products;
      this.totalPrice = cart.totalPrice;
    });
  }

  /**
   * Adds Product to cart
   * @param {Product} product
   * @returns void
   */
  addToCart(product: Product): void {
    let inCart = false;
    let toBuy = Number(
      (<HTMLInputElement>document.getElementById(`qty${product.id}`)).value
    );
    this.msg = '';

    if (toBuy < 1) {
      this.msg =
        'Can not add a 0 or negative number of items to order, please enter a higher order amount.';
      return;
    }

    this.products.forEach((element) => {
      if (element.product.id == product.id) {
        if (toBuy + element.quantity > product.quantity) {
          this.msg =
            'Can not order more items then currently in stock, please enter a lower order amount.';
          inCart = true;
        }
        else {
          element.quantity += toBuy;
          let cart = {
            cartCount: this.cartCount + toBuy,
            products: this.products,
            totalPrice: this.totalPrice + (toBuy * this.productInfo.price),
          };

          this.productService.setCart(cart);
          inCart = true;
          return;
        }
      }
    });

    if (!inCart) {
      if (toBuy > product.quantity) {
        this.msg =
          'Can not order more items then currently in stock, please enter a lower order amount';
        return;
      }

      let newProduct = {
        product: product,
        quantity: toBuy,
      };
      this.products.push(newProduct);
      let cart = {
        cartCount: this.cartCount + toBuy,
        products: this.products,
        totalPrice: this.totalPrice + product.price * toBuy,
      };
      this.productService.setCart(cart);
    }
  }

  /**
   * Sets Product in Session storage. Redirects user to /product-details
   */
  selectProduct(): void {
    sessionStorage.setItem('selectedProductId', this.productInfo.id.toString());
    this.router.navigate(['/product-details']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Updates popup with
   * @param {Product} product
  */
  updatePopUp(product: Product) {
    this.disProdComp.productToUpdate.id = product.id;
    this.disProdComp.productToUpdate.name = product.name;
    this.disProdComp.productToUpdate.quantity = product.quantity;
    this.disProdComp.productToUpdate.price = product.price;
    this.disProdComp.productToUpdate.image = product.image;
    this.disProdComp.productToUpdate.description = product.description;
    this.disProdComp.updateModalVisibility = 'block';
  }

  /**
   * Removes Popup
   * @param product
   */
  deletePopUp(product: Product) {
    this.disProdComp.productToDelete.id = product.id;
    this.disProdComp.deleteModalVisibility = 'block';
  }
  wantsToDelete() {
    this.wantToDelete = !this.wantToDelete;
  }

  /**
   * Removes Product and reroutes to /
   * @param product
   */
  onDeleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(
      () => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';

        this.router.navigate(['/']);
      },
      (err: any) => console.log(err),
    );
  }

}