
import { AuthService } from './../../core/services/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule,TranslateModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {

  private readonly _AuthService=inject(AuthService)
  private readonly _Router=inject(Router)
  isLoading:boolean =false;
  
  
  step:number=1;

  verifyEmail:FormGroup = new FormGroup({


    email:new FormControl(null,[Validators.required,Validators.email])
  })

  step1():void{

   let emailValue= this.verifyEmail.get('email')?.value  
   this.resetPassword.get('email')?.patchValue(emailValue)
   
    if (this.verifyEmail.valid) {
      this.isLoading = true
       this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
      next:(res)=>{
        console.log(res)
        if (res.statusMsg ==='success') {
           this.step = 2;
        }

      },

      error:(err)=>{
        console.log(err)

      }
    })
    }
   
  }

  verifyCode:FormGroup = new FormGroup({

    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6}$/)])
  })

  
  step2():void{

    if (this.verifyCode.valid) {
     this.isLoading =true;
      this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
      next:(res)=>{
        console.log(res)
        if (res.status ==='Success') {
           this.step = 3;
        }

      },

      error:(err)=>{
        console.log(err)

      }
    })

    }
    
  }


  resetPassword:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),

    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6}$/)])
  })

  step3():void{

    if (this.resetPassword.valid) {
      this.isLoading=true
      this._AuthService.setResetPass(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res)
     
     localStorage.setItem('userToken',res.token);
this._AuthService.saveUserData()
     this._Router.navigate(['/home'])

      },

      error:(err)=>{
        console.log(err)

      }
    })
    }
    
  }



}
