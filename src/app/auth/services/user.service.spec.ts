import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../interfaces/User.interface';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('UserLogin', () => {
    it('should return welcome message if user exists', () => {
      const user: User = { id: 'xxxxxxxxx', name: 'John', email: 'john@example.com', password: '123456', FavoritesMediaId: [] };
      service.register(user);
      const result = service.UserLogin('john@example.com', '123456');
      expect(result).toBe('Bienvenido John');
    });

    it('should return error message if user does not exist', () => {
      const result = service.UserLogin('nonexistent@example.com', '123456');
      expect(result).toBe('Usuario o contraseña incorrectos');
    });
  });

  describe('register', () => {
    it('should register a new user', () => {
      const user: User = { id: 'xxxxxxxxx', name: 'Jane', email: 'jane@example.com', password: 'abcdef', FavoritesMediaId: [] };
      const result = service.register(user);
      expect(result).toBe('Usuario registrado');
      expect(service.currentUserValue).toEqual(user);
    });

    it('should not register an existing user', () => {
      const user: User = { id: 'xxxxxxxxx', name: 'Jane', email: 'jane@example.com', password: 'abcdef', FavoritesMediaId: [] };
      service.register(user);
      const result = service.register(user);
      expect(result).toBe('El usuario ya existe');
    });
  });

  describe('logout', () => {
    it('should log out the current user', () => {
      const user: User = { id: 'xxxxxxxxx', name: 'John', email: 'john@example.com', password: '123456', FavoritesMediaId: [] };
      service.register(user);
      service.logout();
      expect(service.currentUserValue).toBeNull();
    });
  });

  describe('AddFavoriteMedia', () => {
    it('should add a media ID to the user\'s favorites', () => {
      const user: User = { id: 'xxxxxxxxx', name: 'John', email: 'john@example.com', password: '123456', FavoritesMediaId: [] };
      service.register(user);
      service.AddFavoriteMedia(101);
      expect(service.currentUserValue?.FavoritesMediaId).toContain(101);
    });
  });

  describe('removeFavoriteMedia', () => {
    it('should remove a media ID from the user\'s favorites', () => {
      const user: User = { id: 'xxxxxxxxx', name: 'John', email: 'john@example.com', password: '123456', FavoritesMediaId: [101] };
      service.register(user);
      service.removeFavoriteMedia(101);
      expect(service.currentUserValue?.FavoritesMediaId).not.toContain(101);
    });
  });
});
