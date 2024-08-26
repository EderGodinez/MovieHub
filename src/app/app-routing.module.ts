import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { SeriesPageComponent } from './pages/series-page/series-page.component';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';
import { CategorysPageComponent } from './pages/categorys-page/categorys-page.component';
import { SearchPageComponent } from './movies/pages/search-page/search-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { MediaDetailsPageComponent } from './movies/pages/media-details-page/media-details-page.component';
import { LoadingComponent } from './shared/components/loading/loading.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: 'Inicio', component: HomePageComponent },
      { path: 'Generos', component: CategorysPageComponent },
      { path: 'Favoritos', component: FavoritesPageComponent },
      { path: 'Series', component: SeriesPageComponent },
      { path: 'Peliculas', component: MoviesPageComponent },
      { path: 'details/:type/:id', component: MediaDetailsPageComponent },
      {path: 'search/:query', component: SearchPageComponent},
      { path: 'login', component:LoginPageComponent, canActivate: [authGuard] },
      // {path:'loading',component:LoadingComponent},
      { path: 'register', component:RegisterPageComponent, canActivate: [authGuard]},
      { path: '**', redirectTo: 'Inicio' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
