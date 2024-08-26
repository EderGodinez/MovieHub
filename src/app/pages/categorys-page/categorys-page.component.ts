import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../movies/services/movies/movies.service';
import { SeriesService } from '../../movies/services/series/series.service';
import { Movie } from 'src/app/movies/interfaces/movie.interface';
import { SharedService } from 'src/app/shared/service/shared.service';
import { Serie } from 'src/app/movies/interfaces/series.interface';
import { Episode } from 'src/app/movies/interfaces/Episode.interface';

@Component({
  selector: 'app-categorys-page',
  templateUrl: './categorys-page.component.html',
  styleUrls: ['./categorys-page.component.scss']
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
    const MoviesFull:Movie[]=movies.map(object=>{
      return {
        AddedDate:object.addedDate,
        AgeRate:object.ageRate,
        Id:object.id,
        ImagePath:object.imagePath,
        Title:object.title,
        IsActive:object.isActive,
        OriginalTitle:object.originalTitle,
        RelaseDate:object.relaseDate,
        Overview:object.overview,
        Duration:object.duration,
        PosterImage:object.posterImage,
        TrailerLink:object.trailerLink,
        TypeMedia:object.typeMedia,
        WatchLink:object.watchLink,
      } as Movie;
    })
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
        Genders: object.gendersLists.$values.join(", "),  // Joining the genders into a single string
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
    console.log(gendersList);
    const categoriesPromises = gendersList.map((gender) => {
      const moviesPromise = this.MoviesService.getMoviesByGenre(gender);
      const seriesPromise = this.SeriesService.getTvShowsByGenre(gender);
      return Promise.all([moviesPromise, seriesPromise])
      .then(([movies, series]) => {
        console.log(movies);
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
