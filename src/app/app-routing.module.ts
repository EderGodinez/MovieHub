import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './auth/guards/auth.guard';
const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: 'Inicio', loadComponent:()=> import('./pages/home-page/home-page.component').then(m => m.HomePageComponent) },
      { path: 'Generos', loadComponent:()=> import('./pages/categorys-page/categorys-page.component').then(m => m.CategorysPageComponent) },
      { path: 'Favoritos', loadComponent:()=> import('./pages/favorites-page/favorites-page.component').then(m => m.FavoritesPageComponent) },
      {path: 'Vistos', loadComponent:()=> import('./pages/watched-page/watched-page.component').then(m => m.WatchedPageComponent)},
      { path: 'Series', loadComponent:()=> import('./pages/series-page/series-page.component').then(m => m.SeriesPageComponent) },
      { path: 'Peliculas', loadComponent:()=> import('./pages/movies-page/movies-page.component').then(m => m.MoviesPageComponent) },
      { path: 'details/:type/:id', loadComponent: ()=> import('./movies/pages/media-details-page/media-details-page.component').then(m => m.MediaDetailsPageComponent) },
      {path: 'search/:query', loadComponent:()=> import('./movies/pages/search-page/search-page.component').then(m => m.SearchPageComponent)},
      { path: 'register', loadComponent: ()=> import('./pages/register-page/register-page.component').then(m=>m.RegisterPageComponent), canActivate: [authGuard]},
      { path: 'login', loadComponent: ()=> import('./pages/login-page/login-page.component').then(m=>m.LoginPageComponent), canActivate: [authGuard] },
      { path: '**', redirectTo: 'Inicio' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
