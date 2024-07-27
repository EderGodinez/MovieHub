import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent{
  constructor(private readonly Router:Router) { }
@Input() media!: Movie;
ShowDetails(){
 this.Router.navigate([`details/${this.media.TypeMedia}/${this.media.Id}`]);
}

}
