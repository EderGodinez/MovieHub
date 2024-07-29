import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../interfaces/User.interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('UserLogin', () => {
    it('should return welcome message if user exists', () => {
      const user: User = { Name: 'John', Email: 'john@example.com', FavoritesMediaId: [] };
      service.register({email: user.Email, password: '123456', name: user.Name});
      const result = service.UserLogin('john@example.com', '123456');
      expect(result).toBe(Promise.resolve(`Bienvenido ${user.Name}`));
    });

    it('should return error message if user does not exist', () => {
      const result = service.UserLogin('nonexistent@example.com', '123456');
      expect(result).toBe(Promise.resolve('Usuario o contraseña incorrectos'));
    });
  });

  describe('register', () => {
    it('should register a new user', () => {
      const user: User = {  Name: 'Jane', Email: 'jane@example.com',FavoritesMediaId: [] };
      const result = service.register({email: user.Email, password: 'abcdef', name: user.Name});
      expect(result).toBe(Promise.resolve(`Usuario registrado correctamente bienvenido ${user.Name}`));
      expect(service.currentUserValue).toEqual(user);
    });

    it('should not register an existing user', () => {
      const user: User = { Name: 'Jane', Email: 'jane@example.com', FavoritesMediaId: [] };
      service.register({email: user.Email, password: 'abcdef', name: user.Name});
      const result = service.register({email: user.Email, password: 'abcdef', name: user.Name});
      expect(result).toBe(Promise.resolve(`Error ${user.Email} ya está registrado`));
    });
  });

  describe('logout', () => {
    it('should log out the current user', () => {
      const user: User = {Name: 'John', Email: 'john@example.com', FavoritesMediaId: [] };
      service.logout();
      expect(service.currentUserValue).toBeNull();
    });
  });

  describe('AddFavoriteMedia', () => {
    it('should add a media ID to the user\'s favorites', () => {
      const user: User = {Name: 'John', Email: 'john@example.com', FavoritesMediaId: [] };
      service.AddFavoriteMedia(101);
      expect(service.currentUserValue?.FavoritesMediaId).toContain(101);
    });
  });

  describe('removeFavoriteMedia', () => {
    it('should remove a media ID from the user\'s favorites', () => {
      const user: User = { Name: 'John', Email: 'john@example.com', FavoritesMediaId: [101] };
      service.removeFavoriteMedia(101);
      expect(service.currentUserValue?.FavoritesMediaId).not.toContain(101);
    });
  });
});
