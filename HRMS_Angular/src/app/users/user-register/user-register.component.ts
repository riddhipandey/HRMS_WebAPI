import { registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { IUser } from 'src/app/model/user.interface';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  userRegistrationForm : FormGroup;
  user!: IUser;
  formSubmitted : boolean = false;

  constructor(private _formBuilder : FormBuilder, private _userService : UserService, private _alertify : AlertifyService){}

  ngOnInit(){
    this.createRegistrationForm();
  }

  onSubmit(){
    this.formSubmitted = true;
    if(this.userRegistrationForm.valid) {
        console.log(this.userRegistrationForm.value);
        // this.user = JSON.stringify(this.userRegistrationForm.value);
        console.log(this.user);
        this._userService.addUser(this.userData());
        this.userRegistrationForm.reset();
        this._alertify.success('You are rigistered successfully');
        this.formSubmitted = false;
      }else{
        this._alertify.error('please fill all the details');
      }
  }
  userData():IUser{
    return this.user = {userName:this.userName.value, userEmail : this.userEmail.value, 
      userMobile :this.userMobile.value,userPassword : this.userPassword.value }
  }

  createRegistrationForm(){
    this.userRegistrationForm = this._formBuilder.group({
      userName : new FormControl('Riddhi',Validators.required),
      userEmail : new FormControl(null, [Validators.required,Validators.email]),
      userMobile : new FormControl(null, [Validators.minLength(10),Validators.maxLength(10)]),
      userPassword : new FormControl(null, [Validators.required,Validators.minLength(6)]),
      userConfirmPassword : new FormControl(null, [Validators.required])
    }), {validatios : this.passwordMatchValidator}
  }
  
  passwordMatchValidator(fg : AbstractControl) : Validators {
    return (fg.get('userPassword')?.value === fg.get('userConfirmPassword')?.value) ? null as any : {mismatched : true}
  }
  // getter for all form control
  get userName():FormControl {
    return this.userRegistrationForm.get('userName') as FormControl;
  }
  get userEmail() : FormControl{
    return this.userRegistrationForm.get('userEmail') as FormControl;
  }
  get userMobile() : FormControl{
    return this.userRegistrationForm.get('userMobile') as FormControl;
  }
  get userPassword() : FormControl{
    return this.userRegistrationForm.get('userPassword') as FormControl;
  }
  get userConfirmPassword() : FormControl{
    return this.userRegistrationForm.get('userConfirmPassword') as FormControl
  }
  
}

