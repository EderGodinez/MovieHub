import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeriesService } from '../../services/series/series.service';
import { MoviesService } from '../../services/movies/movies.service';
import { Movie } from '../../interfaces/movie.interface';
import { Serie } from '../../interfaces/series.interface';
import { shuffle } from 'src/app/utils/funtions/shufleeArray';

@Component({
  selector: 'app-media-details-page',
  templateUrl: './media-details-page.component.html',
  styleUrls: ['./media-details-page.component.scss']
})
export class MediaDetailsPageComponent implements OnInit{
constructor(private readonly RouterActived:ActivatedRoute,private readonly SeriesService:SeriesService,
  private readonly MoviesService:MoviesService,private readonly Router:Router) { }

MediaDitails!:Movie;
MediaRecomendations:Movie[]=[];
  ngOnInit(): void {
    this.RouterActived.params.subscribe((params)=>{
      const id=params['id'];
      const type=params['type'];
      if(type==='movie'){
        this.MoviesService.getMoviebyId(id).then((data)=>{
          this.MediaDitails=data;
        }).catch((error)=>{
          console.error(error);
          this.Router.navigate(['/Inicio']);
        });
      }else{
        this.SeriesService.getTvShowbyId(id).then((data)=>{
          this.MediaDitails=data;
        }).catch((error)=>{
          console.error(error);
          this.Router.navigate(['/Inicio']);
        });

    }
    this.MoviesService.GetAllMedia().pipe(
    ).subscribe((data)=>{
      this.MediaRecomendations=[...data[0],...data[1]].slice(0,10);
      this.MediaRecomendations=shuffle(this.MediaRecomendations).filter((media)=>{
        return parseInt(media.id.toString())!==parseInt(id);
      });
    });
  });

}
}
