import { CartService } from './../../core/services/cart.service';
import { MytranslateService } from './../../core/services/mytranslate.service';
import { AuthService } from './../../core/services/auth.service';
import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
  readonly _AuthService = inject(AuthService)
  private readonly _MytranslateService = inject(MytranslateService)
 readonly _TranslateService = inject(TranslateService)
 readonly _CartService = inject(CartService)

navCartCount:Signal<number> = computed( ()=>  this._CartService.cartNumber());


ngOnInit(): void {

this._CartService.getProductsCart().subscribe({
   next:(res)=>{
      console.log('cart items',res)

      this._CartService.cartNumber.set(res.numOfCartItems)
   }
})




}

   change(lang:string):void{

this._MytranslateService.changeLang(lang)
   }

}











