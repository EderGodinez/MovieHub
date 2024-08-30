import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
    selector: 'main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
    standalone: true,
    imports: [HeaderComponent, RouterOutlet, FooterComponent]
})
export class MainLayoutComponent {

}
