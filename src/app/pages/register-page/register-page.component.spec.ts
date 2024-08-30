import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RegisterPageComponent } from './register-page.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ValidatorService } from 'src/app/validators/validator.service';
import { UserService } from '../../auth/services/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { of } from 'rxjs';
import { MockComponent } from 'ng-mocks';
import { Toast, ToastModule, } from 'primeng/toast';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;
  let mockValidatorService: jasmine.SpyObj<ValidatorService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockValidatorService = jasmine.createSpyObj('ValidatorService', ['firstNameAndLastnamePattern', 'emailPattern', 'AreFieldsEquals', 'isValidField', 'getFieldError']);
    mockUserService = jasmine.createSpyObj('UserService', ['register']);
    mockMessageService = jasmine.createSpyObj('MessageService', ['add']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Simulamos el observable del MessageService
    mockMessageService.add.and.callFake(() => {});

    await TestBed.configureTestingModule({
    imports: [
        ReactiveFormsModule,
        SharedModule,
        PrimeNGModule, ToastModule,
        RegisterPageComponent,
        MockComponent(Toast)
    ],
    providers: [
        FormBuilder,
        { provide: UserService, useValue: mockUserService },
        { provide: MessageService, useValue: mockMessageService },
        { provide: ValidatorService, useValue: mockValidatorService },
        { provide: Router, useValue: mockRouter }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] // Permite el uso de elementos personalizados
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display success message on successful registration', () => {
    component.RegisterForm.setValue({
      Name: 'John Doe',
      Email: 'john.doe@example.com',
      Password: 'password123',
      ConfirmPassword: 'password123'
    });
    mockUserService.register.and.returnValue(new Promise(resolve => resolve('Usuario registrado')));
    component.RegisterUser();
    expect(mockMessageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Registro',
      detail: 'Usuario registrado'
    });
  });

  it('should display error message when user already exists', () => {
    component.RegisterForm.setValue({
      Name: 'John Doe',
      Email: 'john.doe@example.com',
      Password: 'password123',
      ConfirmPassword: 'password123'
    });
    mockUserService.register.and.returnValue(new Promise(resolve => resolve('error')));
    component.RegisterUser();
    expect(mockMessageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Registro',
      detail: 'El usuario ya existe'
    });
    expect(component.RegisterForm.get('Email')?.hasError('emailExist')).toBeTrue();
  });

  it('should navigate to home page after successful registration', fakeAsync(() => {
    component.RegisterForm.setValue({
      Name: 'John Doe',
      Email: 'john.doe@example.com',
      Password: 'password123',
      ConfirmPassword: 'password123'
    });
    mockUserService.register.and.returnValue(new Promise(resolve => resolve('Usuario registrado')));
    component.RegisterUser();
    tick(3000);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/Inicio']);
  }));

  it('should mark all fields as touched and not proceed if form is invalid', () => {
    spyOn(component.RegisterForm, 'markAllAsTouched');
    component.RegisterUser();
    expect(component.RegisterForm.markAllAsTouched).toHaveBeenCalled();
    expect(component.RegisterForm.valid).toBeFalse();
    expect(mockUserService.register).not.toHaveBeenCalled();
  });

  it('should validate fields correctly', () => {
    mockValidatorService.isValidField.and.returnValue(true);
    const isValid = component.ValidateField('Name');
    expect(mockValidatorService.isValidField).toHaveBeenCalledWith(component.RegisterForm, 'Name');
    expect(isValid).toBeTrue();
  });

  it('should get field error messages correctly', () => {
    mockValidatorService.getFieldError.and.returnValue('Error message');
    const errorMessage = component.GetFieldErrorMessage('Name');
    expect(mockValidatorService.getFieldError).toHaveBeenCalledWith(component.RegisterForm, 'Name', '');
    expect(errorMessage).toBe('Error message');
  });

  it('should call ToastService.add method correctly', () => {
    component.RegisterForm.setValue({
      Name: 'John Doe',
      Email: 'john.doe@example.com',
      Password: 'password123',
      ConfirmPassword: 'password123'
    });
    mockUserService.register.and.returnValue(new Promise(resolve => resolve('Usuario registrado')));
    component.RegisterUser();
    expect(mockMessageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Registro',
      detail: 'Usuario registrado'
    });
  });

  it('should handle empty form field error messages correctly', () => {
    mockValidatorService.getFieldError.and.returnValue('Error message');
    const errorMessage = component.GetFieldErrorMessage('NonExistingField');
    expect(mockValidatorService.getFieldError).toHaveBeenCalledWith(component.RegisterForm, 'NonExistingField', '');
    expect(errorMessage).toBe('Error message');
  });
});
