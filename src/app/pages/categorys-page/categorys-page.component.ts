import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../movies/services/movies/movies.service';
import { SeriesService } from '../../movies/services/series/series.service';
import { Movie } from 'src/app/movies/interfaces/movie.interface';
import { SharedService } from 'src/app/shared/service/shared.service';
import { Serie } from 'src/app/movies/interfaces/series.interface';
import { Episode } from 'src/app/movies/interfaces/Episode.interface';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { MovieCarruselComponent } from '../../movies/components/movie-carrusel/movie-carrusel.component';
import { NgIf, NgFor } from '@angular/common';
import { MediaMovieResponse } from 'src/app/movies/interfaces/MediaMovieResponse.interface';
import { SerieResponse, Value2 } from 'src/app/movies/interfaces/SerieResponse.interface';

@Component({
    selector: 'app-categorys-page',
    templateUrl: './categorys-page.component.html',
    styleUrls: ['./categorys-page.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, MovieCarruselComponent, LoadingComponent]
})
export class CategorysPageComponent implements OnInit{
  constructor(private readonly MoviesService:MoviesService,private readonly SeriesService:SeriesService,private FunctionsService:SharedService) { }

  Isloading = true;
  Categories: Record<string, Movie[]> = {};


  ngOnInit(): void {
    this.Isloading = true;
    this.fecthData();
}
fecthData(){
  this.MoviesService.GetAllMedia().subscribe((data)=>{
    const movies:Movie[]=data[0]
    const MoviesFull:Movie[]=movies.map((object:Movie)=>{
      return {
        Genders:object?.Genders,
        AddedDate:object.AddedDate,
        AgeRate:object.AgeRate,
        Id:object.Id,
        ImagePath:object.ImagePath,
        Title:object.Title,
        IsActive:object.IsActive,
        OriginalTitle:object.OriginalTitle,
        RelaseDate:object.RelaseDate,
        Overview:object.Overview,
        Duration:object.Duration,
        PosterImage:object.PosterImage,
        TrailerLink:object.TrailerLink,
        TypeMedia:object.TypeMedia,
        WatchLink:object.WatchLink,
      } as Movie;
    });
    const series:Serie[]=data[1]
    console.log(series);
    const SeriesFull: Serie[] = series.map(object => {
      return {
        Id: object.Id,
        Title: object.Title,
        OriginalTitle: object.OriginalTitle,
        Overview: object.Overview,
        ImagePath: object.ImagePath,
        PosterImage: object.PosterImage,
        TrailerLink: object.TrailerLink,
        WatchLink: object.WatchLink,
        AddedDate: object.AddedDate,
        TypeMedia: object.TypeMedia,
        RelaseDate: object.RelaseDate,
        AgeRate: object.AgeRate,
        IsActive: object.IsActive,
        Genders: object.Genders,
        EpisodeList: object.EpisodeList?.map((episode) => ({
          Id: episode.Id,
          Title: episode.Title,
          Overview: episode.Overview,
          E_Num: episode.E_Num,
          Duration: episode.Duration,
          ImagePath: episode.ImagePath,
          AddedDate: new Date(episode.AddedDate),
          WatchLink: episode.WatchLink,
          RelaseDate: new Date(episode.RelaseDate)
      }) as Episode)
      } as Serie;
    });
    const media_list=[...MoviesFull,...SeriesFull];
    const gendersList=this.FunctionsService.getAllUniqueGenders(media_list).slice(0,5);
    const categoriesPromises = gendersList.map((gender) => {
      const moviesPromise = this.MoviesService.getMoviesByGenre(gender);
      const seriesPromise = this.SeriesService.getTvShowsByGenre(gender);
      return Promise.all([moviesPromise, seriesPromise])
      .then(([movies, series]) => {
        const media = [...movies, ...series];
        this.Categories[gender] = media;
      });
  });
  Promise.all(categoriesPromises).then(() => {
    this.Isloading = false;
  });
  });
};
get CategoriesKeys(){
  return Object.keys(this.Categories);
}
}
