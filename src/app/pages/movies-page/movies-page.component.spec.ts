import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MoviesPageComponent } from './movies-page.component';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MoviesService } from 'src/app/movies/services/movies/movies.service';
import { Movie } from 'src/app/movies/interfaces/movie.interface';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('MoviesPageComponent', () => {
  let component: MoviesPageComponent;
  let fixture: ComponentFixture<MoviesPageComponent>;
  let mockMovieService: MoviesService;
  let mockMovie: Movie;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesPageComponent],
      imports: [
        PrimeNGModule,
        HttpClientTestingModule,
        SharedModule
      ],
      providers: [MoviesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesPageComponent);
    component = fixture.componentInstance;
    mockMovieService = TestBed.inject(MoviesService);
    fixture.detectChanges();

    mockMovie = {
      id: 1,
      title: 'Mock Movie',
      release_date: new Date().toISOString(),
      popularity: 100,
      genders: ['Action', 'Comedy'],
      adult: false,
      public_image_path: 'assets/images/public_images/wNAhuOZ3Zf84jCIlrcI6JhgmY5q.jpg',
      original_title: 'Furiosa: A Mad Max Saga',
      overview: 'Mock overview',
      poster_path: 'assets/images/posters/tGHUlykWn9V2IIQ4ZaATIAq9VLB.jpg',
      vote_average: 7.709,
      media_type: 'movie'
    } as Movie;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change loading to false once info loads', ((done:DoneFn) => {
    spyOnProperty(mockMovieService, 'MoviesList', 'get').and.returnValue(of([mockMovie, mockMovie]).pipe(delay(1000)));
    component.ngOnInit();
    mockMovieService.MoviesList.subscribe((movies: Movie[]) => {
      component.MovieList = movies;
      component.Isloading = false;
      expect(component.MovieList).toEqual([mockMovie, mockMovie]);
      expect(component.Isloading).toBeFalse();
      done();
    });
  }));
});
