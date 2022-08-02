import { ReviewService } from 'src/app/services/review.service';
import { async, inject, TestBed } from '@angular/core/testing';


import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

fdescribe('ReviewService', () => {
  let service: ReviewService,
      httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
	  imports: [HttpClientModule,
        HttpClientTestingModule],
	  providers: [
		ReviewService,
        HttpClientModule,
        HttpClientTestingModule	
	  ]
    });
    service = TestBed.inject(ReviewService);
    httpMock = TestBed.inject(HttpTestingController);
    
  });
  
  afterEach(()=>{
	httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllReviews', () => {
    it('should return expected reviews', () => {
        const dummyReview = {
            id: 0,
            stars: 3,
            starsUnchecked: 2,
            title: 'ok',
            review: '',
            posted: '',
            updated: '',
            user: {
                id: 0,
                email: '',
                password: '',
                firstName: 'bob',
                lastName: '',
                },
                product: {
                    id: 0,
                    quantity: 1,
                    price: 2.0,
                    description: 'tshirt',
                    image: '',
                    name: '',
                    }

        }
        let dummyReviews = [dummyReview];

        async(
            inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
                http.get(`{service.reviewUrl}`).subscribe();

                backend.expectOne({
                    url: `{service.reviewUrl}`,
                    method: 'GET'
                });
            })
            

        )

    })
  })
});
