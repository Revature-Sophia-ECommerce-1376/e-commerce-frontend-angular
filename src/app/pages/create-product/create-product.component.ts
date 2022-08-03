import { HttpClient } from '@angular/common/http';
import { UploadService } from 'src/app/services/upload.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  warningTextMessage: string = '';
  warningNumberMessage: string = '';
  modalVisibility: string = '';

  constructor(
    private prodService: ProductService,
    private router: Router,
    private uploadService: UploadService,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  /**
   * Must be authorized to access this component
   */
  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe({
      next: (data) => {
        if (!data) {
          this.router.navigate(['/']);
        }
      },
    });
  }

  createProductForm = new FormGroup({
    pname: new FormControl(''),
    pquantity: new FormControl(''),
    pdescription: new FormControl(''),
    pprice: new FormControl(''),
    pimage: new FormControl(''),
  });

  /**
   * Submitting the new product and validating input
   */
  onSubmit() {
    if (this.createProductForm.get('pname')?.value === '') {
      this.warningTextMessage = 'Please fill in all text fields';
    } else {
      // @ts-ignore
      if (this.createProductForm.get('pquantity')?.value < 0) {
        this.warningNumberMessage =
          'Please only use positive numbers for price and quantity.';
      } else if (this.createProductForm.get('pdescription')?.value === '') {
        this.warningTextMessage = 'Please fill in all text fields';
      } else {
        // @ts-ignore
        if (this.createProductForm.get('pprice')?.value < 0) {
          this.warningNumberMessage =
            'Please only use positive numbers for price and quantity.';
        } else if (this.createProductForm.get('pimage')?.value === '') {
          this.warningTextMessage = 'Please fill in all text fields';
        } else {
          this.warningNumberMessage = '';
          this.warningTextMessage = '';
          // @ts-ignore
          this.prodService
            .createProduct(
              this.createProductForm.get('pname')?.value as string,
              this.createProductForm.get('pquantity')
                ?.value as unknown as number,
              this.createProductForm.get('pdescription')?.value as string,
              this.createProductForm.get('pprice')?.value as unknown as number,
              this.createProductForm.get('pimage')?.value as string
            )
            .subscribe(() => this.router.navigate(['']));
        }
      }
    }
  }

  openPopup() {
    this.modalVisibility = 'block';
  }

  closePopup() {
    this.modalVisibility = 'none';
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }
}
