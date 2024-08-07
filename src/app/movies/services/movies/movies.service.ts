import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable,map, delay, firstValueFrom, forkJoin } from 'rxjs';
import { Movie } from '../../interfaces/movie.interface';
import { SeriesService } from '../series/series.service';
import { Serie } from '../../interfaces/series.interface';
import { SharedService } from 'src/app/shared/service/shared.service';

@Injectable({providedIn: 'root'})
export class MoviesService {
  constructor(private httpClient: HttpClient,private readonly SeriesService:SeriesService,private FunctionsService:SharedService) { }
  environments = environment;
get MoviesList(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${this.environments.API_URL}movies`);
  }
 async getMoviesByYear(year:number): Promise<Movie[]> {
  //Transformamos un observable en una promesa con firstValueFrom
  const movies:Movie[]=await firstValueFrom(this.MoviesList.pipe(
  delay(1000),
  map((movies:Movie[])=>{
    return movies.filter((movie:Movie)=>new Date(movie.RelaseDate).getFullYear()===year)
  })
)).then((movies:Movie[])=>{
  return movies;
})
.catch(()=>[]) as Movie[];
  return movies;
  }
  async getTrendingMovies(): Promise<Movie[]> {
    const movies:Movie[]=await firstValueFrom(this.httpClient.get<Movie[]>(`${this.environments.API_URL}trending`).pipe(
      delay(1000),
    )).then((movies:Movie[])=>{
      return movies;
    })
      .catch(()=>[]) as Movie[];
      return movies;
  }
  //Obtenemos las 10 películas más populares
  //@ return Promise<Movie[]>
  async getMostPopularMovies(): Promise<Movie[]> {

    const movies:Movie[]=await firstValueFrom(this.MoviesList.pipe(
      delay(1000),
      map((movies:Movie[])=>movies.slice(0,10))
    )).then((movies:Movie[])=>movies)
    .catch(()=>[]) as Movie[];
      return movies;
  }
  //Obtenemos el objeto de la película por su id
  //@param id:number
  //@ return Promise<Movie>
  async getMoviebyId(id:any): Promise<Movie> {
    const movies:Movie=await firstValueFrom(this.httpClient.get<Movie>(`${this.environments.API_URL}movies/${id}`).pipe(
      delay(1000),
    ))
    .then((movie:Movie|undefined)=>movie)
    .catch(()=>null) as Movie;
      return movies;
  }
  //Obtenemos las películas por género
   //@param genre:string
  //@ return Promise<Movie[]>
  async getMoviesByGenre(genre:string): Promise<Movie[]> {
    const movies:Movie[]=await firstValueFrom(this.MoviesList.pipe(
      delay(1000),
      map((movies:Movie[])=>movies.filter((movie:Movie)=>movie.Genders.includes(genre)))
    ))
    .then((movies:Movie[])=>movies)
    .catch(()=>[]) as Movie[];
      return movies;}
      GetAllMedia():Observable<[Movie[], Serie[]]>{
        const movies= this.MoviesList
    const series= this.SeriesService.SeriesList
    return forkJoin([movies,series]).pipe(delay(1000));
      }
}
