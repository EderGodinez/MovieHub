import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorService } from '../../validators/validator.service';
import { MessageService } from 'primeng/api';
import { UserService } from '../../auth/services/user.service';
import { Router, RouterLink } from '@angular/router';
import { AuthButtonComponent } from '../../shared/components/auth-button/auth-button.component';
import { NgIf } from '@angular/common';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    standalone: true,
    imports: [ToastModule, FormsModule, ReactiveFormsModule, FormFieldComponent, NgIf, AuthButtonComponent, RouterLink]
})
export class LoginPageComponent {
constructor(private readonly FB:FormBuilder,private readonly ValidatorService:ValidatorService,private messageService: MessageService,private readonly UserService:UserService,private readonly Router:Router) { }
loginForm!: FormGroup;


ngOnInit(): void {
  this.loginForm = this.FB.group({
    email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    password: ['', [Validators.required, Validators.minLength(10)]]
  });
}

async onSubmit() {
  this.loginForm.markAllAsTouched();
  if (this.loginForm.valid) {
    const {email,password} =this.loginForm.value
    const message=await this.UserService.UserLogin(email,password);
    if(!message.includes('Bienvenido')){
      this.messageService.add({ severity: 'error', summary: 'Inicio de sesión', detail: message });
      return;
    }
    else{
      this.messageService.add({ life:90000,severity: 'success', summary: 'Inicio de sesión', detail: message });
      setTimeout(() => {
        this.Router.navigate(['/Inicio']);
      }, 2000);
    }
    return;
  }
}
ValidateField(field: string): boolean|null {
 return this.ValidatorService.isValidField(this.loginForm, field);
}
GetFieldErrorMessage(field: string,type:string=''): string|null {
 return this.ValidatorService.getFieldError(this.loginForm, field,type);
}
}
