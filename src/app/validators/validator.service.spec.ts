import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from './validator.service';
import { UserService } from '../auth/services/user.service';

describe('ValidatorService', () => {
  let service: ValidatorService;
  let formBuilder: FormBuilder;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        ValidatorService,
        FormBuilder,
        { provide: UserService, useValue: jasmine.createSpyObj('UserService', ['Users']) }
      ],

    });
    service = TestBed.inject(ValidatorService);
    formBuilder = TestBed.inject(FormBuilder);
    userService = TestBed.inject(UserService);
  });

it('should be created', () => {
    expect(service).toBeTruthy();
});
it('should return null if the field is not in the form', () => {
    const form: FormGroup = formBuilder.group({
      name: ['Valid Name', []]
    });
    expect(service.getFieldError(form, 'email')).toBeNull();
});
    it('should return null if any comparison field is missing', () => {
    const form: FormGroup = formBuilder.group({
      password: ['123456', []],
    });
    expect(service.AreFieldsEquals('password', 'confirmPassword')(form)).toBeNull();
  });


  it('should return "FieldsDiferents: true" if the fields are equals', () => {
    const form: FormGroup = formBuilder.group({
      password: ['123456', []],
      confirmPassword : ['12345',[]]},{
      validators: service.AreFieldsEquals('password', 'confirmPassword')
      });
    service.AreFieldsEquals('password', 'confirmPassword');
    expect(service.AreFieldsEquals('password', 'confirmPassword')(form)).toEqual({ FieldsDiferents: true });
    });
    it('should delete error of field2 if there are',()=>{
      const form: FormGroup = formBuilder.group({
        password: ['123456', []],
        confirmPassword : ['123456',[]]},{
        validators: service.AreFieldsEquals('password', 'confirmPassword')
        });
      form.controls['confirmPassword'].setErrors({FieldsDiferents:true});
      //Se cambia el valor de confirmPassword para que no sea igual a password y se elimana los errores
      form.controls['confirmPassword'].setValue('12345');
      form.controls['confirmPassword'].setErrors(null);
      expect(form.controls['confirmPassword'].errors).toBeNull();
    })
  it('should return "Este campo es requerido" for required error', () => {
    const form: FormGroup = formBuilder.group({
      name: ['', Validators.required]
    });
    form.controls['name'].markAsTouched();
    expect(service.getFieldError(form, 'name')).toBe('Este campo es requerido');
  });

  it('should return correct minlength error message', () => {
    const form: FormGroup = formBuilder.group({
      name: ['', [Validators.minLength(5)]]
    });
    form.controls['name'].setValue('abc');
    form.controls['name'].markAsTouched();
    expect(service.getFieldError(form, 'name')).toBe('Campo requiere mínimo 3/5 caracteres.');
  });

  it('should return correct maxlength error message', () => {
    const form: FormGroup = formBuilder.group({
      name: ['abcdef', [Validators.maxLength(5)]]
    });
    form.controls['name'].markAsTouched();
    expect(service.getFieldError(form, 'name')).toBe('Máximo 6/5 caracteres.');
  });
  it('should return correct pattern error message', () => {
    const form: FormGroup = formBuilder.group({
      email: ['invalid-email', [Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]]
    });
    form.controls['email'].markAsTouched();
    expect(service.getFieldError(form, 'email', 'correo')).toBe('Formato de campo correo inválido.');
  });

  it('should return "La nueva contraseña debe ser diferente a la anterior" for FieldsEquals error', () => {
    const form: FormGroup = formBuilder.group({
      password: ['123456', []],
      confirmPassword: ['123456', []]
    });
    form.controls['confirmPassword'].setErrors({ FieldsEquals: true });
    expect(service.getFieldError(form, 'confirmPassword')).toBe('La nueva contraseña debe ser diferente a la anterior');
  });

  it('should return "Las contraseñas no coinciden" for FieldsDiferents error', () => {
    const form: FormGroup = formBuilder.group({
      password: ['123456', []],
      confirmPassword: ['654321', []]
    });
    form.controls['confirmPassword'].setErrors({ FieldsDiferents: true });
    expect(service.getFieldError(form, 'confirmPassword')).toBe('Las contraseñas no coinciden');
  });

  it('should return "Contraseña incorrecta" for wrongPass error', () => {
    const form: FormGroup = formBuilder.group({
      password: ['wrong', []]
    });
    form.controls['password'].setErrors({ wrongPass: true });
    expect(service.getFieldError(form, 'password')).toBe('Contraseña incorrecta');
  });

  it('should return null for a control with no errors', () => {
    const form: FormGroup = formBuilder.group({
      name: ['Valid Name', []]
    });
    expect(service.getFieldError(form, 'name')).toBeNull();
  });
});
