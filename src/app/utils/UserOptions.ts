import { Router } from "@angular/router"
import { UserService } from "../auth/services/user.service"

export interface UserOptions{
  icon:string
  url:string
  label:string
  action:()=>void
}
 export class Options{
  constructor(private readonly Router:Router,private readonly UserService:UserService){}
  public  UserOp:UserOptions[]=[
    {
      icon:'bi bi-person-circle',
      url:'Favoritos',
      label:'Favoritos',
      action:()=>{
        this.Router.navigateByUrl('Favoritos')
      }
    },
    {
      icon:'bi bi-box2',
      url:'Vistas',
      label:'Vistas',
      action:()=>{
        this.Router.navigateByUrl('Vistas')
      }
    },
    {
      icon:'bi bi-box-arrow-right',
      url:'Cerrar sesión',
      label:'Cerrar sesión',
      action:()=>{
        this.Router.navigate(['/Inicio']);
        this.UserService.logout();
      }
    }
  ]
}

