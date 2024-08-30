import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { MessageService } from 'primeng/api';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MockComponent } from 'ng-mocks';
import { Toast } from 'primeng/toast';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/services/user.service';
import { ValidatorService } from 'src/app/validators/validator.service';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockRouter: jasmine.SpyObj<Router>;
  beforeEach(() => {
    mockUserService = jasmine.createSpyObj('UserService', ['UserLogin']);
    mockMessageService = jasmine.createSpyObj('MessageService', ['add']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
    imports: [
        PrimeNGModule,
        HttpClientTestingModule,
        SharedModule,
        ReactiveFormsModule,
        LoginPageComponent,
        MockComponent(Toast)
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [
        MessageService,
        FormBuilder,
        ValidatorService,
        { provide: UserService, useValue: mockUserService },
        { provide: MessageService, useValue: mockMessageService },
        { provide: Router, useValue: mockRouter }
    ]
});
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should return field error message', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.GetFieldErrorMessage('email')).toBe('Este campo es requerido');
    expect(component.GetFieldErrorMessage('password')).toBe('Este campo es requerido');
  });

  it('should call UserService.UserLogin and handle error message', () => {
    mockUserService.UserLogin.and.returnValue(new Promise(resolve => resolve('Usuario o contraseña incorrectos')));
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    component.onSubmit();
    expect(mockUserService.UserLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(mockMessageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Inicio de sesión', detail: 'Usuario o contraseña incorrectos' });
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should call UserService.UserLogin and handle success message', () => {
    mockUserService.UserLogin.and.returnValue(new Promise(resolve => resolve('Bienvenido')));
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    component.onSubmit();
    expect(mockUserService.UserLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(mockMessageService.add).toHaveBeenCalledWith({ severity: 'success', summary: 'Inicio de sesión', detail: 'Inicio de sesión exitoso' });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/Inicio']);
  });
});
