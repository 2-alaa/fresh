import { CurrencyPipe } from '@angular/common';
import { Icart } from '../../core/interfaces/icart';
import { CartService } from './../../core/services/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink,TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly _CartService =inject(CartService)
  private readonly _ToastrService =inject(ToastrService)

  cartDetalis:Icart ={}as Icart

  ngOnInit(): void {
      this._CartService.getProductsCart().subscribe({
        next:(res)=>{
         console.log(res.data)
          this.cartDetalis = res.data; 

        },

        error:(err)=>{
          console.log(err)
 
         },
      })




  }

  removeItem(id:string):void{


    this._CartService.deleteSpecificCart(id).subscribe({
      next:(res)=>{
      console.log(res)
      this.cartDetalis = res.data
      this._CartService.cartNumber.set(res.numOfCartItems)

      },

      error:(err)=>{
        console.log(err)
              }
    })
  }


  updataCount(id:string,count:number):void{
    if (count>0) {
    this._CartService.UpdateCartQuantity(id,count).subscribe({
      next:(res)=>{
        console.log(res)
        this.cartDetalis =res.data
     
        },
  
        error:(err)=>{
          console.log(err)
                }
      
    })  
    }
   

    

  }


  clear():void{
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res)
        if (res.message =='success') {
          this.cartDetalis = {} as Icart;
          this._CartService.cartNumber.set(0);

          
        }
        },
  
        error:(err)=>{
          console.log(err)
        }
        })
  }

}