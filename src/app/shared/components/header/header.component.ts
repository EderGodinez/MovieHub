import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Options, UserOptions } from 'src/app/utils/UserOptions';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserService } from 'src/app/auth/services/user.service';
import { User } from 'src/app/auth/interfaces/User.interface';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { NgStyle, NgIf, NgFor, TitleCasePipe } from '@angular/common';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        NgStyle,
        OverlayPanelModule,
        NgIf,
        RouterLink,
        NgFor,
        RouterLinkActive,
        TitleCasePipe,
    ],
})
export class HeaderComponent implements OnInit{
  constructor(private readonly Router:Router,private readonly User:UserService) { }
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;
  items: MenuItem[] | undefined;

  activeItem: any | undefined;
  isUserMenuOpen: boolean = false;

  OptionsU: UserOptions[] = new Options(this.Router,this.User).UserOp;


  ngOnInit() {
      this.items = [
          { label: 'Inicio', icon: 'bi bi-house-door-fill',routerLink:'Inicio' },
          { label: 'Generos', icon: 'bi bi-book', routerLink:'Generos'},
          { label: 'Series', icon: 'bi bi-tv' ,routerLink:'Series'},
          { label: 'Peliculas', icon: 'bi bi-film',routerLink:'Peliculas' },
          { label: 'Favoritos', icon: 'bi bi-star-fill',routerLink:'Favoritos' },
          {label:'Vistas', icon:'bi bi-eye',routerLink:'Vistos' }
      ];


  }
SearchMedia(){
  const query=this.searchInput.nativeElement.value;
  if (query) {
    this.Router.navigateByUrl(`search/${query}`);
  this.searchInput.nativeElement.value='';
  }
return;
}
getUser():User|null{
  return this.User.currentUserValue;
}
}
