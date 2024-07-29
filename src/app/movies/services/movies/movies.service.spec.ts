import { TestBed } from '@angular/core/testing';
import { Movie } from '../../interfaces/movie.interface';
import { MoviesService } from './movies.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SeriesService } from '../series/series.service';
import { of, throwError } from 'rxjs';
import { SharedService } from 'src/app/shared/service/shared.service';
import { Serie } from '../../interfaces/series.interface';

describe('MoviesService', () => {
  let service: MoviesService;
  let mockSeriesService: jasmine.SpyObj<SeriesService>;
  let mockSharedService: jasmine.SpyObj<SharedService>;

  let movieValidList: Movie[] = [{
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
  },{
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
  }];
  let mockSeriesList: Serie[] = [
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
      Genders: "Action, Sci-Fi, Thriller",
      EpisodeList: []
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
      Genders: "Action, Sci-Fi, Thriller",
      EpisodeList: []
    }
  ];
  let emptyMovieList: Movie[] = [];

  beforeEach(() => {
    mockSharedService= jasmine.createSpyObj('SharedService',['CalculateDiferenceOfDays']);
    mockSeriesService = jasmine.createSpyObj('SeriesService', [], {
      SeriesList: of(mockSeriesList)
    });
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MoviesService,
        { provide: SeriesService, useValue: mockSeriesService },
        { provide: SharedService, useValue: mockSharedService }
      ]
    });
    service = TestBed.inject(MoviesService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should filter movies by media_type', (done: DoneFn) => {
    const dummyMovies:Movie[]=movieValidList
    spyOn(service['httpClient'], 'get').and.returnValue(of(dummyMovies));
    service.MoviesList.subscribe((movies) => {
      expect(movies.length).toBe(2);
      expect(movies.every(movie => movie.TypeMedia === 'movie')).toBeTrue();
      done();
    });
  });
  it('should return empty movie list on error', (done: DoneFn) => {
    spyOn(service['httpClient'], 'get').and.returnValue(throwError(() => new Error('Network error')));
    service.MoviesList.subscribe({
      next: (series) => {
        expect(series.length).toBe(0);
        done();
      },
      error:()=> {
        done();
      },
    });
  });

  it('should get movie list', (done: DoneFn) => {
    const dummyMovies: Movie[] = movieValidList;
    spyOnProperty(service, 'MoviesList', 'get').and.returnValue(of(dummyMovies));
    service.MoviesList.subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(dummyMovies);
      done();
    });
  });

  it('should get movies by year', async () => {
    const dummyMovies:Movie[]=movieValidList
    spyOnProperty(service, 'MoviesList', 'get').and.returnValue(of(dummyMovies));

    const movies = await service.getMoviesByYear(2024);
    expect(movies.length).toBe(2);
    expect(movies).toEqual(dummyMovies);
  });
  it('should return empty list on error for getMoviesByYear', async () => {
    spyOnProperty(service,'MoviesList', 'get').and.returnValue(throwError(() => new Error('Network error')));
    const series = await service.getMoviesByYear(2022);
    expect(series.length).toBe(0);
  });

  it('should get trending movies', async () => {
    const dummyMovies:Movie[]=movieValidList
    spyOnProperty(service, 'MoviesList', 'get').and.returnValue(of(dummyMovies));

    const movies = await service.getTrendingMovies();
    expect(movies.length).toBe(2);
  });
  it('should return empty list on error for getTrendingMovies', async () => {
    spyOnProperty(service, 'MoviesList', 'get').and.returnValue(throwError(() => new Error('Network error')));
    const series = await service.getTrendingMovies();
    expect(series.length).toBe(0);
  })
  it('should get most popular movies', async () => {
    const dummyMovies:Movie[]=movieValidList
    spyOnProperty(service, 'MoviesList', 'get').and.returnValue(of(dummyMovies));

    const movies = await service.getMostPopularMovies();
    expect(movies.length).toBe(2);
  });
  it('should return empty list on error for getMostPopularMovies', async () => {
    spyOnProperty(service, 'MoviesList', 'get').and.returnValue(throwError(() => new Error('Network error')));
    const series = await service.getMostPopularMovies();
    expect(series.length).toBe(0);
  });

  it('should get movie by id', async () => {
    const dummyMovies:Movie[]=movieValidList
    spyOnProperty(service, 'MoviesList', 'get').and.returnValue(of(dummyMovies));

    const movie = await service.getMoviebyId(6);
    expect(movie).toEqual(dummyMovies[0]);
  });
  it('should return null on error for getTvShowbyId', async () => {
    spyOnProperty(service, 'MoviesList', 'get').and.returnValue(throwError(() => new Error('Network error')));
    const series = await service.getMoviebyId(1111);
    expect(series).toBeNull();
  });
  it('should get movies by genre', async () => {
    const dummyMovies:Movie[]=movieValidList
    spyOnProperty(service, 'MoviesList', 'get').and.returnValue(of(dummyMovies));
    const movies = await service.getMoviesByGenre('Acción');
    expect(movies.length).toBe(2);
    expect(movies).toEqual(dummyMovies);
  });
  it('should return empty list on error for getMoviesByGenre', async () => {
    spyOnProperty(service, 'MoviesList', 'get').and.returnValue(throwError(() => new Error('Network error')));
    const series = await service.getMoviesByGenre('Comedia');
    expect(series.length).toBe(0);
  });
  it('should get all media', (done) => {
    const dummyMovies:Movie[]=movieValidList
    const dummySeries: Serie[] = mockSeriesList;

    spyOnProperty(service, 'MoviesList', 'get').and.returnValue(of(dummyMovies));

    service.GetAllMedia().subscribe(([movies, series]) => {
      expect(movies).toEqual(dummyMovies);
      expect(series).toEqual(dummySeries);
      done();
    });
  });
});
