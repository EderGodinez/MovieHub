import { Component, OnInit } from '@angular/core';
import { Serie } from 'src/app/movies/interfaces/series.interface';
import { SeriesService } from '../../movies/services/series/series.service';

@Component({
  selector: 'app-series-page',
  templateUrl: './series-page.component.html',
  styleUrls: ['./series-page.component.scss']
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
