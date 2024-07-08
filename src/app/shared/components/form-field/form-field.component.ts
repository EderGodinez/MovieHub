import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {
@Input() label: string = '';
@Input() type: string = 'text';
}
