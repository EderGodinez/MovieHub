import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/validators/validator.service';
import { UserService } from '../../auth/services/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
constructor(private readonly FB:FormBuilder,private readonly ValidatorService:ValidatorService,
  private readonly UserService:UserService,private MessageService:MessageService,private Router:Router) { }
RegisterForm = this.FB.group({
  Name: ['',[Validators.required,Validators.pattern(/^([a-zA-Z]+)(?: ([a-zA-Z]+))?$/)]],
  Email: ['',[Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
  Password: ['',[Validators.required,Validators.minLength(10)]],
  ConfirmPassword: ['',[Validators.required]]
},{
  validators:this.ValidatorService.AreFieldsEquals('Password','ConfirmPassword')
});
RegisterUser() {
  this.RegisterForm.markAllAsTouched();
  if (this.RegisterForm.valid) {
    const {Email,Name,Password}= this.RegisterForm.value;
    this.RegisterForm.get('Email')?.setErrors(null);
    const message=this.UserService.register({id:uuidv4(),email:Email,name:Name,password:Password,FavoritesMediaId:[]});
    if(message==='El usuario ya existe'){
      this.MessageService.add({ severity: 'error', summary: 'Registro', detail: message });
      this.RegisterForm.get('Email')?.setErrors({emailExist:true});
      return;
    }
    else{
      this.MessageService.add({ severity: 'success', summary: 'Registro', detail: message });
      setTimeout(() => {
        this.Router.navigate(['/Inicio']);
      }, 3000);
    }


  }
  return;
}
ValidateField(field: string): boolean|null {
  return this.ValidatorService.isValidField(this.RegisterForm, field);
 }
 GetFieldErrorMessage(field: string,type:string=''): string|null {
  return this.ValidatorService.getFieldError(this.RegisterForm, field,type);
 }
}
