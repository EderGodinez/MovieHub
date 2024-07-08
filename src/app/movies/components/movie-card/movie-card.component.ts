import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';
import { Router } from '@angular/router';
import { MoviesService } from '../../services/movies/movies.service';

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent{
  constructor(private readonly Router:Router,private readonly MovieService:MoviesService) { }
@Input() media!: Movie;
ShowDetails(){
 this.Router.navigate([`details/${this.media.media_type}/${this.media.id}`]);
}
HideMedia(mediaId:number,type:string){
  console.log(mediaId);
  //this.MovieService.HideMedia(media);
}
}
