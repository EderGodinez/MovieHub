import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';
import { Movie } from 'src/app/movies/interfaces/movie.interface';
import { MoviesService } from '../../movies/services/movies/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit{
  constructor(private readonly UserService:UserService,private readonly MoviesService:MoviesService,private Router:Router) { }
  ngOnInit(): void {
    if(this.UserService.currentUserValue===null){
      this.Router.navigate(['/login']);
      return;
    }
    const favoriteIds = this.UserService.currentUserValue?.FavoritesMediaId;
    if (favoriteIds) {
    Promise.all(favoriteIds.map((id) => this.MoviesService.getMoviebyId(id)))
    .then((movies) => {
      this.Favorites = movies;
      this.Isloading = false;
    })
    .catch((error) => {
      console.error('Error fetching favorite movies:', error);
      this.Isloading = false;
    });
    }
    else{
      this.Isloading = false;
    }
}
Favorites:Movie[]=[];
Isloading = true;
}
