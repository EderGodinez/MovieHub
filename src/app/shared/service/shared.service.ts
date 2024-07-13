import { Injectable } from '@angular/core';
import { Movie } from 'src/app/movies/interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  CalculateDiferenceOfDays(AnalizedDate: string): number {
    const CurrentDate = new Date();
    const MovieDate = new Date(AnalizedDate);
    // Calculamos la diferencia en milisegundos entre las dos fechas
    const Diference = MovieDate.getTime() - CurrentDate.getTime();
    // Convertimos la diferencia en días
    return Math.ceil(Diference / (1000 * 3600 * 24));
  }

  getAllUniqueGenders(mediaList: Movie[]): string[] {
    const genderSet = new Set<string>();
    mediaList.forEach(media => {
      media.genders.forEach(gender => {
        genderSet.add(gender);
      });
    });
    return Array.from(genderSet);
  }

  FilterMedia(query: string, mediaList: Movie[]): Movie[] {
    const lowerCaseQuery = query.toLowerCase();
    return mediaList.filter(media =>
      media.title.toLowerCase().includes(lowerCaseQuery) ||
      media.genders.some(gender => gender.toLowerCase().includes(lowerCaseQuery)) ||
      media.overview.toLowerCase().includes(lowerCaseQuery)
    );
  }

  shuffle(array: Movie[]): Movie[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array as Movie[];
  }
}
