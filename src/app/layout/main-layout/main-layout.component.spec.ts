import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        SharedModule,
        RouterTestingModule,
        PrimeNGModule,
        MainLayoutComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
}).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
