import { environment } from './../environments/environment';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  

private readonly _HttpClient =inject(HttpClient)
myHeaders:any = {token:localStorage.getItem('userToken')}

cartNumber:WritableSignal<number> =signal(0)



addToCart(id:string):Observable<any>{
return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
{
  "productId":id
}
)

}


getProductsCart():Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`
 
 )

}


deleteSpecificCart(id:string):Observable<any>{
return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`
 
)
} 



UpdateCartQuantity(id:string ,newCount:number):Observable<any>{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
 
    {
       "count": newCount
    }
   
  )
}

clearCart():Observable<any>{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`
  
  )
}


}
