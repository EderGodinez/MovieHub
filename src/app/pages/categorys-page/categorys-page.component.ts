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
    const movies:any[]=data[0].$values
    const MoviesFull:Movie[]=movies.map((object:any)=>{
      return {
        Genders:object?.genderLists?.['$values'].join(", "),
        AddedDate:object._Media.addedDate,
        AgeRate:object._Media.ageRate,
        Id:object._Media.id,
        ImagePath:object._Media.imagePath,
        Title:object._Media.title,
        IsActive:object._Media.isActive,
        OriginalTitle:object._Media.originalTitle,
        RelaseDate:object._Media.relaseDate,
        Overview:object._Media.overview,
        Duration:object.duration,
        PosterImage:object._Media.posterImage,
        TrailerLink:object._Media.trailerLink,
        TypeMedia:object._Media.typeMedia,
        WatchLink:object._Media.watchLink,
      } as Movie;
    });
    const series:any[]=data[1].$values
    const SeriesFull: Serie[] = series.map(object => {
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
