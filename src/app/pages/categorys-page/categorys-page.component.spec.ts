import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CategorysPageComponent } from './categorys-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module'; // Assuming shared module contains components/services used in the template
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MoviesService } from 'src/app/movies/services/movies/movies.service';
import { SeriesService } from 'src/app/movies/services/series/series.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { Movie } from 'src/app/movies/interfaces/movie.interface';
import { Serie } from 'src/app/movies/interfaces/series.interface';
import { of, throwError } from 'rxjs';
import { MoviesModule } from 'src/app/movies/movies.module';
import { CommonModule } from '@angular/common';

describe('CategorysPageComponent', () => {
  let component: CategorysPageComponent;
  let fixture: ComponentFixture<CategorysPageComponent>;
  let moviesService: jasmine.SpyObj<MoviesService>;
  let seriesService: jasmine.SpyObj<SeriesService>;
  let sharedService: jasmine.SpyObj<SharedService>;
  const dummyMovies: Movie[] = [
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

  const dummySeries: Serie[] = [
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

  beforeEach(async () => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['GetAllMedia', 'getMoviesByGenre']);
    const seriesServiceSpy = jasmine.createSpyObj('SeriesService', ['getTvShowsByGenre']);
    const sharedServiceSpy = jasmine.createSpyObj('SharedService', ['getAllUniqueGenders']);

    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, SharedModule, MoviesModule, CommonModule, CategorysPageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        { provide: MoviesService, useValue: moviesServiceSpy },
        { provide: SeriesService, useValue: seriesServiceSpy },
        { provide: SharedService, useValue: sharedServiceSpy }
    ]
});
    moviesService = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
    seriesService = TestBed.inject(SeriesService) as jasmine.SpyObj<SeriesService>;
    sharedService = TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;
    fixture = TestBed.createComponent(CategorysPageComponent);
    component = fixture.componentInstance;

     // Configurar respuestas simuladas para los servicios
     moviesService.GetAllMedia.and.returnValue(of([dummyMovies, dummySeries]));
     sharedService.getAllUniqueGenders.and.returnValue(['Action', 'Comedy', 'Drama', 'Adventure', 'Horror']);
     moviesService.getMoviesByGenre.and.callFake((genre: string) => {
       return Promise.resolve(genre === 'Action' ? dummyMovies : []);
     });
     seriesService.getTvShowsByGenre.and.callFake((genre: string) => {
       return Promise.resolve(genre === 'Action' ? dummySeries : []);
     });

     fixture.detectChanges();  // Ejecutar el ciclo de detección de cambios inicial
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture=TestBed.createComponent(CategorysPageComponent);
    const app=fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should set Isloading to false when fetching data is done', fakeAsync(() => {
    // Al inicio, Isloading debe ser true
    expect(component.Isloading).toBeTrue();
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component.Isloading).toBeFalse();
  }));
  it('should have CategoriesKeys populated after fetchData', async () => {
    await component.fecthData();
    fixture.detectChanges();
    const categoriesKeys = component.CategoriesKeys;
    expect(categoriesKeys.length).toBeGreaterThan(0);
    expect(categoriesKeys).toContain('Action');
  });
});
