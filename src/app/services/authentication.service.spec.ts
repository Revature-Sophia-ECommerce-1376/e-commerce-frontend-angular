import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
	imports: [HttpClientTestingModule],
	providers:[AuthenticationService]
	
  });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  
  describe('getToken', () => {
    it('should retrieve expected token', () => {
      service["_token"] = "token";
      let tok = service.token;
      expect(tok).toEqual("token");
    })
  })

    describe('getRole', () => {
      it('should retrieve expected Role', () => {
        service["_role"] = "Admin";
        let rol = service.role;
        expect(rol).toEqual("Admin");
      })
    })

    describe('setToken', () => {
      service["_token"] = "token";
      
    })

  
  })


  
  
  
  

	
	

