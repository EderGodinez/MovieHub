import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeriesService } from '../../services/series/series.service';
import { MoviesService } from '../../services/movies/movies.service';
import { Movie } from '../../interfaces/movie.interface';
import { UserService } from '../../../auth/services/user.service';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SharedService } from 'src/app/shared/service/shared.service';
import { Serie } from '../../interfaces/series.interface';
import { Episode } from '../../interfaces/Episode.interface';
import { SerieResponse } from '../../interfaces/SerieResponse.interface';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { MovieCarruselComponent } from '../../components/movie-carrusel/movie-carrusel.component';
import { ButtonModule } from 'primeng/button';
import { NgIf, DatePipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';


@Component({
    selector: 'app-media-details-page',
    templateUrl: './media-details-page.component.html',
    styleUrls: ['./media-details-page.component.scss'],
    standalone: true,
    imports: [ToastModule, NgIf, ButtonModule, MovieCarruselComponent, LoadingComponent, DatePipe]
})
export class MediaDetailsPageComponent implements OnInit{
constructor(private readonly RouterActived:ActivatedRoute,private readonly SeriesService:SeriesService,private FunctionsService:SharedService,
  private readonly MoviesService:MoviesService,private readonly Router:Router,private readonly UserService:UserService,private MessageService:MessageService) { }

MediaDitails!:Movie|Serie;
MediaRecomendations:Movie[]|Serie[]=[];
Isloading = true;
  ngOnInit(): void {
    this.RouterActived.params.subscribe((params)=>{
      const id=params['id'];
      const type=params['type'];
      const mediaRequest = type === 'movie'
      ? this.MoviesService.getMoviebyId(id)
      : this.SeriesService.getTvShowbyId(id);
    mediaRequest.then((data) => {
      if (type === 'series') {
        this.MediaDitails = {
          Id: data.id,
          Title: data.title,
          OriginalTitle: data.originalTitle,
          Overview: data.overview,
          ImagePath: data.imagePath,
          PosterImage: data.posterImage,
          TrailerLink: data.trailerLink,
          WatchLink: data.watchLink,
          AddedDate: data.addedDate,
          TypeMedia: data.typeMedia,
          RelaseDate: data.relaseDate,
          AgeRate: data.ageRate,
          IsActive: data.isActive
        } as Serie;}
        else{
          this.MediaDitails = data;
        }
    }).catch((error) => {
      error(error);
      this.Router.navigate(['/Inicio']);
    });
    this.MoviesService.GetAllMedia().subscribe((data) => {
      const combinedMedia = [...data[0], ...data[1]];
      const recomendations=this.FunctionsService.shuffle(combinedMedia)
      .slice(0, 10);
      console.log(recomendations);
      this.MediaRecomendations=recomendations.map(object=>{
        console.log(object);
        if(object.typeMedia==='series'){
          return {
            Id: object.id,
            Title: object.title,
            OriginalTitle: object.originalTitle,
            Overview: object.overview,
            ImagePath: object.imagePath,
            PosterImage: object.posterImage,
            TrailerLink: object.trailerLink,
            WatchLink: object.watchLink,
            AddedDate: object.addedDate,
            TypeMedia: object.typeMedia,
            RelaseDate: object.relaseDate,
            AgeRate: object.ageRate,
            IsActive: object.isActive,
            Genders: object.gendersLists.$values.join(", "),
            EpisodeList: object.seasons.$values[0].episodes.$values.map((episode:Episode) => ({
              Id: episode.Id,
              Title: episode.Title,
              Overview: episode.Overview,
              E_Num: episode.E_Num,
              Duration: episode.Duration,
              ImagePath: episode.ImagePath,
              AddedDate: episode.AddedDate,
              WatchLink: episode.WatchLink,
              RelaseDate: episode.RelaseDate
            }))
          } as Serie;
        }
        return object;
      })
    });
    forkJoin([mediaRequest, this.MoviesService.GetAllMedia()]).subscribe({
      next: () => this.Isloading = false,
      error: () => this.Isloading = false
    });
  });
}
hideMedia(){
  if (this.UserService.currentUserValue === null) {
    this.MessageService.add({ life:2000,key: 'tc', severity: 'error', summary: 'Sin acceso', detail: 'Debes iniciar sesion' });
    setTimeout(() => {
      this.Router.navigate(['/login']);
    }, 2000);
  }
  else{
    setTimeout(() => {
      this.MessageService.add({ key: 'tc', severity: 'info', summary: 'Ocultando', detail: `${this.MediaDitails.Title} ocultada` });
      this.Router.navigate(['/Inicio']);
    }, 2000);
  }
}
AddFavorite(){
  if (this.UserService.currentUserValue === null) {
    this.MessageService.add({ life:2000,key: 'tc', severity: 'error', summary: 'Sin acceso', detail: 'Debes iniciar sesion' });
    setTimeout(() => {
      this.Router.navigate(['/login']);
    }, 2000);

  }
  else{
    this.UserService.AddFavoriteMedia(this.MediaDitails.Id).subscribe({
      next: (data) => {
        this.MessageService.add({
          key: 'tc',
          severity: 'success',
          summary: 'Agregando a favoritos',
          detail: `${this.MediaDitails.Title} agregada`,
          life: 2000
        });
      },
      error: (err) => {
        this.MessageService.add({
          key: 'tc',
          severity: 'error',
          summary: 'Error',
          detail: `Error al agregar ${this.MediaDitails.Title} a favoritos: ${err.message}`,
          life: 2000
        });
      },
      complete: () => {
        setTimeout(() => {
          this.UserService.currentUserValue?.FavoritesMediaId.push(this.MediaDitails.Id.toString());
          this.Router.navigate(['/Favoritos']);
        }, 2000);
      }
    });
  }

}
ShowMovie(){
  if (this.UserService.currentUserValue === null) {
    this.MessageService.add({ life:2000,key: 'tc', severity: 'error', summary: 'Sin acceso', detail: 'Debes iniciar sesion' });
    setTimeout(() => {
      this.Router.navigate(['/login']);
    }, 2000);
  }
  else{
    this.UserService.AddFavoriteMedia(this.MediaDitails.Id).subscribe({
      next: (data) => {
        this.MessageService.add({
          key: 'tc',
          severity: 'success',
          summary: 'Agregando a contendido visto',
          detail: `${this.MediaDitails.Title} agregada`,
          life: 2000
        });
      },
      error: (err) => {
        this.MessageService.add({
          key: 'tc',
          severity: 'error',
          summary: 'Error',
          detail: `Error al agregar ${this.MediaDitails.Title} a contenido visto: ${err.message}`,
          life: 2000
        });
      },
      complete: () => {
        setTimeout(() => {
          this.Router.navigate(['/Vistos']);
        }, 2000);
      }
    });
  }
}
}
