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
      "adult": false,
      "public_image_path": "assets/images/public_images/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
      "genders": [
          "Ciencia ficción",
          "Aventura",
          "Acción"
      ],
      "id": 3,
      "original_title": "Kingdom of the Planet of the Apes",
      "overview": "300 años después del reinado de César, un nuevo líder tiránico construye su imperio esclavizando a otros clanes de primates, un joven simio llamado Noa emprende un viaje desgarrador que lo hará cuestionar todo lo que sabía sobre el pasado y tomar decisiones que definirán el futuro tanto de simios como humanos.",
      "popularity": 1978.964,
      "poster_path": "assets/images/posters/kkFn3KM47Qq4Wjhd8GuFfe3LX27.jpg",
      "release_date": "2024-05-08",
      "title": "El planeta de los simios: Nuevo reino",
      "vote_average": 6.9,
      media_type: 'movie'
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
    expect(router.navigate).toHaveBeenCalledWith([`details/${component.media.media_type}/${component.media.id}`]);
  });
});
