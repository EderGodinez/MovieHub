import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
     OverlayPanelModule,
     SkeletonModule,
     ButtonModule,
     ToastModule
  ]
})
export class PrimeNGModule { }
