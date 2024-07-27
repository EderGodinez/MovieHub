import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies/movies.service';
import { Movie } from '../../interfaces/movie.interface';
import { SharedService } from 'src/app/shared/service/shared.service';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
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
  setMedia(Media:Movie[]){
    this.media_results=Media;
  }
media_results :Movie[]= [];
Isloading = true;
query:string='';

searchMedia(query:string){
  this.Isloading=true;
    let media_list:Movie[]=[]
    this.MoviesService.GetAllMedia().subscribe((data)=>{
      media_list=[...data[0],...data[1]];
      this.setMedia(this.FunctionsService.FilterMedia(query,media_list));
      this.Isloading=false;
      if(this.media_results.length===1){
        this.Router.navigate([`details/${this.media_results[0].TypeMedia}/${this.media_results[0].Id}`]);
      }
    });
}
}
