import { Component } from '@angular/core';
import { MoviesService } from '../../movies/services/movies/movies.service';
import { delay } from 'rxjs';
import { Movie } from 'src/app/movies/interfaces/movie.interface';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent {
  constructor(private readonly MoviesService:MoviesService) { }
  ngOnInit(): void {
    this.Isloading = true;
    this.MoviesService.MoviesList.pipe(
      delay(1000)
    ).subscribe((data)=>{
      this.MovieList = data;
      this.Isloading = false;
    });
  }
Isloading:boolean = false;
MovieList:Movie[] = [];

}
