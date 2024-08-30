import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { MoviesService } from '../../movies/services/movies/movies.service';
import { SeriesService } from '../../movies/services/series/series.service';
import { Movie } from '../../movies/interfaces/movie.interface';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Serie } from '../../movies/interfaces/series.interface';
import { SharedModule } from '../../shared/shared.module';

// Crea un JSON de prueba para los datos de las películas
const movie: Movie = {
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
};
const mockMovies: Movie[] = [
  { ...movie },
];

const mockTrendingMovies: Movie[] = [
  { ...movie },
];

const mockSeries: Serie[] = [
  {
    ...movie,
    EpisodeList: [],
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
    imports: [
        SharedModule,
        HomePageComponent
    ],
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
