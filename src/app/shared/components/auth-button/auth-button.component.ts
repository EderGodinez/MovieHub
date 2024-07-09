import { Component, Input } from '@angular/core';

@Component({
  selector: 'submit-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent {
@Input() label: string = '';
@Input() click: () => void = () => {};
@Input() ClassName: string = '';
@Input() disabled: boolean = false;

handleClick() {
  if (this.click) {
    this.click();
  }
}
}
