import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  // loggedInUser!: string;
 constructor(private _router : Router){

 }

  loggedIn(){
    return localStorage.getItem('token');
    // console.log(this.loggedInUser);
    // return this.loggedInUser;
  }

  onLogOut(){
    localStorage.removeItem('token');
    this._router.navigate(['/user-login']);
  }
}
