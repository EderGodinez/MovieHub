import { Movie } from "src/app/movies/interfaces/movie.interface";
import { CalculateDiferenceOfDays } from "./calculateDays";

export const CalculateTrendingAv = (Movie: Movie): number => {
  const DaysInTheaters=CalculateDiferenceOfDays(Movie.release_date);
  return Movie.popularity/DaysInTheaters;
};
