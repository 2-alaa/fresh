import { Iproduct } from './../../core/interfaces/iproduct';
import { WishlistService } from './../../core/services/wishlist.service';
import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, RendererFactory2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wishy',
  standalone: true,
  imports: [CurrencyPipe,TranslateModule],
  templateUrl: './wishy.component.html',
  styleUrl: './wishy.component.scss'
})

export class WishyComponent implements OnInit {

  private readonly _WishlistService = inject(WishlistService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _Renderer2 = inject(RendererFactory2).createRenderer(null,null)
  wishListData: string = "";
  favList:Iproduct[] = [];

  wishList:Iproduct[]= [];
  addProductSub!:Subscription;
  removeItemsub!:Subscription;


  ngOnInit(): void {
    this._WishlistService.getwish().subscribe({
      next:(res)=>{
        console.log(res);
        this.wishList = res.data       
       }
    })
}

  addToCart(id:string){
    this.addProductSub = this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success(res.message , 'FreshCart', {progressBar:true} );
         this._CartService.cartNumber = res.numOfCartItems
         console.log(this._CartService.cartNumber);
         

    },
      
     })
   }  
   


   removeItem(id:string ):void{
    this.removeItemsub =  this._WishlistService.removeItemFromWishlist(id).subscribe({
       next:(res)=>{
           console.log(res);
           this.wishListData = res.data
           
           this._ToastrService.error('item is removed' , 'FreshCart' , {progressBar:true})
           this._WishlistService.wishListNumber.next(res.data.length);

           const newProdData = this.wishList.filter((item: any) => this.wishListData.includes(item._id));
   
           this.wishList = newProdData;
           
       },
       error:(err)=>{
         console.log(err);
       }
     })
  }
 


}