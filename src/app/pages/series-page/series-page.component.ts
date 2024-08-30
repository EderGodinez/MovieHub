import { Component, OnInit } from '@angular/core';
import { Serie } from 'src/app/movies/interfaces/series.interface';
import { SeriesService } from '../../movies/services/series/series.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { MovieCardComponent } from '../../movies/components/movie-card/movie-card.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-series-page',
    templateUrl: './series-page.component.html',
    styleUrls: ['./series-page.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, MovieCardComponent, LoadingComponent]
})
export class SeriesPageComponent implements OnInit{
constructor(private readonly SeriesService:SeriesService) { }
  ngOnInit(): void {
    this.Isloading = true;
    this.SeriesService.getAllSeries().then((data)=>{
      this.List = data;
      this.Isloading = false;
    });
  }
Isloading:boolean = false;
List:Serie[] = [];

}
