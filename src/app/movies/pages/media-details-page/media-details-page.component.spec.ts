import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MediaDetailsPageComponent } from './media-details-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SeriesService } from '../../services/series/series.service';
import { MoviesService } from '../../services/movies/movies.service';
import { UserService } from '../../../auth/services/user.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { SharedService } from 'src/app/shared/service/shared.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Movie } from '../../interfaces/movie.interface';
import { MockComponent } from 'ng-mocks';
import { Toast } from 'primeng/toast';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';

describe('MediaDetailsPageComponent', () => {
  let component: MediaDetailsPageComponent;
  let fixture: ComponentFixture<MediaDetailsPageComponent>;
  let moviesServiceSpy: jasmine.SpyObj<MoviesService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let activatedRouteStub: Partial<ActivatedRoute>;
  let routerSpy: jasmine.SpyObj<Router>;

  const dummyMovie: Movie = {
    adult: false,
    public_image_path: 'assets/images/public_images/jvPMJ2zM92jfXxVEFsqP1MMrLaO.jpg',
    genders: ['Action'],
    id: 1,
    original_title: 'Movie 1',
    overview: 'Overview 1',
    popularity: 10,
    poster_path: 'assets/images/posters/movie1.jpg',
    release_date: '2024-01-01',
    title: 'Movie 1',
    vote_average: 7.0,
    media_type: 'movie'
  };

  beforeEach(async () => {
    const seriesService = jasmine.createSpyObj('SeriesService', ['getTvShowbyId']);
    const moviesService = jasmine.createSpyObj('MoviesService', ['getMoviebyId', 'GetAllMedia']);
    const userService = jasmine.createSpyObj('UserService', ['currentUserValue', 'AddFavoriteMedia','setCurrentUser']);
    const sharedService = jasmine.createSpyObj('SharedService', ['shuffle']);
    const messageService = jasmine.createSpyObj('MessageService', ['add']);
    const router = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteStub = {
      params: of({ id: 1, type: 'movie' })
    };

    await TestBed.configureTestingModule({
      declarations: [MediaDetailsPageComponent,MockComponent(Toast)],
      imports: [HttpClientTestingModule, RouterTestingModule,PrimeNGModule],
      providers: [
        { provide: SeriesService, useValue: seriesService },
        { provide: MoviesService, useValue: moviesService },
        { provide: UserService, useValue: userService },
        { provide: SharedService, useValue: sharedService },
        { provide: MessageService, useValue: messageService },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: router }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaDetailsPageComponent);
    component = fixture.componentInstance;
    moviesServiceSpy = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    sharedServiceSpy = TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>

    moviesServiceSpy.getMoviebyId.and.returnValue(Promise.resolve(dummyMovie));
    moviesServiceSpy.GetAllMedia.and.returnValue(of([[dummyMovie], []]));
    sharedServiceSpy.shuffle.and.returnValue([dummyMovie]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set Isloading to false when fetching data is done', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component.Isloading).toBeFalse();
  }));
  // it('should navigate to login if user is not logged in when hiding media', fakeAsync(() => {
  //   userServiceSpy.setCurrentUser(null);
  //   component.hideMedia();
  //   tick(2000);
  //   expect(messageServiceSpy.add).toHaveBeenCalledWith({ life: 2000, key: 'tc', severity: 'error', summary: 'Sin acceso', detail: 'Debes iniciar sesion' });
  //   expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  // }));

  it('should navigate to Inicio if user is logged in when hiding media', fakeAsync(() => {
    userServiceSpy.setCurrentUser({ id: '1',name:'testUser',FavoritesMediaId:[] ,email:'',password:'' });
    component.MediaDitails = { id: 1, title: 'Test Movie' } as Movie;

    component.hideMedia();
    tick(2000);

    expect(messageServiceSpy.add).toHaveBeenCalledWith({ key: 'tc', severity: 'info', summary: 'Ocultando', detail: 'Test Movie ocultada' });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/Inicio']);
  }));
  // it('should navigate to login if user is not logged in when adding favorite', fakeAsync(() => {
  //   userServiceSpy.setCurrentUser(null);
  //   component.AddFavorite();
  //   tick(2000);

  //   expect(messageServiceSpy.add).toHaveBeenCalledWith({ life: 2000, key: 'tc', severity: 'error', summary: 'Sin acceso', detail: 'Debes iniciar sesion' });
  //   expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  // }));

  it('should add favorite and navigate to Favoritos if user is logged in', fakeAsync(() => {
    userServiceSpy.setCurrentUser({ id: '1',name:'testUser',FavoritesMediaId:[] ,email:'',password:'' });

    component.MediaDitails = { id: 1, title: 'Test Movie' } as Movie;

    component.AddFavorite();
    tick(2000);

    expect(messageServiceSpy.add).toHaveBeenCalledWith({ key: 'tc', severity: 'success', summary: 'Agregando a favoritos', detail: 'Test Movie agregada' });
    expect(userServiceSpy.AddFavoriteMedia).toHaveBeenCalledWith(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/Favoritos']);
  }));
  // it('should navigate to login if user is not logged in when showing movie', fakeAsync(() => {
  //   userServiceSpy.setCurrentUser(null);
  //   component.ShowMovie();
  //   tick(2000);

  //   expect(messageServiceSpy.add).toHaveBeenCalledWith({ life: 2000, key: 'tc', severity: 'error', summary: 'Sin acceso', detail: 'Debes iniciar sesion' });
  //   expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  // }));

  it('should show movie info if user is logged in', () => {
    userServiceSpy.setCurrentUser({ id: '1',name:'testUser',FavoritesMediaId:[] ,email:'',password:'' });
    component.MediaDitails = { id: 1, title: 'Test Movie' } as Movie;
    component.ShowMovie();

    expect(messageServiceSpy.add).toHaveBeenCalledWith({ key: 'tc', severity: 'info', summary: 'Ver Pelicula', detail: 'Estamos trabajando en esta funcionalidad' });
  });
});
