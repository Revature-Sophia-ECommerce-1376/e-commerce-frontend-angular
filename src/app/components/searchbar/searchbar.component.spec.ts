import { Product } from 'src/app/models/product';
import { of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormBuilder, NgControl } from '@angular/forms';
import { AppRoutingModule } from './../../app-routing.module';
import { ProductService } from 'src/app/services/product.service';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SearchbarComponent } from './searchbar.component';

import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';



describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;
  let service: ProductService;

  beforeEach(async () => {
	const productServiceSpy =  jasmine.createSpyObj<ProductService>(['getSearchProducts']);
	productServiceSpy.getSearchProducts.and.returnValue(of([]));
	const routerSpy = jasmine.createSpyObj<RouterTestingModule>([''])
    await TestBed.configureTestingModule({
      declarations: [SearchbarComponent, AppComponent],
      providers: [ProductService, FormBuilder, AppComponent],
      imports: [AppRoutingModule, FormsModule, HttpClientModule]
    }).compileComponents();

	
	
    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ProductService);
  });
  

  // it('should create', () => {
	
  //   expect(component).toBeTruthy();
  // });

  it('subscribe test for searching a product', fakeAsync(() => {
    let product = new Product(10, 'p1', 5, 'p1', 15, ''),
        spy = spyOn(service, 'getSearchProducts'),
        subSpy = spyOn(service.getSearchProducts(''), 'subscribe');
    component.onSubmit();
    tick(); 
    expect(spy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('test for inside subscribe method', fakeAsync(() => {
    let product = new Product(1, 'p1', 5, 'p1', 15, '');
   
    let spy = spyOn(service, "getSearchProducts").and.returnValue(of([]));

    component.onSubmit();
    tick();
    expect(component.searchTerm).toBeTruthy();;
    expect(component.search.length).toEqual(1);
    expect(component["appComponent"].isSearching).toEqual(true);
    
  }))






});
