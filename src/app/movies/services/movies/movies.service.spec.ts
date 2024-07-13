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
    "adult": false,
    "public_image_path": "assets/images/public_images/jvPMJ2zM92jfXxVEFsqP1MMrLaO.jpg",
    "genders": [
      "Ciencia ficción",
      "Acción",
      "Aventura"
    ],
    "id": 6,
    "original_title": "Godzilla x Kong: The New Empire",
    "overview": "Una aventura cinematográfica completamente nueva, que enfrentará al todopoderoso Kong y al temible Godzilla contra una colosal amenaza desconocida escondida dentro de nuestro mundo. La nueva y épica película profundizará en las historias de estos titanes, sus orígenes y los misterios de Isla Calavera y más allá, mientras descubre la batalla mítica que ayudó a forjar a estos seres extraordinarios y los unió a la humanidad para siempre.",
    "popularity": 1086.92,
    "poster_path": "assets/images/posters/2YqZ6IyFk7menirwziJvfoVvSOh.jpg",
    "release_date": "2024-03-27",
    "title": "Godzilla y Kong: El nuevo imperio",
    "vote_average": 7.214,
    "media_type": "movie"
  },{
    "adult": false,
    "public_image_path": "assets/images/public_images/3ffPx9jqg0yj9y1KWeagT7D20CB.jpg",
    "genders": [
        "Animación",
        "Acción",
        "Familia",
        "Comedia",
        "Fantasía"
    ],
    "id": 13,
    "original_title": "Kung Fu Panda 4",
    "overview": "Po se está preparando para convertirse en el líder espiritual de su Valle de la Paz, pero también necesita a alguien que ocupe su lugar como Guerrero Dragón. Como tal, entrenará a un nuevo practicante de kung fu para el lugar y se encontrará con un villano llamado Camaleón que evoca villanos del pasado.",
    "popularity": 768.435,
    "poster_path": "assets/images/posters/zS8BSQdbOesql0EWbs17kPvLoAT.jpg",
    "release_date": "2024-03-02",
    "title": "Kung Fu Panda 4",
    "vote_average": 7.127,
    "media_type": "movie"
}];
  let mockSeriesList: Serie[] = [
    {
      "media_type": "serie",
      "adult": false,
      "public_image_path": "assets/images/public_images/The_Office.jpg",
      "id": 29,
      "poster_path": "assets/images/posters/The_Office.jpg",
      "release_date": "2024-05-22",
      "last_season": 1,
      "platforms": [
        "Netflix",
        "Amazon Prime Video",
        "HBO Max"
      ],
      "last_season_date": "2024-05-22",
      "vote_average": 7.709,
      "title": "The Office",
      "popularity": 4890.32,
      "genders": [
        "Comedia"
      ],
      "overview": "Una mirada cómica y a menudo absurda de la vida diaria en una oficina de la empresa Dunder Mifflin, centrada en los empleados y sus interacciones peculiares."
    },
    {
      "media_type": "serie",
      "adult": false,
      "public_image_path": "assets/images/public_images/Kimetsu_no_Yaiba.webp",
      "id": 30,
      "poster_path": "assets/images/posters/Kimetsu_no_Yaiba.jpg",
      "release_date": "2024-05-22",
      "last_season": 1,
      "platforms": [
        "Netflix",
        "Amazon Prime Video",
        "HBO Max"
      ],
      "last_season_date": "2024-05-22",
      "vote_average": 7.709,
      "title": "Kimetsu no Yaiba",
      "popularity": 4890.32,
      "genders": [
        "Acción",
        "Aventura",
        "Drama",
        "Sobrenatural"
      ],
      "overview": "Un joven bondadoso llamado Tanjiro Kamado se convierte en cazador de demonios después de que su familia es brutalmente asesinada por demonios. Acompañado por su hermana Nezuko, quien fue transformada en demonio, Tanjiro busca venganza y una cura para Nezuko mientras se enfrenta a poderosos enemigos y descubre oscuros secretos sobre el mundo de los demonios."
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
      expect(movies.every(movie => movie.media_type === 'movie')).toBeTrue();
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
    expect(movies[0].popularity).toBeGreaterThan(movies[1].popularity);
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
    expect(movies[0].popularity).toBeGreaterThan(movies[1].popularity);
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
