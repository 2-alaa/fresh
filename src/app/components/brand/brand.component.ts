import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrand } from '../../core/interfaces/ibrand';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent implements OnInit {


  private readonly _BrandsService=inject(BrandsService)
  brandList:Ibrand[]=[]

ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{

console.log(res.data);
this.brandList = res.data;
      },

    
    })
}

}
