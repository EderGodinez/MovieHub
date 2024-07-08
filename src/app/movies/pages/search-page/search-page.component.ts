import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterMedia } from 'src/app/utils/funtions/searchMedia';
import { MoviesService } from '../../services/movies/movies.service';
import { SeriesService } from '../../services/series/series.service';
import {  delay, forkJoin } from 'rxjs';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit{
constructor(private route: ActivatedRoute, private MoviesService:MoviesService,private SeriesService:SeriesService,private Router:Router) {
}
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      const param=params['query'];
      this.searchMedia(param);
    })

  }
  setMedia(Media:Movie[]){
    this.media_results=Media;
  }
media_results :Movie[]= [];
Isloading = true;

searchMedia(query:string){
  this.Isloading=true;
    let media_list:Movie[]=[]
    this.MoviesService.GetAllMedia().pipe(
      delay(1000)
    ).subscribe((data)=>{
      media_list=[...data[0],...data[1]];
      this.setMedia(FilterMedia(query,media_list));
      this.Isloading=false;
      if(this.media_results.length===1){
        this.Router.navigate([`details/${this.media_results[0].media_type}/${this.media_results[0].id}`]);
      }
    });
}
}
