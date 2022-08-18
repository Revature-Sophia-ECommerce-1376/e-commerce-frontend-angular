import { Component } from '@angular/core';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'E-Commerce Client';
  public isSearching: boolean = false;
  public found: boolean = false;
  searchProducts: Product[] = [];
  search: string = '';
}
