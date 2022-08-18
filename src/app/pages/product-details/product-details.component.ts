import { ReviewService } from './../../services/review.service';
import { ProductService } from './../../services/product.service';
import { Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId: number = sessionStorage.getItem(
    'selectedProductId'
  ) as unknown as number;
  productDetail: Product = new Product(0, '', 0, '', 0, '');

  cartCount!: number;
  products: {
    product: Product;
    quantity: number;
  }[] = [];
  reviews: any = [];
  subscription!: Subscription;
  totalPrice: number = 0;
  userReview: any;
  userId: number = Number(sessionStorage.getItem('userId'));
  msg:string = '';


  @Input() productInfo!: Product;

  constructor(
    private productService: ProductService,
    private reviewService: ReviewService,
    public auth:AuthService
  ) {}

  ngOnInit(): void {
    this.productService.getSingleProduct(this.productId).subscribe(
      (response) => (this.productDetail = response),
      (err) => {
        console.log(err);
      }
    );

    this.subscription = this.productService.getCart().subscribe((cart) => {
      this.cartCount = cart.cartCount;
      this.products = cart.products;
      this.totalPrice = cart.totalPrice;
    });

    this.reviewService
      .getProductReviews(this.productId)
      .subscribe((response) => {
        this.reviews = response;
        let filtered = this.reviews.filter((r: any) => r.user.id === this.userId);
        console.log(filtered);
        this.userReview = filtered.length > 0 ? filtered[0] : null;
      });
  }

  addToCart(product: Product): void {
    let inCart = false;

    // this.products.forEach((element) => {
    //   if (element.product == product) {
    //     ++element.quantity;
    //     let cart = {
    //       cartCount: this.cartCount + 1,
    //       products: this.products,
    //       totalPrice: this.totalPrice + product.price,
    //     };
    //     this.productService.setCart(cart);
    //     inCart = true;
    //   }
    // });

    this.products.forEach((element) => {
      if (element.product.id == product.id) {
        if (1 + element.quantity > product.quantity) {
          this.msg =
            'Can not order more items then currently in stock, please enter a lower order amount.';
          inCart = true;
        }
        else {
          ++element.quantity;
          let cart = {
            cartCount: this.cartCount + 1,
            products: this.products,
            totalPrice: this.totalPrice + (product.price),
          };

          this.productService.setCart(cart);
          inCart = true;
          return;
        }
      }
    });


    if (!inCart) {
      if (product.quantity === 0) return;

      let newProduct = {
        product: product,
        quantity: 1,
      };
      this.products.push(newProduct);
      let cart = {
        cartCount: this.cartCount + 1,
        products: this.products,
        totalPrice: this.totalPrice + product.price,
      };
      this.productService.setCart(cart);
    }
  }
}
