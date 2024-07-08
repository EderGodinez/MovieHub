import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SeriesService } from './series.service';
import { TestBed } from '@angular/core/testing';


describe('MoviesService', () => {
  let service: SeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeriesService],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(SeriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
