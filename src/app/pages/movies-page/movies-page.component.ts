import { Component } from '@angular/core';
import { MoviesService } from '../../movies/services/movies/movies.service';
import { delay } from 'rxjs';
import { Movie } from 'src/app/movies/interfaces/movie.interface';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { MovieCardComponent } from '../../movies/components/movie-card/movie-card.component';
import { NgIf, NgFor } from '@angular/common';

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
      const movies:any[]=data.$values;
      const FilterMovies:Movie[]=movies.map(object=>{
        return {
          AddedDate:object._Media.addedDate,
          AgeRate:object._Media.ageRate,
          Genders:object.genderLists.$values.join(""),
          Id:object._Media.id,
          ImagePath:object._Media.imagePath,
          Title:object._Media.title,
          IsActive:object._Media.isActive,
          OriginalTitle:object._Media.originalTitle,
          RelaseDate:object._Media.relaseDate,
          Overview:object._Media.overview,
          Duration:object._Media.duration,
          PosterImage:object._Media.posterImage,
          TrailerLink:object._Media.trailerLink,
          TypeMedia:object._Media.typeMedia,
          WatchLink:object._Media.watchLink,
        } as Movie;
      })
      this.MovieList = FilterMovies;
      this.Isloading = false;
    });
  }
Isloading:boolean = false;
MovieList:Movie[] = [];

}
