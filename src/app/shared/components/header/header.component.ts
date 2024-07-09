import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Options, UserOptions } from 'src/app/utils/UserOptions';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserService } from 'src/app/auth/services/user.service';
import { User } from 'src/app/auth/interfaces/User.interface';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
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
          { label: 'Favoritos', icon: 'bi bi-star-fill',routerLink:'Favoritos' },
          { label: 'Series', icon: 'bi bi-tv' ,routerLink:'Series'},
          { label: 'Peliculas', icon: 'bi bi-film',routerLink:'Peliculas' },
      ];


  }
SearchMedia(){
  this.Router.navigateByUrl(`search/${this.searchInput.nativeElement.value}`);
  this.searchInput.nativeElement.value='';
}
getUser():User|null{
  return this.User.currentUserValue;
}
}
