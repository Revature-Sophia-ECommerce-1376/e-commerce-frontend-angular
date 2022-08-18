import { Product } from './product';
import { User } from './user';

export class Review {
  userId:number;
  productId:number;
  stars:number;
  title:string;
  review:string;

  constructor(
    userId:number,
    productId:number,
    stars:number,
    title:string,
    review:string
  ) {
    this.userId = userId;
    this.productId = productId;
    this.stars = stars;
    this.title = title;
    this.review = review;
  }
}
