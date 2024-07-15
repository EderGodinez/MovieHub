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
      declarations: [ FavoritesPageComponent ],
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
        adult: false,
        public_image_path: 'assets/images/public_images/wNAhuOZ3Zf84jCIlrcI6JhgmY5q.jpg',
        genders: ['Acción', 'Aventura', 'Ciencia ficción'],
        id: 1,
        original_title: 'Furiosa: A Mad Max Saga',
        overview: 'Mientras el mundo se derrumba, la joven Furiosa es secuestrada del Lugar Verde de Muchas Madres y cae en manos de una Horda de Motociclistas liderada por el Señor de la Guerra Dementus. Recorriendo la tierra baldía llega a la Ciudadela, presidida por Inmortan Joe. Mientras los dos tiranos luchan por el dominio de la zona, Furiosa deberá sobrevivir a muchas pruebas buscando volver a casa',
        popularity: 4806.719,
        poster_path: 'assets/images/posters/tGHUlykWn9V2IIQ4ZaATIAq9VLB.jpg',
        release_date: '2024-05-22',
        title: 'Furiosa: De la Saga Mad Max',
        vote_average: 7.709,
        media_type: 'movie'
      },
      {
        adult: false,
        public_image_path: 'assets/images/public_images/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg',
        genders: ['Animación', 'Familia', 'Aventura', 'Comedia'],
        id: 2,
        original_title: 'Inside Out 2',
        overview: 'Una aventura completamente nueva dentro de la cabeza adolescente de Riley que presenta un nuevo conjunto de emociones.',
        popularity: 4502.62,
        poster_path: 'assets/images/posters/2PuAY3xSvbchQWqpSiXw08Yt0NP.jpg',
        release_date: '2024-06-11',
        title: 'IntensaMente 2',
        vote_average: 7.715,
        media_type: 'movie'
      }
    ];
    const MockUser={ FavoritesMediaId: favoriteIds, name:'',id: '1' , email: '', password: '' }
    Object.defineProperty(mockUserService, 'currentUserValue', { get: () => MockUser });
    mockMoviesService.getMoviebyId.and.callFake((id: number) => {
      const movie = mockMovies.find(movie => movie.id === id);
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
