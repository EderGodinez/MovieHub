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
    } as Serie;

    await TestBed.configureTestingModule({
    imports: [SeriesPageComponent],
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
