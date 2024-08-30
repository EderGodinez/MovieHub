import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedPageComponent } from './watched-page.component';

describe('WatchedPageComponent', () => {
  let component: WatchedPageComponent;
  let fixture: ComponentFixture<WatchedPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WatchedPageComponent]
    });
    fixture = TestBed.createComponent(WatchedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
