import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Serie } from '../../interfaces/series.interface';

@Injectable({providedIn: 'root'})
export class SeriesService {
  constructor(private httpClient: HttpClient) { }
  environments = environment;
get SeriesList(): Observable<Serie[]> {
    return this.httpClient.get<Serie[]>(this.environments.JSON_data_url).pipe(
      map((series:Serie[])=>series.filter((serie:Serie)=>serie.media_type==='serie'))
    );
  }
 async getTvShowsbyYear(year:number): Promise<Serie[]> {
  //Transformamos un observable en una promesa con firstValueFrom
  const series:Serie[]=await firstValueFrom(this.SeriesList.pipe(
  delay(1000),
  map((movies:Serie[])=>movies.filter((series:Serie)=>new Date(series.release_date).getFullYear()===year))
)).then((movies:Serie[])=>movies)
.catch(()=>[]) as Serie[];
  return series;
  }
  async getAllSeries(): Promise<any[]> {
    const series:Serie[]=await firstValueFrom(this.SeriesList.pipe(
      delay(1000),
      map((series:Serie[])=>series)
    )).then((series:Serie[])=>series).catch(()=>[]) as Serie[];
      return series;
  }
  async getTvShowbyId(id:any): Promise<Serie> {
    const series:Serie=await firstValueFrom(this.SeriesList.pipe(
      delay(1000),
      map((series:Serie[])=>{
        const serie=series.find((serie:Serie)=>serie.id===parseInt(id)&&serie.media_type==='serie')
        console.log(serie);
        return serie
      })
    ))
    .then((series:Serie|undefined)=>series)
    .catch(()=>null) as Serie;
      return series;
  }
  async getTvShowsByGenre(genre:string): Promise<Serie[]> {
    const series:Serie[]=await firstValueFrom(this.SeriesList.pipe(
      delay(1000),
      map((series:Serie[])=>series.filter((series:Serie)=>series.genders.includes(genre)))
    ))
    .then((series:any)=>series)
    .catch(()=>[]) as Serie[];
      return series;
  }
}
