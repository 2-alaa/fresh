import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from './../../core/interfaces/icategories';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoriesdet',
  standalone: true,
  imports: [],
  templateUrl: './categoriesdet.component.html',
  styleUrl: './categoriesdet.component.scss'
})
export class CategoriesdetComponent implements OnInit {
  private readonly _ActivatedRoute =inject(ActivatedRoute);

  private readonly _CategoriesService =inject(CategoriesService);

  detalisCategories:Icategories |null= null


  detCategories:Icategories[]=[]


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        
        let idCategories = (p.get('id'));

        this._CategoriesService.getSpecificCategories(idCategories).subscribe({
          next:(res)=>{
            console.log(res.data)
            this.detalisCategories = res.data
          },
          error:(err)=>{
            console.log(err)
          }

        })



       







      }
    })
}
}
