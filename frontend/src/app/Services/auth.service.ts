import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '../Dtos/User';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
    constructor(
      private http:HttpClient,
      private router:Router
      ) { }
     
     login(user:User)
     {
      return this.http.post<number>("http://localhost:8000/users/login",user)
     }
      logout() {
        localStorage.removeItem("user");
        this.router.navigate(['login']) ;
      }

      setLoginInfo(id:number)
      {
        localStorage.setItem("user",id.toString());
      }
      
      isLoggedIn():boolean {
        const response=this.getLoginInfo();
        if (response)
          return true;
        else
          return false;
      }

      getLoginInfo() {
        return localStorage.getItem("user") ;
      }   
      registration(user: any): Observable<any> {
        return this.http.post<any>(`http://localhost:8000/users/register`, user);
      }
}