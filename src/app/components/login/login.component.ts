import { NavAuthComponent } from "../nav-auth/nav-auth.component";
import { AuthService } from './../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  standalone: true,
imports: [NavAuthComponent,ReactiveFormsModule,RouterLink,TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly _AuthService =inject(AuthService)
  msgError:string ="";
  isLoading:boolean =false;

  private readonly   _FormBuilder =inject(FormBuilder);
  private readonly   _Router =inject(Router);

  msgSuccess:boolean=false;


  loginForm:FormGroup = this._FormBuilder.group({

    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],



  })

 



 

  loginTest():void{


    if (this.loginForm.valid) {

          this.isLoading = true;

 this._AuthService.setloginForm(this.loginForm.value).subscribe({

  next:(res)=>{
console.log(res);
if (res.message =='success') {
  this.msgSuccess=true;
  
  setTimeout(() => {

localStorage.setItem('userToken',res.token)
this._AuthService.saveUserData();

      this._Router.navigate(['/home'])

  }, 2000);

  
} 
this.isLoading = false;

  },
  error:(err:HttpErrorResponse)=>{
    this.msgError= err.error.massage
    console.log(err);
    this.isLoading = false;

      }

 })
   }

   else{
    this.loginForm.setErrors({mismatch:true})
    this.loginForm.markAllAsTouched()
   }
    
  }

}
