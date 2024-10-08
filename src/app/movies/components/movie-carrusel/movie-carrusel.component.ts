import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';
import { SwiperContainer, register } from 'swiper/element/bundle';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { NgFor } from '@angular/common';
// register Swiper custom elements
register();

@Component({
    selector: 'app-movie-carrusel',
    templateUrl: './movie-carrusel.component.html',
    styleUrls: ['./movie-carrusel.component.scss'],
    standalone: true,
    imports: [NgFor, MovieCardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieCarruselComponent{
  @Input() MovieList: Movie[] = [];
  @Input() Title:string = '';

  constructor() {

  }
  allowSlideNext = true;
  allowSlidePrev = true;
  breakpoints = {
    320: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1440: { slidesPerView: 4 },
  };
  navigation = {
    enabled: true,
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  };
  spaceBetween = 20;
}
