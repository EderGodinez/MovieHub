import { Component } from '@angular/core';

@Component({
  selector: 'loadingComponent',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  constructor() {
    console.log('Loading component created');
  }
}
