import { Injectable } from "@angular/core";
import { IUser } from "../model/user.interface";


@Injectable({
  providedIn : 'root'
})
export class UserService{

  addUser(user: IUser){
    let users = [];
    if(localStorage.length>0 && localStorage.getItem('Users')){
      users = JSON.parse(localStorage.getItem('Users') || '');
      console.log(users.value);
      users = [user,...users];
    }else{
      users = [user];
    }
    console.log(users.length);
    localStorage.setItem('Users',JSON.stringify(users));
  }
}

