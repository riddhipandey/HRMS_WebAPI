import { Injectable } from "@angular/core";
import { IUser } from "../model/user.interface";

@Injectable({
    providedIn:'root'
})
export class AuthenticationService{
    authUser(user:IUser){
        let userArray : [IUser];
        if(localStorage.length>0 && localStorage.getItem('Users')){
            userArray = JSON.parse(localStorage.getItem('Users')||'');
        }
        else{
            userArray = [{userName:'',userEmail:'',userMobile:0,userPassword :''}];
        }
        return userArray.find(p => p.userEmail == user.userEmail && p.userPassword === user.userPassword)
    }
}