import { SearchPipe } from './../../core/pipes/search.pipe';
import { ProductService } from './../../core/services/product.service';
import { Component, inject, OnInit } from '@angular/core';
import { NavBlankComponent } from "../nav-blank/nav-blank.component";
import { LayoutBlankComponent } from "../../layouts/layout-blank/layout-blank.component";
import { Iproduct } from '../../core/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBlankComponent, LayoutBlankComponent,CarouselModule,RouterLink,CurrencyPipe,SearchPipe,FormsModule,TranslateModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})



export class HomeComponent implements OnInit {

  private readonly _ProductService = inject(ProductService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _NgxSpinnerService  = inject(NgxSpinnerService )
  private readonly _WishlistService  = inject(WishlistService )


 text:string = "";
 hamada = new Date();

 wishListData: string[] = [];
  produtList:Iproduct[]=[];

  
  categoriesList:Icategories[]=[]

  
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,  
    rtl:true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }



  customOptionscategories: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    rtl:true,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['prev', 'next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  ngOnInit(): void {

    this._ProductService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res)

        this.produtList =res.data;

     
      },
      error:(err)=>{
        console.log(err)
      }

    })



    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.categoriesList =res.data;
      
      },
      
      error:(err)=>{
        console.log(err)
      
      }
      
      
          })



          this._WishlistService.getwish().subscribe({
            next: (response) => {
              const newData = response.data.map((item: any) => item._id)//returns array but diff format
              this.wishListData = newData;
              console.log(response, 'd');
            }
          });
        }


  addCart(id:string):void{

    this._CartService.addToCart(id).subscribe({
next:(res)=>{
  console.log(res)
  this._ToastrService.success(res.message ,'FreshCart')
this._CartService.cartNumber.set( res.numOfCartItems )
},
error:(err)=>{
  console.log(err)

}
    })
  }



  addToCart(id:string):void{

    this._WishlistService.addwish(id).subscribe({
next:(res)=>{
  console.log(res)
  this._ToastrService.success(res.message ,'FreshCart')
this._CartService.cartNumber.set( res.numOfCartItems )
},
error:(err)=>{
  console.log(err)

}
    })
  }

  
  addFav(prodId: string): void {
    this._WishlistService.addwish(prodId).subscribe({
      next: (response) => {
     
        this._ToastrService.success(response.message , 'FreshCart' , {progressBar:true});
        this.wishListData = response.data;
        this._WishlistService.wishListNumber.next(response.data.length)
      }
    })
  }

  removeFav(prodId: string ): void {
    this._WishlistService.removewish(prodId).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this.wishListData = response.data;
        this._WishlistService.wishListNumber.next(response.data.length)
      }
    })
  }

}
