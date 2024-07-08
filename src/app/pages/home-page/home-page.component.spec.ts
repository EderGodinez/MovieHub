import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { MoviesService } from '../../movies/services/movies/movies.service';
import { SeriesService } from '../../movies/services/series/series.service';
import { Movie } from '../../movies/interfaces/movie.interface';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Serie } from '../../movies/interfaces/series.interface';

// Crea un JSON de prueba para los datos de las películas
const movie:Movie={
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
}
const mockMovies: Movie[] = [
  { ...movie },
];

const mockTrendingMovies: Movie[] = [
  { ...movie },
];

const mockSeries: Serie[] = [
  {
    ...movie,
    last_season: 2,
    platforms: ['Netflix'],
    last_season_date: '2024-05-08'
  }
];
const empityArray: Movie[] = [];

describe('MoviesListPage', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let moviesService: jasmine.SpyObj<MoviesService>;
  let seriesService: jasmine.SpyObj<SeriesService>;

  beforeEach(() => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getMoviesByYear', 'getTrendingMovies']);
    const seriesServiceSpy = jasmine.createSpyObj('SeriesService', ['getAllSeries']);

    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      providers: [
        { provide: MoviesService, useValue: moviesServiceSpy },
        { provide: SeriesService, useValue: seriesServiceSpy }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
    seriesService = TestBed.inject(SeriesService) as jasmine.SpyObj<SeriesService>;
    // Configura las respuestas simuladas para los métodos del servicio
    moviesService.getMoviesByYear.and.returnValue(Promise.resolve(mockMovies));
    moviesService.getTrendingMovies.and.returnValue(Promise.resolve(mockTrendingMovies));
    seriesService.getAllSeries.and.returnValue(Promise.resolve(mockSeries));

    fixture.detectChanges();
  });

  it('should call getMoviesByYear and set Movies', async () => {
    await component.ngOnInit();

    expect(moviesService.getMoviesByYear).toHaveBeenCalledWith(2024);

    expect(component.Movies).toEqual(mockMovies);
  });

  it('should call getTrendingMovies and set TrendingMovies', async () => {
    await component.ngOnInit();

    expect(moviesService.getTrendingMovies).toHaveBeenCalled();
    expect(component.TrendingMovies).toEqual(mockTrendingMovies);
  });

  it('should call getAllSeries and set Series', async () => {
    await component.ngOnInit();

    expect(seriesService.getAllSeries).toHaveBeenCalled();
    expect(component.Series).toEqual(mockSeries);
  });

  it('should handle errors from getMoviesByYear', async () => {
    const error = new Error('Error fetching movies');
    moviesService.getMoviesByYear.and.returnValue(Promise.reject(error));

    await component.ngOnInit();
    await moviesService.getMoviesByYear(2024).catch(()=>[]);
    expect(seriesService.getAllSeries).toHaveBeenCalled();
    expect(component.Movies).toEqual(empityArray);
  });

  it('should handle errors from getTrendingMovies', async () => {
    const error = new Error('Error fetching trending movies');
    moviesService.getTrendingMovies.and.returnValue(Promise.reject(error));
    await component.ngOnInit();
    await moviesService.getTrendingMovies().catch(()=>[]);
    expect(seriesService.getAllSeries).toHaveBeenCalled();
    expect(component.TrendingMovies).toEqual(empityArray);

  });

  it('should handle errors from getAllSeries', async () => {
    const error = new Error('Error fetching series');
    seriesService.getAllSeries.and.returnValue(Promise.reject(error));
    await component.ngOnInit();
    await seriesService.getAllSeries().catch(()=>[]);
    expect(seriesService.getAllSeries).toHaveBeenCalled();
    expect(component.Series).toEqual(empityArray as Serie[]);

  });
});
