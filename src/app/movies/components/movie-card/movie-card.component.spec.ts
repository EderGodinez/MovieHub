import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MovieCardComponent } from './movie-card.component';
import { MoviesService } from '../../services/movies/movies.service';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getMoviesByYear', 'getTrendingMovies']);
    await TestBed.configureTestingModule({
      declarations: [MovieCardComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: MoviesService, useValue: moviesServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    // Mock input data
    component.media = {
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
    },

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ShowDetails and navigate to the correct route', () => {
    const spy = spyOn(component, 'ShowDetails').and.callThrough();
    component.ShowDetails();
    expect(spy).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith([`details/${component.media.TypeMedia}/${component.media.Id}`]);
  });
});
