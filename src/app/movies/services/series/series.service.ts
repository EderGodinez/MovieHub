import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, firstValueFrom, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Serie } from '../../interfaces/series.interface';
import { Episode } from '../../interfaces/Episode.interface';
import { SerieResponse } from '../../interfaces/SerieResponse.interface';

@Injectable({providedIn: 'root'})
export class SeriesService {
  constructor(private httpClient: HttpClient) { }
  environments = environment;
get SeriesList(): Observable<Serie[]> {
    return this.httpClient.get<Serie[]>(`${this.environments.API_URL}series`)
  }
 async getTvShowsbyYear(year:number): Promise<Serie[]> {
  //Transformamos un observable en una promesa con firstValueFrom
  const series:Serie[]=await firstValueFrom(this.SeriesList.pipe(
  delay(1000),
  map((movies:Serie[])=>movies.filter((series:Serie)=>new Date(series.RelaseDate).getFullYear()===year))
)).then((movies:Serie[])=>movies)
.catch(()=>[]) as Serie[];
  return series;
  }
  async getAllSeries(): Promise<any[]> {
    const series:any[]=await firstValueFrom(this.SeriesList.pipe(
      delay(1000),
      map((series:any)=>series.$values)
    )).then((series:any[])=>series).catch(()=>[]) as any[];
    const FilterSeries: Serie[] = series.map(object => {
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
      return FilterSeries;
  }
  async getTvShowbyId(id:any): Promise<SerieResponse> {
    const series:SerieResponse=await firstValueFrom(this.httpClient.get<SerieResponse>(`${this.environments.API_URL}series/${id}`).pipe(
      delay(1000),
    ))
    .then((series:SerieResponse|undefined)=>series)
    .catch(()=>null) as SerieResponse;
      return series;
  }
  async getTvShowsByGenre(genre:string): Promise<Serie[]> {
    const series:Serie[]=await firstValueFrom(this.SeriesList.pipe(
      delay(1000),
      map((data:any)=>data.$values),
      map((series:Serie[])=>series.filter((series:any)=>{
        return series.gendersLists.$values.includes(genre)
      }))
    ))
    .then((series:any)=>series)
    .catch(()=>[]) as Serie[];
    const FilterSeries: Serie[] = series.map((object:any) => {
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
      return FilterSeries;
  }
}
