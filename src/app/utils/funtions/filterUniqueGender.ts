import { Movie } from "src/app/movies/interfaces/movie.interface";

export function getAllUniqueGenders(mediaList: Movie[]): string[] {
  const genderSet = new Set<string>();
  mediaList.forEach(media => {
    media.genders.forEach(gender => {
      genderSet.add(gender);
    });
  });
  return Array.from(genderSet);
}
