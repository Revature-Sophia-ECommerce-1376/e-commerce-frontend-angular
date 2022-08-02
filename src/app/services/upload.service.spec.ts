import { TestBed } from '@angular/core/testing';
import { UploadService } from './upload.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
describe('UploadService', () => {
  let service: UploadService;
  let client: HttpClient;
 
  beforeEach(() => {
	const serviceSpy = jasmine.createSpyObj<UploadService>(['pushFile']);
	serviceSpy.pushFile.and.returnValue(of());
    TestBed.configureTestingModule({
	  declarations: [UploadService, HttpClient],
	  imports: [HttpClientTestingModule],
	  providers: [
		{provide: HttpClient, useValue: HttpClientTestingModule},
		{provide: UploadService, useValue: serviceSpy}
	  ]
	  
   });
   
  
    service = new UploadService(client );
  	
  
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    
  });

  
});
