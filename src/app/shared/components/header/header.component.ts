import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UserOp, UserOptions } from 'src/app/utils/UserOptions';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit,AfterViewInit{
  constructor(private readonly Router:Router) { }
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;
  ngAfterViewInit(): void {
    if (this.searchInput) {
      console.log(this.searchInput.nativeElement.value); // Puedes acceder al valor del input aquí
    }
  }
  items: MenuItem[] | undefined;

  activeItem: any | undefined;
  isUserMenuOpen: boolean = false;
  get Islogin() {
    return localStorage.getItem('user') ? true : false;
  }
  OptionsU: UserOptions[] = UserOp;


  ngOnInit() {
      this.items = [
          { label: 'Inicio', icon: 'bi bi-house-door-fill',routerLink:'Inicio' },
          { label: 'Generos', icon: 'bi bi-book', routerLink:'Generos'},
          { label: 'Favoritos', icon: 'bi bi-star-fill',routerLink:'Favoritos' },
          { label: 'Series', icon: 'bi bi-tv' ,routerLink:'Series'},
          { label: 'Peliculas', icon: 'bi bi-film',routerLink:'Peliculas' },
      ];


  }
  onTabChange(label: string) {
    this.Router.navigate([label]);
  }
SearchMedia(){
  this.Router.navigateByUrl(`search/${this.searchInput.nativeElement.value}`);
  this.searchInput.nativeElement.value='';
}
}
