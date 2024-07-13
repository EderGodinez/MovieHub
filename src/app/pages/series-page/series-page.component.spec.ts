import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeriesPageComponent } from './series-page.component';
import { SeriesService } from '../../movies/services/series/series.service';
import { Serie } from 'src/app/movies/interfaces/series.interface';

describe('SeriesPageComponent', () => {
  let component: SeriesPageComponent;
  let fixture: ComponentFixture<SeriesPageComponent>;
  let mockSeriesService: jasmine.SpyObj<SeriesService>;
  let serie: Serie;

  beforeEach(async () => {
    const seriesServiceSpy = jasmine.createSpyObj('SeriesService', ['getAllSeries']);
    serie = {
      "media_type": "serie",
      "adult": false,
      "public_image_path": "assets/images/public_images/the_witcher.jpg",
      "id": 23,
      "poster_path": "assets/images/posters/The_Witcher.webp",
      "release_date": "2024-05-22",
      "last_season": 1,
      "platforms": [
        "Netflix",
        "Amazon Prime Video",
        "HBO Max"
      ],
      "last_season_date": "2024-05-22",
      "vote_average": 7.709,
      "title": "The Witcher",
      "popularity": 5432.98,
      "genders": [
        "Fantasía",
        "Aventura",
        "Drama"
      ],
      "overview": "Geralt de Rivia, un cazador de monstruos mutado, lucha por encontrar su lugar en un mundo donde a menudo las personas son más perversas que las bestias."
    } as Serie;

    await TestBed.configureTestingModule({
      declarations: [SeriesPageComponent],
      providers: [{ provide: SeriesService, useValue: seriesServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesPageComponent);
    component = fixture.componentInstance;
    mockSeriesService = TestBed.inject(SeriesService) as jasmine.SpyObj<SeriesService>;
  });

  it('should change loading to false once info loads', (done) => {
    mockSeriesService.getAllSeries.and.returnValue(Promise.resolve([serie, serie]));

    component.ngOnInit();

    setTimeout(() => {
      expect(component.List).toEqual([serie, serie]);
      expect(component.Isloading).toBeFalse();
      done();
    }, 0);
  });
});
