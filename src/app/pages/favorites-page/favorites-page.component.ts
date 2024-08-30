import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';
import { Movie } from 'src/app/movies/interfaces/movie.interface';
import { MoviesService } from '../../movies/services/movies/movies.service';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { MovieCardComponent } from '../../movies/components/movie-card/movie-card.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-favorites-page',
    templateUrl: './favorites-page.component.html',
    styleUrls: ['./favorites-page.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, MovieCardComponent, LoadingComponent]
})
export class FavoritesPageComponent implements OnInit{
  constructor(private readonly UserService:UserService,private readonly MoviesService:MoviesService,private Router:Router) { }
  ngOnInit(): void {
    if(this.UserService.currentUserValue===null){
      this.Router.navigate(['/login']);
      return;
    }
    const favoriteIds:number[] = this.UserService.currentUserValue?.FavoritesMediaId;
    if (favoriteIds.length > 0) {
    Promise.all(favoriteIds.map((id) => this.MoviesService.getMoviebyId(id)))
    .then((movies) => {
      this.Favorites = movies;
      this.Isloading = false;
    })
    .catch((error) => {
      this.Isloading = false;
    });
    }
    else{
      this.Isloading = false;
    }
}
Favorites:any[]=[];
Isloading = true;
}
