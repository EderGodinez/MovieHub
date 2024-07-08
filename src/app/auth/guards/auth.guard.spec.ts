import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { authGuard } from './auth.guard';


const mockRoute = {};
const mockState = {} as any;

describe('authGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], 
    });
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should return true for the given route and state', () => {
    const result = authGuard(mockRoute as any, mockState);
    expect(result).toBeTrue();
  });
});
