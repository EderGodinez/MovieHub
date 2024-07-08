import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
constructor(private readonly FB:FormBuilder) { }
RegisterForm = this.FB.group({
  Name: [''],
  Email: [''],
  Password: [''],
  ConfirmPassword: ['']
});
RegisterUser() {
  console.log('Usuario registrado');
}
}
