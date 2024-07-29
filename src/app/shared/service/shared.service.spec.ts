import { TestBed } from '@angular/core/testing';
import { Movie } from 'src/app/movies/interfaces/movie.interface';
import { SharedService } from './shared.service';
import { SharedModule } from '../shared.module';

describe('FunctionsService', () => {
  let service: SharedService;

  const mockMovies: Movie[] = [
    {
      Id: 1,
      Title: "Inception",
      OriginalTitle: "Inception",
      Overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
      ImagePath: "/images/inception.jpg",
      PosterImage: "/posters/inception.jpg",
      TrailerLink: "https://www.youtube.com/watch?v=8hP9D6kZseM",
      WatchLink: "https://www.example.com/watch/inception",
      AddedDate: "2024-07-26T10:00:00Z",
      TypeMedia: "movie",
      RelaseDate: "2010-07-16T00:00:00Z",
      AgeRate: "PG-13",
      IsActive: true,
      Genders: "Action, Sci-Fi, Thriller"
    },
    {
      Id: 1,
      Title: "Inception",
      OriginalTitle: "Inception",
      Overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
      ImagePath: "/images/inception.jpg",
      PosterImage: "/posters/inception.jpg",
      TrailerLink: "https://www.youtube.com/watch?v=8hP9D6kZseM",
      WatchLink: "https://www.example.com/watch/inception",
      AddedDate: "2024-07-26T10:00:00Z",
      TypeMedia: "movie",
      RelaseDate: "2010-07-16T00:00:00Z",
      AgeRate: "PG-13",
      IsActive: true,
      Genders: "Action, Sci-Fi, Thriller"
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [SharedService]
    });
    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('CalculateDiferenceOfDays', () => {
    it('should return the number of days between two dates', () => {
      const futureDate = '2024-12-31';
      const daysDifference = service.CalculateDiferenceOfDays(futureDate);
      const expectedDifference = Math.ceil((new Date(futureDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
      expect(daysDifference).toBe(expectedDifference);
    });

    it('should return a positive number for future dates', () => {
      const futureDate = '2025-01-01';
      const daysDifference = service.CalculateDiferenceOfDays(futureDate);
      expect(daysDifference).toBeGreaterThan(0);
    });

    it('should return a negative number for past dates', () => {
      const pastDate = '2023-01-01';
      const daysDifference = service.CalculateDiferenceOfDays(pastDate);
      expect(daysDifference).toBeLessThan(0);
    });
  });

  describe('getAllUniqueGenders', () => {
    it('should return a list of unique genders', () => {
      const uniqueGenders = service.getAllUniqueGenders(mockMovies);
      expect(uniqueGenders.sort()).toEqual(['Acción', 'Aventura','Ciencia ficción']);
    });

    it('should return an empty array when there are no movies', () => {
      const uniqueGenders = service.getAllUniqueGenders([]);
      expect(uniqueGenders).toEqual([]);
    });
  });

  describe('FilterMedia', () => {
    it('should filter movies based on query matching title', () => {
      const filteredMovies = service.FilterMedia('Dune', mockMovies);
      expect(filteredMovies.length).toBe(1);
      expect(filteredMovies[0].Title).toBe('Dune');
    });

    it('should filter movies based on query matching gender', () => {
      const filteredMovies = service.FilterMedia('Acción', mockMovies);
      expect(filteredMovies.length).toBe(2);
    });

    it('should filter movies based on query matching overview', () => {
      const filteredMovies = service.FilterMedia('reverse the damage', mockMovies);
      expect(filteredMovies.length).toBe(1);
      expect(filteredMovies[0].Title).toBe('Avengers: Endgame');
    });

    it('should return an empty array when no movies match the query', () => {
      const filteredMovies = service.FilterMedia('Nonexistent Movie', mockMovies);
      expect(filteredMovies).toEqual([]);
    });
  });

  describe('shuffle', () => {
    it('should shuffle the array of movies', () => {
      const shuffledMovies = service.shuffle(mockMovies);
      expect(shuffledMovies.length).toBe(mockMovies.length);
    });

    it('should return the same array if it has only one item', () => {
      const singleMovie: Movie[] = [mockMovies[0]];
      const shuffledMovies = service.shuffle(singleMovie);
      expect(shuffledMovies).toEqual(singleMovie);
    });

    it('should handle an empty array', () => {
      const emptyArray: Movie[] = [];
      const shuffledMovies = service.shuffle(emptyArray);
      expect(shuffledMovies).toEqual(emptyArray);
    });
  });
});
