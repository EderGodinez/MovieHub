import { Movie } from "src/app/movies/interfaces/movie.interface";

export function shuffle(array: Movie[]): Movie[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array as Movie[];
}
