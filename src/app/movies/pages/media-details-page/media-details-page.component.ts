import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeriesService } from '../../services/series/series.service';
import { MoviesService } from '../../services/movies/movies.service';
import { Movie } from '../../interfaces/movie.interface';
import { UserService } from '../../../auth/services/user.service';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SharedService } from 'src/app/shared/service/shared.service';


@Component({
  selector: 'app-media-details-page',
  templateUrl: './media-details-page.component.html',
  styleUrls: ['./media-details-page.component.scss']
})
export class MediaDetailsPageComponent implements OnInit{
constructor(private readonly RouterActived:ActivatedRoute,private readonly SeriesService:SeriesService,private FunctionsService:SharedService,
  private readonly MoviesService:MoviesService,private readonly Router:Router,private readonly UserService:UserService,private MessageService:MessageService) { }

MediaDitails!:Movie;
MediaRecomendations:Movie[]=[];
Isloading = true;
  ngOnInit(): void {
    this.RouterActived.params.subscribe((params)=>{
      const id=params['id'];
      const type=params['type'];
      const mediaRequest = type === 'movie'
      ? this.MoviesService.getMoviebyId(id)
      : this.SeriesService.getTvShowbyId(id);
    mediaRequest.then((data) => {
      this.MediaDitails = data;
    }).catch((error) => {
      console.error(error);
      this.Router.navigate(['/Inicio']);
    });
    this.MoviesService.GetAllMedia().subscribe((data) => {
      const combinedMedia = [...data[0], ...data[1]];
      this.MediaRecomendations = this.FunctionsService.shuffle(combinedMedia)
        .filter((media) => parseInt(media.Id.toString()) !== parseInt(id))
        .slice(0, 10);
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
    this.MessageService.add({ key: 'tc', severity: 'success', summary: 'Agregando a favoritos', detail: `${this.MediaDitails.Title} agregada` });
    setTimeout(() => {
      this.UserService.AddFavoriteMedia(this.MediaDitails.Id);
      this.Router.navigate(['/Favoritos']);
    }, 2000);

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
    this.MessageService.add({ key: 'tc', severity: 'info', summary: 'Ver Pelicula', detail: 'Estamos trabajando en esta funcionalidad' });
  }
}
}
