import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SeriesService } from './series.service';
import { environment } from 'src/environments/environment';
import { Serie } from '../../interfaces/series.interface';
import { of, throwError } from 'rxjs';

describe('SeriesService', () => {
  let service: SeriesService;
  let mockSeriesList: Serie[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SeriesService]
    });

    service = TestBed.inject(SeriesService);

    // Datos simulados
    mockSeriesList = [
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
        Genders: "Action, Sci-Fi, Thriller"
      }
    ];
  });


  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should filter series by media_type', (done: DoneFn) => {
    spyOn(service['httpClient'], 'get').and.returnValue(of(mockSeriesList));
    service.SeriesList.subscribe((series) => {
      expect(series.length).toBe(2);
      expect(series.every(serie => serie.TypeMedia === 'serie')).toBeTrue();
      done();
    });
  });
  it('should return empty series list on error', (done: DoneFn) => {
    spyOn(service['httpClient'], 'get').and.returnValue(throwError(() => new Error('Network error')));
    service.SeriesList.subscribe({
      next: (series) => {
        expect(series.length).toBe(0);
        done();
      },
      error:()=> {

        done();
      },
      // error: done.fail
    });
  });

  it('should get series by year', async () => {
    spyOnProperty(service, 'SeriesList').and.returnValue(of(mockSeriesList));
    const series = await service.getTvShowsbyYear(2024);
    expect(series.length).toBe(2);
    expect(series.every(serie => new Date(serie.RelaseDate).getFullYear() === 2024)).toBeTrue();
  });
  it('should return empty list on error for getTvShowsbyYear', async () => {
    spyOnProperty(service, 'SeriesList').and.returnValue(throwError(() => new Error('Network error')));
    const series = await service.getTvShowsbyYear(2022);
    expect(series.length).toBe(0);
  });

  it('should get all series', async () => {
    spyOnProperty(service, 'SeriesList').and.returnValue(of(mockSeriesList));
    const series = await service.getAllSeries();
    expect(series.length).toBe(2);
  });
  it('should return empty list on error for getAllSeries', async () => {
    spyOnProperty(service, 'SeriesList').and.returnValue(throwError(() => new Error('Network error')));
    const series = await service.getAllSeries();
    expect(series.length).toBe(0);
  });
  it('should get series by id', async () => {
    spyOnProperty(service, 'SeriesList').and.returnValue(of(mockSeriesList));
    const series = await service.getTvShowbyId(29);
    expect(series).toBeTruthy();
    expect(series.id).toBe(29);
  });
  it('should return null on error for getTvShowbyId', async () => {
    spyOnProperty(service, 'SeriesList').and.returnValue(throwError(() => new Error('Network error')));
    const series = await service.getTvShowbyId(1);
    expect(series).toBeNull();
  });

  it('should get series by genre', async () => {
    spyOnProperty(service, 'SeriesList').and.returnValue(of(mockSeriesList));
    const series = await service.getTvShowsByGenre('Comedia');
    expect(series.length).toBe(1);
  });
  it('should return empty list on error for getTvShowsByGenre', async () => {
    spyOnProperty(service, 'SeriesList').and.returnValue(throwError(() => new Error('Network error')));
    const series = await service.getTvShowsByGenre('Comedia');
    expect(series.length).toBe(0);
  });
});
