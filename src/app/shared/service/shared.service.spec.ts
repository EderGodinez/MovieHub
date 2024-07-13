import { TestBed } from '@angular/core/testing';
import { Movie } from 'src/app/movies/interfaces/movie.interface';
import { SharedService } from './shared.service';
import { SharedModule } from '../shared.module';

describe('FunctionsService', () => {
  let service: SharedService;

  const mockMovies: Movie[] = [
    {
      "adult": false,
      "public_image_path": "assets/images/public_images/jvPMJ2zM92jfXxVEFsqP1MMrLaO.jpg",
      "genders": ["Ciencia ficción", "Acción", "Aventura"],
      "id": 1,
      "original_title": "Dune",
      "overview": "A spice planet is the focal point of a galactic battle.",
      "popularity": 9.5,
      "poster_path": "assets/images/posters/dune.jpg",
      "release_date": "2021-09-03",
      "title": "Dune",
      "vote_average": 8.0,
      "media_type": "movie"
    },
    {
      "adult": false,
      "public_image_path": "assets/images/public_images/someimage.jpg",
      "genders": ["Acción", "Aventura"],
      "id": 2,
      "original_title": "Avengers: Endgame",
      "overview": "The Avengers work to reverse the damage caused by Thanos.",
      "popularity": 8.0,
      "poster_path": "assets/images/posters/endgame.jpg",
      "release_date": "2019-04-26",
      "title": "Avengers: Endgame",
      "vote_average": 8.4,
      "media_type": "movie"
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
      expect(filteredMovies[0].title).toBe('Dune');
    });

    it('should filter movies based on query matching gender', () => {
      const filteredMovies = service.FilterMedia('Acción', mockMovies);
      expect(filteredMovies.length).toBe(2);
    });

    it('should filter movies based on query matching overview', () => {
      const filteredMovies = service.FilterMedia('reverse the damage', mockMovies);
      expect(filteredMovies.length).toBe(1);
      expect(filteredMovies[0].title).toBe('Avengers: Endgame');
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
