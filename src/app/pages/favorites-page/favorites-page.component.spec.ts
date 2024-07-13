import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesPageComponent } from './favorites-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

describe('FavoritesPageComponent', () => {
  let component: FavoritesPageComponent;
  let fixture: ComponentFixture<FavoritesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesPageComponent],
      imports: [
        SharedModule,
        PrimeNGModule,
        HttpClientTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(FavoritesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
