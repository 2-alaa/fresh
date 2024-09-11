import { CurrencyPipe } from '@angular/common';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from './../../core/services/product.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe,RouterLink,TranslateModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  private readonly _ProductService =inject(ProductService)
  private readonly _CartService =inject(CartService)


  produtList:Iproduct[]=[];
  ngOnInit(): void {
      this._ProductService.getAllProducts().subscribe({
        next:(res)=>{
          console.log(res)
          this.produtList = res.data
        
        },
        error:(err)=>{
          console.log(err)
        
        }
      })
  }



  addCart(id:string):void{

    this._CartService.addToCart(id).subscribe({
next:(res)=>{
  console.log(res)

},
error:(err)=>{
  console.log(err)

}

    })
  }

}
