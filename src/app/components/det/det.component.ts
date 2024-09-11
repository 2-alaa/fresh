import { TranslateModule } from '@ngx-translate/core';
import { CartService } from './../../core/services/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-det',
  standalone: true,
  imports: [CarouselModule,TranslateModule],
  templateUrl: './det.component.html',
  styleUrl: './det.component.scss'
})
export class DetComponent implements OnInit {

  private readonly _ActivatedRoute =inject(ActivatedRoute);
  private readonly _ProductService =inject(ProductService);
  private readonly _CartService =inject(CartService);
  private readonly _ToastrService = inject(ToastrService)



  detalisProduct:Iproduct |null=null 

  produtList:Iproduct={} as Iproduct;
   detalis:Iproduct[]=[];



  customOptionsDet: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
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
      this._ActivatedRoute.paramMap.subscribe({
        next:(p)=>{
          
          let idProduct = (p.get('id'));



          this._ProductService.getSpecificproducts(idProduct).subscribe({
            next:(res)=>{
              console.log(res.data)
              this.detalisProduct = res.data
            },
            error:(err)=>{
              console.log(err)
            }
          })


  




        }
      })
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

}
