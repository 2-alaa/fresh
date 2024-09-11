import { AuthService } from './../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _AuthService =inject(AuthService)
  
  isLoading:boolean =false;

  private readonly   _FormBuilder =inject(FormBuilder);
  private readonly   _Router =inject(Router);
msgError:string ="";
  msgSuccess:boolean=false;


  registerForm:FormGroup = this._FormBuilder.group({
    name:[null ,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
    rePassword:[null],
    phone:[null,[Validators.required,Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]],



  },{validators:this.confirmPassword})

 

  confirmPassword(g:AbstractControl){
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      
      return null
      
    }
    else{
      return {mismatch:true}
    }

  }

 

  registerTest():void{


    if (this.registerForm.valid) {

          this.isLoading = true;

 this._AuthService.setRegisterForm(this.registerForm.value).subscribe({

  next:(res)=>{
console.log(res);
if (res.message =='success') {
  this.msgSuccess=true;
  
  setTimeout(() => {
      this._Router.navigate(['/login'])

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
    this.registerForm.setErrors({mismatch:true})
    this.registerForm.markAllAsTouched()
   }
    
  }




}
