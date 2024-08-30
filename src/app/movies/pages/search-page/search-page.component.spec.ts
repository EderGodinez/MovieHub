import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SearchPageComponent } from './search-page.component';
import { MoviesService } from '../../services/movies/movies.service';
import { Movie } from '../../interfaces/movie.interface';
import { SharedModule } from 'src/app/shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

// Mock Services
const mockMovie: Movie = {
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
}

class MockMoviesService {
  GetAllMedia() {
    return of([[mockMovie,mockMovie], []]).pipe(delay(1000));
  }
}

class MockActivatedRoute {
  params = of({ query: 'test' });
}

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let moviesService: MoviesService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getMoviesByYear', 'getTrendingMovies', 'GetAllMedia']);
    await TestBed.configureTestingModule({
    providers: [
        { provide: MoviesService, useClass: MockMoviesService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useValue: routerSpy }
    ],
    imports: [SharedModule, RouterTestingModule, SearchPageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
    .compileComponents();

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService);
    fixture.detectChanges();
  });


  it('should navigate to details if there is exactly one media result', (done) => {
    spyOn(moviesService, 'GetAllMedia').and.returnValue(of([[mockMovie], []]));
    moviesService.GetAllMedia().subscribe((res) => {
      component.media_results = res[0],res[1];
    });
    component.searchMedia('test');
    fixture.whenStable().then(() => {
      expect(router.navigate).toHaveBeenCalledWith(['details/movie/1']);
      done();
    });
  });

  it('should set Isloading to false after searchMedia completes', (done) => {
    spyOn(moviesService, 'GetAllMedia').and.returnValue(of([[mockMovie], []]));

    component.searchMedia('test');

    fixture.whenStable().then(() => {
      expect(component.Isloading).toBeFalse();
      done();
    });
  });
});
