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
      const ArrayGenders = media.Genders.split(',');
      ArrayGenders.forEach(gender => {
        genderSet.add(gender);
      });
    });
    return Array.from(genderSet);
  }

  FilterMedia(query: string, mediaList: any[]): Movie[] {
    const lowerCaseQuery = query.toLowerCase();
    return mediaList.filter(media => {
        // Verifica si 'genderLists' existe y tiene valores, sino regresa un array vacío
        const ArrayGenders: any[] = media?.genderLists?.$values || [];
        const Title: string = media.title ? media.title.toLowerCase() : '';
        const Overview: string = media?.overview ? media.overview.toLowerCase() : '';
        return Title.includes(lowerCaseQuery) ||
               Overview.includes(lowerCaseQuery) ||
               ArrayGenders.some(gender => gender.toLowerCase().includes(lowerCaseQuery));
    });
}


  shuffle(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
