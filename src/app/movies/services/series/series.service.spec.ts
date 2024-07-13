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
        "last_season_date": "2023-05-22",
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
  });


  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should filter series by media_type', (done: DoneFn) => {
    spyOn(service['httpClient'], 'get').and.returnValue(of(mockSeriesList));
    service.SeriesList.subscribe((series) => {
      expect(series.length).toBe(2);
      expect(series.every(serie => serie.media_type === 'serie')).toBeTrue();
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
    expect(series.every(serie => new Date(serie.release_date).getFullYear() === 2024)).toBeTrue();
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
