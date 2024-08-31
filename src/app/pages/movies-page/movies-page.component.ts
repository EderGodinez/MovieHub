import { Component } from '@angular/core';
import { MoviesService } from '../../movies/services/movies/movies.service';
import { delay } from 'rxjs';
import { Movie } from 'src/app/movies/interfaces/movie.interface';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { MovieCardComponent } from '../../movies/components/movie-card/movie-card.component';
import { NgIf, NgFor } from '@angular/common';
import { MediaMovieResponse } from 'src/app/movies/interfaces/MediaMovieResponse.interface';

@Component({
    selector: 'app-movies-page',
    templateUrl: './movies-page.component.html',
    styleUrls: ['./movies-page.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, MovieCardComponent, LoadingComponent]
})
export class MoviesPageComponent {
  constructor(private readonly MoviesService:MoviesService) { }
  ngOnInit(): void {
    this.Isloading = true;
    this.MoviesService.MoviesList.pipe(
      delay(1000)
    ).subscribe((data)=>{
      const movies:MediaMovieResponse[]=data.$values;
      const FilterMovies:Movie[]=movies.map(object=>{
        return {
          AddedDate:object.movieData.addedDate,
          AgeRate:object.movieData.ageRate,
          Genders:object.genderLists.$values.join(""),
          Id:object.movieData.id,
          ImagePath:object.movieData.imagePath,
          Title:object.movieData.title,
          IsActive:object.movieData.isActive,
          OriginalTitle:object.movieData.originalTitle,
          RelaseDate:object.movieData.relaseDate,
          Overview:object.movieData.overview,
          Duration:object.duration,
          PosterImage:object.movieData.posterImage,
          TrailerLink:object.movieData.trailerLink,
          WatchLink:object.movieData.watchLink,
        } as Movie;
      })
      this.MovieList = FilterMovies;
      this.Isloading = false;
    });
  }
Isloading:boolean = false;
MovieList:Movie[] = [];

}
