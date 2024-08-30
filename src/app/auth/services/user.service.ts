import { Injectable } from '@angular/core';
import { User } from '../interfaces/User.interface';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateUser } from '../interfaces/RegisterUser.interface';
import { LoginResponse } from '../interfaces/loginResponse.interface';
import { UserRegisterResponse } from '../interfaces/UserRegisterResponse.interface';
import { MediaListResponse } from '../interfaces/MediaListResponse.interface';

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
    const result =firstValueFrom(this.HttpClient.post<LoginResponse>(`${environment.API_URL}user/login`,{email,password})).then((res)=>{
      if(res.user){
        this.setCurrentUser({Name:res.user.name,Email:res.user.email,FavoritesMediaId:res.user.favoritesMediaId.$values,Id:res.user.id});
        localStorage.setItem('token',res.token);
        return `Bienvenido ${res.user.name}`;
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
      return 'Error al registrar usuario';
    }

  }
  logout(){
  this.setCurrentUser(null);
    localStorage.removeItem('token');
  }
  AddFavoriteMedia(mediaId:number):Observable<string>{
  return this.HttpClient.post<string>(`${environment.API_URL}user/${this.currentUserValue?.Id}/action?MediaId=${mediaId}&Action=L`,null);
  }
  MarkMediaView(mediaId:number):Observable<string>{
    return this.HttpClient.post<string>(`${environment.API_URL}user/${this.currentUserValue?.Id}/action?MediaId=${mediaId}&Action=V`,null);
    }
  async getWatchedMediaIds():Promise<number[]>{
  return firstValueFrom(this.HttpClient.get<MediaListResponse>(`${environment.API_URL}user/${this.currentUserValue?.Id}/view`)).then((res)=>{
    return res.mediaView.$values;
  });
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
