import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies/movies.service';
import { Movie } from '../../interfaces/movie.interface';
import { SharedService } from 'src/app/shared/service/shared.service';
import { Serie } from '../../interfaces/series.interface';
import { Episode } from '../../interfaces/Episode.interface';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { NgIf, NgFor } from '@angular/common';


@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, MovieCardComponent, LoadingComponent]
})
export class SearchPageComponent implements OnInit{
constructor(private route: ActivatedRoute, private MoviesService:MoviesService,private Router:Router,private FunctionsService:SharedService) {
}
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      const param=params['query'];
      this.query=param;
      this.searchMedia(param);
    })

  }
  setMedia(Media:any[]){
    const FilterMovies:Movie[]|Serie[]=Media.map(object=>{
      if (object.typeMedia) {
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
      else{
        return {
          AddedDate:object.addedDate,
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
      }

    })
    this.media_results=FilterMovies;
  }
media_results :Movie[]= [];
Isloading = true;
query:string='';

searchMedia(query:string){
  this.Isloading=true;
    let media_list:Movie[]=[]
    this.MoviesService.GetAllMedia().subscribe((data)=>{
      media_list=[...data[0].$values,...data[1].$values];
      this.setMedia(this.FunctionsService.FilterMedia(query,media_list));

      this.Isloading=false;
      if(this.media_results.length===1){
        this.Router.navigate([`details/${this.media_results[0].TypeMedia}/${this.media_results[0].Id}`]);
      }
    });
}
}
