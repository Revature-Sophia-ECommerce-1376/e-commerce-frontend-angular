import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayProductsComponent } from './pages/display-products/display-products.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ReviewSubmitComponent } from './components/review-submit/review-submit.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';

const routes: Routes = [
  { path: '', component: DisplayProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'create-product', component: CreateProductComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: 'review-submit', component: ReviewSubmitComponent },
  { path: 'profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
