import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesPageComponent } from '../favorites-page/favorites-page.component';
import { UserService } from 'src/app/auth/services/user.service';
import { User } from '../../auth/interfaces/User.interface';
import { MoviesService } from 'src/app/movies/services/movies/movies.service';
import { Router } from '@angular/router';
import { Movie } from 'src/app/movies/interfaces/movie.interface';
import { MovieCardComponent } from 'src/app/movies/components/movie-card/movie-card.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { SeriesService } from '../../movies/services/series/series.service';

@Component({
  selector: 'app-watched-page',
  standalone: true,
  imports: [CommonModule,MovieCardComponent,LoadingComponent],
  templateUrl: './watched-page.component.html',
  styleUrls: ['./watched-page.component.scss']
})
export class WatchedPageComponent extends FavoritesPageComponent {
  constructor(
    private readonly userService: UserService,
    private readonly moviesService: MoviesService,
    private router: Router,
    private readonly SeriesService: SeriesService
  ) {
    super(userService, moviesService, router);
  }

  override async ngOnInit(): Promise<void> {
    if (this.userService.currentUserValue === null) {
      this.router.navigate(['/login']);
      return;
    }

    const watchedIds: number[] = await this.userService.getWatchedMediaIds();
    if (watchedIds.length > 0) {
      Promise.all(watchedIds.map((id) => this.moviesService.getMoviebyId(id).catch(() =>this.SeriesService.getTvShowbyId(id) )))
        .then((movies) => {
          this.Views = movies;
          this.Isloading = false;
        })
        .catch((error) => {
          this.Isloading = false;
        });
    } else {
      this.Isloading = false;
    }
  }

  Views: Movie[] = [];
  override Isloading = true;
}
