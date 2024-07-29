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
      Id: 1,
      Title: "Inception",
      OriginalTitle: "Inception",
      Overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
      ImagePath: "/images/inception.jpg",
      PosterImage: "/posters/inception.jpg",
      TrailerLink: "https://www.youtube.com/watch?v=8hP9D6kZseM",
      WatchLink: "https://www.example.com/watch/inception",
      AddedDate: "2024-07-26T10:00:00Z",
      TypeMedia: "movie",
      RelaseDate: "2010-07-16T00:00:00Z",
      AgeRate: "PG-13",
      IsActive: true,
      Genders: "Action, Sci-Fi, Thriller"
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
