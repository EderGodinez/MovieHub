import { Component, OnInit } from '@angular/core';
import { getAllUniqueGenders } from 'src/app/utils/funtions/filterUniqueGender';
import { MoviesService } from '../../movies/services/movies/movies.service';
import { SeriesService } from '../../movies/services/series/series.service';
import { Movie } from 'src/app/movies/interfaces/movie.interface';

@Component({
  selector: 'app-categorys-page',
  templateUrl: './categorys-page.component.html',
  styleUrls: ['./categorys-page.component.scss']
})
export class CategorysPageComponent implements OnInit{
  constructor(private readonly MoviesService:MoviesService,private readonly SeriesService:SeriesService) { }

  Isloading = true;
  Categories: Record<string, Movie[]> = {};


  ngOnInit(): void {
    this.Isloading = true;
    this.MoviesService.GetAllMedia().subscribe((data)=>{
      const media_list=[...data[0],...data[1]];
      const gendersList=getAllUniqueGenders(media_list).slice(0,5);
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
}
get CategoriesKeys(){
  return Object.keys(this.Categories);
}
}
