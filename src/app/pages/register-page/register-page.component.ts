import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorService } from 'src/app/validators/validator.service';
import { UserService } from '../../auth/services/user.service';
import { MessageService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { AuthButtonComponent } from '../../shared/components/auth-button/auth-button.component';
import { NgIf } from '@angular/common';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
    standalone: true,
    imports: [ToastModule, FormsModule, ReactiveFormsModule, FormFieldComponent, NgIf, AuthButtonComponent, RouterLink]
})
export class RegisterPageComponent {
  RegisterForm: FormGroup;

  constructor(
    private readonly FB: FormBuilder,
    private readonly ValidatorService: ValidatorService,
    private readonly UserService: UserService,
    private readonly MessageService: MessageService,
    private readonly Router: Router
  ) {
    this.RegisterForm = this.FB.group({
      Name: ['', [Validators.required, Validators.pattern(/^([a-zA-Z]+)(?: ([a-zA-Z]+))?$/)]],
      Email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      Password: ['', [Validators.required, Validators.minLength(10)]],
      ConfirmPassword: ['', [Validators.required]]
    }, {
      validators: this.ValidatorService.AreFieldsEquals('Password', 'ConfirmPassword')
    });
  }

  async RegisterUser() {
    this.RegisterForm.markAllAsTouched();
    if (this.RegisterForm.valid) {
      const { Email, Name, Password } = this.RegisterForm.value;

      try {
        const message = await this.UserService.register({
          email: Email,
          name: Name,
          password: Password
        });

        if (message.includes('error')) {
          this.MessageService.add({ severity: 'error', summary: 'Registro', detail: message });
          this.RegisterForm.get('Email')?.setErrors({ emailExist: true });
        } else {
          this.MessageService.add({ severity: 'success', summary: 'Registro', detail: message });
          setTimeout(() => {
            this.Router.navigate(['/Inicio']);
          }, 3000);
        }
      } catch (error) {
        this.MessageService.add({ severity: 'error', summary: 'Registro', detail: 'Error al registrar usuario' });
      }
    }
  }

  ValidateField(field: string): boolean|null {
    return this.ValidatorService.isValidField(this.RegisterForm, field);
  }

  GetFieldErrorMessage(field: string, type: string = ''): string|null {
    return this.ValidatorService.getFieldError(this.RegisterForm, field, type);
  }
}
