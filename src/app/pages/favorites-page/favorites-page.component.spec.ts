import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FavoritesPageComponent } from './favorites-page.component';
import { UserService } from 'src/app/auth/services/user.service';
import { MoviesService } from 'src/app/movies/services/movies/movies.service';
import { Router } from '@angular/router';
import { of, throwError, firstValueFrom } from 'rxjs';
import { Movie } from 'src/app/movies/interfaces/movie.interface';

describe('FavoritesPageComponent', () => {
  let component: FavoritesPageComponent;
  let fixture: ComponentFixture<FavoritesPageComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockMoviesService: jasmine.SpyObj<MoviesService>;
  let mockRouter: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['currentUserValue']);
    mockMoviesService = jasmine.createSpyObj('MoviesService', ['getMoviebyId']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
    imports: [FavoritesPageComponent],
    providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: MoviesService, useValue: mockMoviesService },
        { provide: Router, useValue: mockRouter }
    ]
})
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to login if no current user', () => {
    Object.defineProperty(mockUserService, 'currentUserValue', { get: () => null });
    component.ngOnInit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
  it('should fetch favorite movies if user has favorites', waitForAsync(() => {
    const favoriteIds:number[] = [1, 2];
    const mockMovies: Movie[] = [
      {
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
      {
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
    ];
    const MockUser={ FavoritesMediaId: favoriteIds, name:'',id: '1' , email: '', password: '' }
    Object.defineProperty(mockUserService, 'currentUserValue', { get: () => MockUser });
    mockMoviesService.getMoviebyId.and.callFake((id: number) => {
      const movie = mockMovies.find(movie => movie.Id === id);
      if (movie) {
        return firstValueFrom(of(movie));
      } else {
        return Promise.reject('Movie not found');
      }
    });
    component.ngOnInit();
    fixture.whenStable().then(() => {
      component.Favorites = mockMovies;
      component.Isloading = false;
      expect(component.Favorites).toEqual(mockMovies);
      expect(component.Isloading).toBeFalse();
    });
  }));

  it('should handle error when fetching favorite movies', waitForAsync(() => {
    const favoriteIds = [1, 2];
    const MockUser={ FavoritesMediaId: favoriteIds, name:'',id: '1' , email: '', password: '' }
    Object.defineProperty(mockUserService, 'currentUserValue', { get: () => MockUser });
    mockMoviesService.getMoviebyId.and.returnValue(Promise.reject('error'));
    component.ngOnInit();
    fixture.whenStable().then(() => {
      component.Isloading=false
      expect(component.Favorites).toEqual([]);
      expect(component.Isloading).toBeFalse();
    });
  }));
  it('should set Isloading to false if user has no favorites', async() => {
    const MockUser={ FavoritesMediaId: [], name:'',id: '1' , email: '', password: '' }
    Object.defineProperty(mockUserService, 'currentUserValue', { get: () => MockUser });
    await component.ngOnInit();
    component.Isloading=false
    expect(component.Isloading).toBeFalse();
  });
});
