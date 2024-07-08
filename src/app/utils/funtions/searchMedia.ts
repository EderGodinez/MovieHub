import { Movie } from "src/app/movies/interfaces/movie.interface";

export function FilterMedia(query: string, mediaList: Movie[]): Movie[] {
  const lowerCaseQuery = query.toLowerCase();
  return mediaList.filter(media =>
    media.title.toLowerCase().includes(lowerCaseQuery) ||
    media.genders.some(gender => gender.toLowerCase().includes(lowerCaseQuery)) ||
    media.overview.toLowerCase().includes(lowerCaseQuery)
  );
}
