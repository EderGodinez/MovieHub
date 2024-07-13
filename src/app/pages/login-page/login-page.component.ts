import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../validators/validator.service';
import { MessageService } from 'primeng/api';
import { UserService } from '../../auth/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
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

onSubmit() {
  this.loginForm.markAllAsTouched();
  if (this.loginForm.valid) {
    const {email,password} =this.loginForm.value
    console.log(email,password);
    const message=this.UserService.UserLogin(email,password);
    console.log(message);
    if(message==='Usuario o contraseña incorrectos'){
      this.messageService.add({ severity: 'error', summary: 'Inicio de sesión', detail: message });
      return;
    }
    else{
      this.messageService.add({ severity: 'success', summary: 'Inicio de sesión', detail: message });
      this.Router.navigate(['/Inicio']);
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
