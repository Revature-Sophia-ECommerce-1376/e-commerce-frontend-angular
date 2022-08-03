import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from '@auth0/auth0-angular';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AppComponent } from '../../app.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { switchMap } from "rxjs/operators";


@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css'],
})
export class DisplayProductsComponent implements OnInit {
  allProducts: Product[] = [];
  searchProducts: Product[] = [];
  updateModalVisibility: string = '';
  deleteModalVisibility: string = '';
  productToUpdate: Product = new Product(0, '', 0, '', 0, '');
  productToDelete: Product = new Product(0, '', 0, '', 0, '');
  role: string = this.authentication.role;


  constructor(
    private productService: ProductService,
    public auth: AuthService,
    private userService: UserService,
    public authentication: AuthenticationService,
    public appComponent: AppComponent,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((authenticated) => {
      if (authenticated) {
        this.auth
          .getAccessTokenSilently()
          .pipe(
            switchMap((token) => {
              this.authentication.token = token;
              return this.productService.getProducts();
            }
            ),
          )
          .subscribe({
            next: (products => {

              this.allProducts = products;
              this.auth.idTokenClaims$.subscribe({
                next: (data) => {

                  if (data) {
                    let email: any = data?.email;
                    let password: any = data?.sub;
                    let nickname: any = data?.nickname;

                    const potentialNewUser = new User(
                      email,
                      nickname?.substring(0, nickname?.length / 2),
                      nickname?.substring(
                        nickname?.length / 2,
                        nickname?.length
                      ),
                      password,
                      'CUSTOMER',
                      [],
                      [],
                      []
                    );
                    console.log(data)
                    this.authentication.role = this.setUserRole(data["https://finally.com/roles"][0]);

                    this.userService.findUserByEmail(email).subscribe({
                      next: (value) => {
                        sessionStorage.setItem('userId', String(value.id));
                        sessionStorage.setItem('user', JSON.stringify(new User(
                          value.email,
                          value.firstName,
                          value.lastName,
                          '',
                          value.role,
                          [],
                          [],
                          []
                        )));
                      },
                      error: (err) => {
                        if (this.authentication.token && potentialNewUser.email === email) {
                          this.userService.registerUser(potentialNewUser).subscribe({
                            next: () => {
                              this.userService.findUserByEmail(email).subscribe({
                                next: (value1) => {
                                  sessionStorage.setItem('userId', String(value1.id));
                                  sessionStorage.setItem('user', JSON.stringify(new User(
                                    value1.email,
                                    value1.firstName,
                                    value1.lastName,
                                    '',
                                    value1.role,
                                    [],
                                    [],
                                    []
                                  )));
                                }
                              })
                            },
                            error: (bruh) => {
                              console.log(bruh)
                            }
                          });
                        }
                        console.log(err)
                      }
                    })
                  }
                }
              })

            })
          })
      } else {
        this.productService.getProducts().subscribe(
          (resp) => (this.allProducts = resp),
          (err) => console.log(err)
        );
      }
    })

  }

  updateProductForm = new FormGroup({
    pname: new FormControl(''),
    pquantity: new FormControl(''),
    pdescription: new FormControl(''),
    pprice: new FormControl(''),
    pimage: new FormControl(''),
  });

  onSubmitUpdate(product: Product) {
    let name: string;
    let quantity: number;
    let description: string;
    let price: number;
    let image: string;

    if (this.updateProductForm.get('pname')?.value === '') {
      name = product.name;
    } else {
      name = this.updateProductForm.get('pname')?.value!;
    }

    if (this.updateProductForm.get('pquantity')?.value === '') {
      quantity = product.quantity;
    } else {
      quantity = this.updateProductForm.get('pquantity')?.value as unknown as number;
    }

    if (this.updateProductForm.get('pdescription')?.value === '') {
      description = product.description;
    } else {
      description = this.updateProductForm.get('pdescription')?.value!;
    }

    if (this.updateProductForm.get('pprice')?.value === '') {
      price = product.price;
    } else {
      price = this.updateProductForm.get('pprice')?.value as unknown as number;
    }

    if (this.updateProductForm.get('pimage')?.value === '') {
      image = product.image;
    } else {
      image = 'https://revazon-image-bucket.s3.amazonaws.com/' + this.updateProductForm.get('pimage')?.value!;
    }
    this.productService
      .updateProduct(product.id, name, quantity, description, price, image)
      .subscribe(
        () => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
        },
        (err) => console.log(err),
        () => this.router.navigate([''])
      );
  }
  onDeleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(
      () => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
      },
      (err: any) => console.log(err),
      () => this.router.navigate([''])
    );
  }

  closePopup() {
    this.updateModalVisibility = 'none';
    this.deleteModalVisibility = 'none';
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }
  setUserRole(data: any) {
    if (data) {
      return data.toUpperCase();
    } else {
      return "CUSTOMER";
    }

  }
}






