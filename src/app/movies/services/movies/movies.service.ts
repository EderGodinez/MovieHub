import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable,map, delay, firstValueFrom, forkJoin, tap, switchMap } from 'rxjs';
import { Movie } from '../../interfaces/movie.interface';
import { SeriesService } from '../series/series.service';
import { Serie } from '../../interfaces/series.interface';
import { SharedService } from 'src/app/shared/service/shared.service';
import { Episode } from '../../interfaces/Episode.interface';
import { MediaMovieResponse, MovieListResponse } from '../../interfaces/MediaMovieResponse.interface';
import { MediaTrending, TredingResponse } from '../../interfaces/Trending.interface';

@Injectable({providedIn: 'root'})
export class MoviesService {
  constructor(private httpClient: HttpClient,private readonly SeriesService:SeriesService,private FunctionsService:SharedService) { }
  environments = environment;
get MoviesList(): Observable<MovieListResponse> {
    return this.httpClient.get<MovieListResponse>(`${this.environments.API_URL}movies`);
  }
 async getMoviesByYear(year:number): Promise<Movie[]> {
  //Transformamos un observable en una promesa con firstValueFrom
  const movies:MediaMovieResponse[]=await firstValueFrom(this.MoviesList.pipe(
    tap((movies:MovieListResponse)=>console.log(movies.$values)),
    delay(1000),
    map(movies=>movies.$values),
    map((movies: MediaMovieResponse[]) => {
      return movies.filter(
        (movie: MediaMovieResponse) =>
          new Date(movie.movieData.relaseDate).getFullYear() === year
      );
    })
  )
).then((movies: MediaMovieResponse[]) => {
  return movies;
}).catch(() => []) as MediaMovieResponse[];
const FilterMovies:Movie[]=movies.map(object=>{
  return {
    AddedDate:object.movieData.addedDate,
    AgeRate:object.movieData.ageRate,
    Genders:object.genderLists.$values.join(", "),
    Id:object.movieData.id,
    ImagePath:object.movieData.imagePath,
    Title:object.movieData.title,
    IsActive:object.movieData.isActive,
    OriginalTitle:object.movieData.originalTitle,
    RelaseDate:object.movieData.relaseDate,
    Overview:object.movieData.overview,
    Duration:object.duration,
    PosterImage:object.movieData.posterImage,
    TrailerLink:object.movieData.trailerLink,
    WatchLink:object.movieData.watchLink,
    TypeMedia:object.movieData.typeMedia,
  } as Movie;
})
  return FilterMovies;
  }
  async getTrendingMovies(): Promise<Movie[]> {
    const movies:MediaTrending[]=await firstValueFrom(this.httpClient.get<TredingResponse>(`${this.environments.API_URL}Movies/trending`).pipe(
      delay(1000),
      map((movies:TredingResponse)=>movies.$values)
    )).then((movies:any)=>{
      return movies
    })
    .catch(()=>[]) as MediaTrending[];
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
      map((movies:MovieListResponse)=>movies.$values),
      delay(1000),
      map((movies:any[])=>movies.slice(0,10))
    )).then((movies:any[])=>movies)
    .catch(()=>[]) as any[];
      return movies;
  }
  //Obtenemos el objeto de la película por su id
  //@param id:number
  //@ return Promise<Movie>
  async getMoviebyId(id: any): Promise<any> {
    try {
      const movie: any = await firstValueFrom(this.httpClient.get<any>(`${this.environments.API_URL}movies/${id}`).pipe(
        delay(1000)
      ));
      if (movie.typeMedia === 'series') {
        return {
          Id: movie.id,
          Title: movie.title,
          OriginalTitle: movie.originalTitle,
          Overview: movie.overview,
          ImagePath: movie.imagePath,
          PosterImage: movie.posterImage,
          TrailerLink: movie.trailerLink,
          WatchLink: movie.watchLink,
          AddedDate: movie.addedDate,
          TypeMedia: movie.typeMedia,
          RelaseDate: movie.relaseDate,
          AgeRate: movie.ageRate,
          IsActive: movie.isActive,
          Genders: movie.gendersLists.$values.join(", "),  // Unir los géneros en una sola cadena
          EpisodeList: movie.seasons.$values[0].episodes.$values.map((episode: Episode) => ({
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

      // Si es una película, estructurarlo como Movie

      return {
        AddedDate:movie.movieData.addedDate,
        AgeRate:movie.movieData.ageRate,
        Genders:movie.genderLists.$values.join(", "),
        Id:movie.movieData.id,
        ImagePath:movie.movieData.imagePath,
        Title:movie.movieData.title,
        IsActive:movie.movieData.isActive,
        OriginalTitle:movie.movieData.originalTitle,
        RelaseDate:movie.movieData.relaseDate,
        Overview:movie.movieData.overview,
        Duration:movie.duration,
        PosterImage:movie.movieData.posterImage,
        TrailerLink:movie.movieData.trailerLink,
        WatchLink:movie.movieData.watchLink,
        TypeMedia:movie.movieData.typeMedia,
      } as Movie;

    } catch (e) {
      const series = await this.SeriesService.getTvShowbyId(id);
      return {
        Id: series.id,
        Title: series.title,
        OriginalTitle: series.originalTitle,
        Overview: series.overview,
        ImagePath: series.imagePath,
        PosterImage: series.posterImage,
        TrailerLink: series.trailerLink,
        WatchLink: series.watchLink,
        AddedDate: series.addedDate,
        TypeMedia: series.typeMedia,
        RelaseDate: series.relaseDate,
        AgeRate: series.ageRate,
        IsActive: series.isActive,
        Genders: series.gendersLists.$values.join(", "),  // Unir los géneros en una sola cadena
        EpisodeList: series.seasons.$values[0].episodes.$values.map((episode: any) => ({
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
  }

  //Obtenemos las películas por género
   //@param genre:string
  //@ return Promise<Movie[]>
  async getMoviesByGenre(genre:string): Promise<Movie[]> {
    const movies:any[]=await firstValueFrom(this.MoviesList.pipe(
      map((movies:MovieListResponse)=>movies.$values),
      map((movies: MediaMovieResponse[]) => {
        return movies.map((object: MediaMovieResponse) => {
          return {
            AddedDate: object.movieData.addedDate,
            AgeRate: object.movieData.ageRate,
            Genders: object.genderLists.$values.join(", "),
            Id: object.movieData.id,
            ImagePath: object.movieData.imagePath,
            Title: object.movieData.title,
            IsActive: object.movieData.isActive,
            OriginalTitle: object.movieData.originalTitle,
            RelaseDate: object.movieData.relaseDate,
            Overview: object.movieData.overview,
            Duration: object.duration,
            PosterImage: object.movieData.posterImage,
            TrailerLink: object.movieData.trailerLink,
            WatchLink: object.movieData.watchLink,
            TypeMedia: object.movieData.typeMedia,
          } as Movie;
        });
      }),
      delay(1000),
      map((movies:Movie[])=>movies.filter((movie:Movie)=>movie?.Genders?.includes(genre)))
    ))
    .then((movies:Movie[])=>movies)
    .catch(()=>[]) as Movie[];
     return movies;
    }
      GetAllMedia():Observable<[Movie[], Serie[]]>{

        const movies$: Observable<Movie[]> = this.MoviesList.pipe(
          map((movies: MovieListResponse) => movies.$values),
          map((movies: MediaMovieResponse[]) => {
            return movies.map((object: MediaMovieResponse) => {
              return {
                AddedDate: object.movieData.addedDate,
                AgeRate: object.movieData.ageRate,
                Genders: object.genderLists.$values.join(", "),
                Id: object.movieData.id,
                ImagePath: object.movieData.imagePath,
                Title: object.movieData.title,
                IsActive: object.movieData.isActive,
                OriginalTitle: object.movieData.originalTitle,
                RelaseDate: object.movieData.relaseDate,
                Overview: object.movieData.overview,
                Duration: object.duration,
                PosterImage: object.movieData.posterImage,
                TrailerLink: object.movieData.trailerLink,
                WatchLink: object.movieData.watchLink,
                TypeMedia: object.movieData.typeMedia,
              } as Movie;
            });
          })
        );
    const series$= this.SeriesService.SeriesList.pipe(
      map((series: any) => series.$values),
    );
    return forkJoin([movies$,series$]).pipe(delay(1000));
      }
}
