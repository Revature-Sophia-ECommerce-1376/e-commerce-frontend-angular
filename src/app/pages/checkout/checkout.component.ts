import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
/**
 *
 */
export class CheckoutComponent implements OnInit {
  products: {
    product: Product;
    quantity: number;
  }[] = [];
  totalPrice!: string;
  cartProducts: Product[] = [];
  finalProducts: { id: number; quantity: number }[] = [];

  checkoutForm = new FormGroup({
    cardName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$'
      ),
    ]),
    expiry: new FormControl('', [
      Validators.required,
      Validators.pattern('^((0[1-9])|(1[0-2]))[/.-]*((2[2-9])|(3[0-5]))$'),
    ]),
    cvv: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{3}$'),
    ]),
    streetAddress: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{1,5}( [a-zA-Z]+)+$'),
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.pattern('^([A-Z][a-z]+){1}( [A-Z][a-z]+)*$'),
    ]),
    state: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Z]{2}$'),
    ]),
    zipCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{5}-?([0-9]{4})?'),
    ]),
  });

  constructor(private productService: ProductService, private router: Router) { }

  /**
   * Set's checkout's products to cart's products.
   * Also sets checkout's total price
   */
  ngOnInit(): void {
    this.productService.getCart().subscribe((cart) => {
      this.products = cart.products;
      this.products.forEach((element) =>
        this.cartProducts.push(element.product)
      );
      this.totalPrice = (Math.round((cart.totalPrice * 100))/100).toString();
    });
  }

  /**
   * After pressing Submit button, adds each product
   * to finalProducts. Creates a purchase and empties cart.
   */
  onSubmit(): void {
    this.products.forEach((element) => {
      const id = element.product.id;
      const quantity = element.quantity;
      this.finalProducts.push({ id, quantity });
    });

    if (this.finalProducts.length > 0) {
      this.productService.purchase(this.finalProducts).subscribe(
        (resp) => console.log(resp),
        (err) => console.log(err),
        () => {
          let cart = {
            cartCount: 0,
            products: [],
            totalPrice: 0.0,
          };
          this.productService.setCart(cart);
          this.router.navigate(['']);
        }
      );
      this.productService.addPurchase(this.finalProducts).subscribe(
        (resp) => console.log(resp),
        (err) => console.log(err)
      );
    } else {
      this.router.navigate(['']);
    }
  }
}
