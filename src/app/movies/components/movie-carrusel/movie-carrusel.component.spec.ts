import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCarruselComponent } from './movie-carrusel.component';

describe('MovieCarruselComponent', () => {
  let component: MovieCarruselComponent;
  let fixture: ComponentFixture<MovieCarruselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieCarruselComponent]
    });
    fixture = TestBed.createComponent(MovieCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
