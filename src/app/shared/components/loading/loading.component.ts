import { Component } from '@angular/core';
import { NgStyle, NgFor } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'loadingComponent',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
    standalone: true,
    imports: [SkeletonModule, NgStyle, NgFor]
})
export class LoadingComponent {
  
}
