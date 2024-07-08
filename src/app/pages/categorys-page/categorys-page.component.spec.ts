import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorysPageComponent } from './categorys-page.component';

describe('CategorysPageComponent', () => {
  let component: CategorysPageComponent;
  let fixture: ComponentFixture<CategorysPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorysPageComponent]
    });
    fixture = TestBed.createComponent(CategorysPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
