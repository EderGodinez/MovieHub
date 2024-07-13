import { Injectable } from '@angular/core';
import { User } from '../interfaces/User.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }
  Users:User[]=[];
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }
  UserLogin(email:string,password:string):string{
    const userExist=this.Users.find((user)=>user.email===email && user.password===password);
    if(userExist){
     this.setCurrentUser(userExist);
      return `Bienvenido ${userExist.name}`
    }
    else{

      return 'Usuario o contraseña incorrectos';
    }
  }
  register(user:User):string{
    const userExist=this.Users.find((user)=>user.email===user.email);
    if(userExist){
      return 'El usuario ya existe';
    }
    this.Users.push(user);
    this.setCurrentUser(user);
    return 'Usuario registrado';
  }
  logout(){
   this.setCurrentUser(null);
  }
  AddFavoriteMedia(mediaId:number){
    if(this.currentUserValue){
      this.currentUserValue.FavoritesMediaId.push(mediaId);
    }
  }
  removeFavoriteMedia(mediaId:number){
    if(this.currentUserValue){
      this.currentUserValue.FavoritesMediaId=this.currentUserValue.FavoritesMediaId.filter((id)=>id!==mediaId);
    }
  }
}
