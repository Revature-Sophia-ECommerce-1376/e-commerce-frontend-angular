import { Component, Input, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  @Input() reviewObj: any = {};
  id: number = 0;
  stars: number = 0;
  starsUnchecked: number = 0;
  title: string = '';
  review: string = '';
  posted: string = '';
  updated: string = '';
  userString: any = sessionStorage.getItem('user')
  userJSON:any = JSON.parse(this.userString)
  productId:any = sessionStorage.getItem("selectedProductId")
  product: any = {
    id: 0,
    quantity: 0,
    price: 0.0,
    description: '',
    image: '',
    name: '',
  };


  constructor() {}

  ngOnInit() {
    console.log(this.userJSON)
    // this.product = this.productService.getSingleProduct(this.productId).subscribe({
    //   next: (product)=>{
    //     console.log(product)
    //     this.product = product;
    //   }
    // });
    console.log(this.reviewObj)
    this.id = this.reviewObj.id;
    this.stars = this.reviewObj.stars;
    this.starsUnchecked = 5 - this.stars;//out of 5 rating, for displaying correct amt of stars
    this.title = this.reviewObj.title;
    this.review = this.reviewObj.review;
    let localDate = new Date(this.reviewObj.posted);//convert posted time from utc to machine's local time
    this.posted = localDate.toLocaleString();
    this.updated = this.reviewObj.updated;
    this.product = this.reviewObj.product;
  }
}
