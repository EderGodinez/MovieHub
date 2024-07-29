import { Injectable } from '@angular/core';
import { User } from '../interfaces/User.interface';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateUser } from '../interfaces/RegisterUser.interface';
import { LoginResponse } from '../interfaces/loginResponse.interface';
import { UserRegisterResponse } from '../interfaces/UserRegisterResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly HttpClient : HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }
  async UserLogin(email:string,password:string):Promise<string>{
    const result =firstValueFrom(this.HttpClient.post<LoginResponse>(`${environment.API_URL}users/login`,{email,password})).then((res)=>{
      if(res.user){
        this.setCurrentUser({Name:res.user.Name,Email:res.user.Email,FavoritesMediaId:res.user.FavoritesMediaId});
        return `Bienvenido ${res.user.Name}`;
      }
      else{
        return res.message;
      }
    })
  return result;
  }
  async register(user:CreateUser):Promise<string>{
    try{
      const result =firstValueFrom(this.HttpClient.post<UserRegisterResponse>(`${environment.API_URL}users/register`,user)).then((res)=>{
        if(res.name){
          this.setCurrentUser({Name:res.name,Email:res.email,FavoritesMediaId:[]});
          return `${res.message} bienvenido ${res.name}`;
        }
        else{
          return `error ${user.email} ya esta registrado`;
        }
      })
    return result;
    }
    catch(error){
      console.log(error);
      return 'Error al registrar usuario';
    }

  }
  logout(){
   this.setCurrentUser(null);
  }
  AddFavoriteMedia(mediaId:number){
    if(this.currentUserValue){
      if(!this.currentUserValue.FavoritesMediaId){
        this.currentUserValue.FavoritesMediaId=[];
      }
      this.currentUserValue.FavoritesMediaId.push(mediaId);
    }
  }
  removeFavoriteMedia(mediaId:number){
    if(this.currentUserValue){
      if(!this.currentUserValue.FavoritesMediaId){
        this.currentUserValue.FavoritesMediaId=[];
      }
      this.currentUserValue.FavoritesMediaId=this.currentUserValue.FavoritesMediaId.filter((id)=>id!==mediaId);
    }
  }
}
