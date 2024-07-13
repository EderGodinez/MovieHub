import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { UserService } from 'src/app/auth/services/user.service';
import { MainLayoutComponent } from 'src/app/layout/main-layout/main-layout.component';
import { of } from 'rxjs';
import { SearchPageComponent } from 'src/app/movies/pages/search-page/search-page.component';
import { MoviesModule } from 'src/app/movies/movies.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    const userServiceStub = {
      currentUser: of(null),
      currentUserValue: null
    };

    await TestBed.configureTestingModule({
      imports: [
        MoviesModule,
        RouterTestingModule.withRoutes([
          { path: '', component: MainLayoutComponent, children: [
            { path: 'Inicio', component: class {} },
            { path: 'Generos', component: class {} },
            { path: 'Favoritos', component: class {} },
            { path: 'Series', component: class {} },
            { path: 'Peliculas', component: class {} },
            { path: 'details/:type/:id', component: class {} },
            { path: 'search/:query', component: SearchPageComponent },
            { path: 'login', component: class {} },
            { path: 'register', component: class {} },
            { path: '**', redirectTo: 'Inicio' }
          ]}
        ]),
      ],
      declarations: [
        HeaderComponent,
        MainLayoutComponent
      ],
      providers: [
        { provide: UserService, useValue: userServiceStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize menu items', () => {
    component.ngOnInit();
    expect(component.items).toEqual([
      { label: 'Inicio', icon: 'bi bi-house-door-fill', routerLink: 'Inicio' },
      { label: 'Generos', icon: 'bi bi-book', routerLink: 'Generos' },
      { label: 'Favoritos', icon: 'bi bi-star-fill', routerLink: 'Favoritos' },
      { label: 'Series', icon: 'bi bi-tv', routerLink: 'Series' },
      { label: 'Peliculas', icon: 'bi bi-film', routerLink: 'Peliculas' },
    ]);
  });

  it('should call SearchMedia and navigate to search route', () => {
    spyOn(router, 'navigateByUrl');
    component.searchInput.nativeElement.value = 'test';
    component.SearchMedia();
    expect(router.navigateByUrl).toHaveBeenCalledWith('search/test');
  });

  it('should clear search input after search', () => {
    component.searchInput.nativeElement.value = 'test';
    component.SearchMedia();
    expect(component.searchInput.nativeElement.value).toBe('');
  });
});
