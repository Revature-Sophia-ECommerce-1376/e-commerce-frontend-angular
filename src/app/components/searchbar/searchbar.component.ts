import { Router } from '@angular/router';
import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  searchForm = this.formBuilder.group({
    query: '',
  });

  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    public appComponent: AppComponent,
    public router: Router
  ) { }

  ngOnInit(): void { }

  //triggered when we submit search
  //q: how to send data from this component to another component?
  onSubmit(): void {
    //isSearching boolean: if the user is searching for products, set the
    // search results to the products  from this search
    // and set the string message on the top of the search!
    // also, show the filters

    // when are we not searching? if the page is the home page...

    this.appComponent.search = this.searchTerm;
    //input validation: only when the length is > 1 do we search 
    
    if (this.searchTerm.length >= 1) {
      
      this.appComponent.isSearching = true;
      this.router.navigate(['/']); // navigate to home so that on other pages, users are able to search

      console.log(
        `hitting search() in searchbar component! it was : ${this.searchTerm}`
      );

      this.productService.getSearchProducts(this.searchTerm).subscribe(
        (resp) => {
          console.log(resp);
          this.appComponent.searchProducts = resp;
        },
        (err) => console.log(err),
        () => {
          this.appComponent.found = true;
          console.log('Products search Retrieved')
        }
      );
    }
    else{
      this.appComponent.isSearching = false;
    }
    
  }

  search() { }
}
