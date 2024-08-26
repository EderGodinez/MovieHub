import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable,map, delay, firstValueFrom, forkJoin, tap } from 'rxjs';
import { Movie } from '../../interfaces/movie.interface';
import { SeriesService } from '../series/series.service';
import { Serie } from '../../interfaces/series.interface';
import { SharedService } from 'src/app/shared/service/shared.service';

@Injectable({providedIn: 'root'})
export class MoviesService {
  constructor(private httpClient: HttpClient,private readonly SeriesService:SeriesService,private FunctionsService:SharedService) { }
  environments = environment;
get MoviesList(): Observable<any> {
    return this.httpClient.get<any>(`${this.environments.API_URL}movies`);
  }
 async getMoviesByYear(year:number): Promise<Movie[]> {
  //Transformamos un observable en una promesa con firstValueFrom
  const movies:any[]=await firstValueFrom(this.MoviesList.pipe(
  delay(1000),
  map(data=>data.$values),
  map((movies:any[])=>{
    return movies.filter((movie:any)=>new Date(movie._Media.relaseDate).getFullYear()===year)
  })
)).then((movies:Movie[])=>{
  return movies;
})
.catch(()=>[]) as Movie[];
const FilterMovies:Movie[]=movies.map(object=>{
  return {
    AddedDate:object._Media.addedDate,
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
})
  return FilterMovies;
  }
  async getTrendingMovies(): Promise<any[]> {
    const movies:any[]=await firstValueFrom(this.httpClient.get<any[]>(`${this.environments.API_URL}Movies/trending`).pipe(
      delay(1000),
    )).then((movies:any)=>{
      return movies.$values;
    })
    .catch(()=>[]) as Movie[];
      const FilterMovies:Movie[]=movies.map(object=>{
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

        return FilterMovies;
  }
  //Obtenemos las 10 películas más populares
  //@ return Promise<Movie[]>
  async getMostPopularMovies(): Promise<any[]> {

    const movies:any[]=await firstValueFrom(this.MoviesList.pipe(
      delay(1000),
      map((movies:any[])=>movies.slice(0,10))
    )).then((movies:any[])=>movies)
    .catch(()=>[]) as any[];
      return movies;
  }
  //Obtenemos el objeto de la película por su id
  //@param id:number
  //@ return Promise<Movie>
  async getMoviebyId(id:any): Promise<any> {
    const movie:any=await firstValueFrom(this.httpClient.get<any>(`${this.environments.API_URL}movies/${id}`).pipe(
      delay(1000),
    ))
    .then((movie:Movie|undefined)=>movie)
    .catch(()=>null) as any;
    return {
      AddedDate:movie._Media.addedDate,
      AgeRate:movie._Media.ageRate,
      Genders:movie.genderLists.$values.join(", "),
      Id:movie._Media.id,
      ImagePath:movie._Media.imagePath,
      Title:movie._Media.title,
      IsActive:movie._Media.isActive,
      OriginalTitle:movie._Media.originalTitle,
      RelaseDate:movie._Media.relaseDate,
      Overview:movie._Media.overview,
      Duration:movie._Media.duration,
      PosterImage:movie._Media.posterImage,
      TrailerLink:movie._Media.trailerLink,
      TypeMedia:movie._Media.typeMedia,
      WatchLink:movie._Media.watchLink,
    } as Movie;

  }
  //Obtenemos las películas por género
   //@param genre:string
  //@ return Promise<Movie[]>
  async getMoviesByGenre(genre:string): Promise<any[]> {
    const movies:any[]=await firstValueFrom(this.MoviesList.pipe(
      delay(1000),
      map(data=>data.$values),
      map((movies:any[])=>movies.filter((movie:any)=>movie?.genderLists?.['$values'].join(", ").includes(genre)))
    ))
    .then((movies:Movie[])=>movies)
    .catch(()=>[]) as Movie[];
    const FilterMovies:Movie[]=movies.map(object=>{
      return {
        AddedDate:object._Media.addedDate,
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
    })
    return FilterMovies
    }
      GetAllMedia():Observable<[any, any]>{

        const movies= this.MoviesList
    const series= this.SeriesService.SeriesList
    return forkJoin([movies,series]).pipe(delay(1000));
      }
}
