import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../movies/services/movies/movies.service';
import { Movie } from '../../movies/interfaces/movie.interface';
import { SeriesService } from '../../movies/services/series/series.service';
import { Serie } from '../../movies/interfaces/series.interface';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { MovieCarruselComponent } from '../../movies/components/movie-carrusel/movie-carrusel.component';
import { NgIf } from '@angular/common';
@Component({
    selector: 'home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: true,
    imports: [NgIf, MovieCarruselComponent, LoadingComponent]
})
export class HomePageComponent implements OnInit {
  constructor(private readonly MoviesService:MoviesService,private readonly SeriesService:SeriesService) { }
ngOnInit(): void {
  this.Isloading = true;
  const moviesPromise = this.MoviesService.getMoviesByYear(2024)
    .then(movies => {
      this.Movies = movies;
    })
    .catch(() => this.Movies = []);

  const trendingMoviesPromise = this.MoviesService.getTrendingMovies()
    .then(trendingMovies => this.TrendingMovies = trendingMovies)
    .catch(() => this.TrendingMovies = []);

  const seriesPromise = this.SeriesService.getAllSeries()
    .then(series => this.Series = series)
    .catch(() => this.Series = []);
  Promise.all([moviesPromise, trendingMoviesPromise, seriesPromise])
  .finally(() => {
    this.Isloading = false;
  });
}
TrendingMovies:Movie[] = [];
Movies:Movie[] = [];
Series:Serie[] = [];
Isloading = true;
}
