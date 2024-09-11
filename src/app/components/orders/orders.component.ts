import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule,TranslateModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

private readonly _ActivatedRoute =inject(ActivatedRoute)
private readonly _OrdersService =inject(OrdersService)


 cartId:string|null =""; 
  orders:FormGroup = new FormGroup({

    detalis:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null),


  })

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
this.cartId = params.get('id')
console.log(this.cartId) 

          },
    
          
      })
  }

  ordersSubmit():void{
    console.log(this.orders.value);
    this._OrdersService.checkOut(this.cartId,this.orders.value).subscribe({
      next:(res)=>{
        console.log(res)
        if (res.status == 'success') {

          window.open(          res.session.url ,'_self'        )
          
        }
                  },
                  error:(err)=>{
                    console.log(err)
                              },
    })
  }



}
