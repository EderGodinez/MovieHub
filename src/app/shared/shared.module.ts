import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { RouterModule } from '@angular/router';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SharedService } from './service/shared.service';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AuthButtonComponent,
    FormFieldComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    PrimeNGModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AuthButtonComponent,
    FormFieldComponent,
    LoadingComponent
  ],
  providers: [SharedService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
