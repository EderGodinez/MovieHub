import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserService } from '../auth/services/user.service';
import { Options } from './UserOptions';

describe('Options', () => {
  let options: Options;
  let routerSpy: jasmine.SpyObj<Router>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
    const userServiceMock = jasmine.createSpyObj('UserService', ['logout']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    });

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    options = new Options(routerSpy, userServiceSpy);
  });

  it('should navigate to Favoritos', () => {
    options.UserOp[0].action();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('Favoritos');
  });

  it('should navigate to Vistas', () => {
    options.UserOp[1].action();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('Vistas');
  });

  it('should navigate to Inicio and logout on Cerrar sesión', () => {
    options.UserOp[2].action();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/Inicio']);
    expect(userServiceSpy.logout).toHaveBeenCalled();
  }); 
});
