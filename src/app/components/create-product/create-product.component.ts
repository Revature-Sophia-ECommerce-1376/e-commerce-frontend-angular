
import { HttpClient } from '@angular/common/http';
import { UploadService } from 'src/app/services/upload.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent{
  selectedFiles!: FileList;
  currentFile!: File;
  selectedFile = null;
  changeImage = false;
  fileName: string = '';
  file: string = '';
  constructor(private prodService: ProductService, private router: Router, private uploadService: UploadService, private http: HttpClient) { }

  createProductForm = new FormGroup({
    pname: new FormControl(''),
    pquantity: new FormControl(''),
    pdescription: new FormControl(''),
    pprice: new FormControl(''),
    pimage: new FormControl('')
  })

  change(event:any){
    this.changeImage = true;
  }
  viewImage(){
    if(this.file == ''){
      console.log('File name is empty');
      return;
    }
    console.log('viewing' + this.file);
    window.open('https://revazon-image-bucket.s3.amazonaws.com/' + this.file);
  }
  changedImage(event:any){
    this.selectedFile = event.target.files[0];
  }
  upload(){ 
    if(this.fileName == ''){
      console.log('fileName cannot be empty');
      return;
    }
    this.uploadService.pushFile(this.currentFile, this.fileName).subscribe(event =>{
      console.log('uploading image: ' + this.fileName);
    });
  }
  selectFile(event:any){
    this.currentFile = event.target.files;
  }
  onSubmit(){
    this.prodService.createProduct(this.createProductForm.get('pname')?.value,this.createProductForm.get('pquantity')?.value,
          this.createProductForm.get('pdescription')?.value,this.createProductForm.get('pprice')?.value,
          this.createProductForm.get('pimage')?.value).subscribe(
            () => this.router.navigate(['home'])
          );
  }
}
