import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
    selector: 'form-field',
    templateUrl: './form-field.component.html',
    styleUrls: ['./form-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormFieldComponent),
            multi: true
        }
    ],
    standalone: true,
    imports: [NgClass]
})
export class FormFieldComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() HasError: boolean|null = false;

  value: string = '';

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement if needed
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  handleBlur(): void {
    this.onTouched();
  }
}
