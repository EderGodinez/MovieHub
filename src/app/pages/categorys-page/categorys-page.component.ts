import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../movies/services/movies/movies.service';
import { SeriesService } from '../../movies/services/series/series.service';
import { Movie } from 'src/app/movies/interfaces/movie.interface';
import { SharedService } from 'src/app/shared/service/shared.service';

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
    const media_list=[...data[0],...data[1]];
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
