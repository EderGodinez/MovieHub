import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieCarruselComponent } from './components/movie-carrusel/movie-carrusel.component';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MediaDetailsPageComponent } from './pages/media-details-page/media-details-page.component';
import { SharedModule } from "../shared/shared.module";
import { PrimeNGModule } from '../prime-ng/prime-ng.module';



@NgModule({
    declarations: [
        HomePageComponent,
        MovieCardComponent,
        MovieCarruselComponent,
        SearchPageComponent,
        MediaDetailsPageComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
      MovieCardComponent,
        MovieCarruselComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PrimeNGModule
    ]
})
export class MoviesModule { }
