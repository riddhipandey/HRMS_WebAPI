import { Component } from '@angular/core';
import {NgForm} from '@angular/forms'
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  constructor(private _authenticationService : AuthenticationService
              ,private _alertify : AlertifyService, private _router : Router){

  }
  
  onLogin(loginForm : NgForm){
    console.log(loginForm.value);
    const user = this._authenticationService.authUser(loginForm.value);
    if(user){
      this._router.navigate(['/']);
      localStorage.setItem('token',user.userName);
      this._alertify.success('Logged In');
    }else{
      this._alertify.error('Please enter correct email and password')
    }
  }
}
