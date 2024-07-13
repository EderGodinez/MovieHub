
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserService } from '../auth/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  constructor(private readonly UserService:UserService) { }
  public AreFieldsEquals(pass: string, confirm: string): ValidatorFn {
    return (Form: AbstractControl): ValidationErrors | null => {
      const field1 = Form.get(pass);
      const field2 = Form.get(confirm);
      if (!field1 || !field2) {
        return null;
      }
      if (field1.value !== field2.value) {
        field2.setErrors({ FieldsDiferents: true });
        return { FieldsDiferents: true };
      } else {
        if (field2.errors) {
          delete field2.errors['FieldsDiferents'];
          if (!Object.keys(field2.errors).length) {
            field2.setErrors(null);
          }
        }
        return null;
      }
    };
  }

  isValidField( MyForm:FormGroup,field: string ): boolean | null {
    return MyForm.controls[field].errors
      && MyForm.controls[field].touched;
  }

  getFieldError( MyForm:FormGroup,field: string,type:string=''): string | null {
    if ( !MyForm.controls[field] ) return null;
    const errors = MyForm.controls[field].errors || {};
    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Campo requiere mínimo ${ errors['minlength'].actualLength }/${ errors['minlength'].requiredLength } caracteres.`;
        case 'maxlength':
          return `Máximo ${errors['maxlength'].actualLength}/${errors['maxlength'].requiredLength} caracteres.`;
        case 'pattern':
                return `Formato de campo ${type} inválido.`;
        case 'FieldsEquals':
          return 'La nueva contraseña debe ser diferente a la anterior'
        case 'FieldsDiferents':
          return 'Las contraseñas no coinciden'
        case 'wrongPass':
          return 'Contraseña incorrecta'
      }
    }
    return null;
  }

}
