import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaDetailsPageComponent } from './media-details-page.component';

describe('MediaDetailsPageComponent', () => {
  let component: MediaDetailsPageComponent;
  let fixture: ComponentFixture<MediaDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaDetailsPageComponent]
    });
    fixture = TestBed.createComponent(MediaDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
