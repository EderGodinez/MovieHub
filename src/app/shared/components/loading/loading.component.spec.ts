import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
        PrimeNGModule,
        LoadingComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
});
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
