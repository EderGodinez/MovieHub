import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  HttpClientModule } from '@angular/common/http';
import { PrimeNGModule } from './prime-ng/prime-ng.module';
import { SharedModule } from './shared/shared.module';
import { CategorysPageComponent } from './pages/categorys-page/categorys-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { SeriesPageComponent } from './pages/series-page/series-page.component';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { SharedService } from './shared/service/shared.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AuthModule,
        MoviesModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        PrimeNGModule,
        SharedModule,
        MainLayoutComponent,
        CategorysPageComponent,
        FavoritesPageComponent,
        SeriesPageComponent,
        MoviesPageComponent,
        LoginPageComponent,
        RegisterPageComponent,
    ],
    providers: [MessageService, SharedService],
    bootstrap: [AppComponent],
})
export class AppModule { }
