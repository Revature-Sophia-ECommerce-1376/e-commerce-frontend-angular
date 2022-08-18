import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { AuthService } from '@auth0/auth0-angular';
import { AppComponent } from '../../app.component';
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

/**
 * Navbar that is shown at top of website
 */
export class NavbarComponent implements OnInit {
  cartCount!: number;
  subscription!: Subscription;

  constructor(
    private productService: ProductService,
    public auth: AuthService,
    public authentication: AuthenticationService,
    private appComponent: AppComponent
  ) { }

  /**
   * Will load all cart items on initialization.
   */
  ngOnInit(): void {
    this.subscription = this.productService
      .getCart()
      .subscribe((cart) => (this.cartCount = cart.cartCount));
  }

  /**
   * Clear/Negate appComponent's search variables.
   */
  notSearching(): void {
    this.appComponent.isSearching = false;
    this.appComponent.found = false;
    this.appComponent.searchProducts = [];
    this.appComponent.search = '';
  }
}
