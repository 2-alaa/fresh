import { Routes } from '@angular/router';
import { LayoutAuthComponent } from './layouts/layout-auth/layout-auth.component';
import { LayoutBlankComponent } from './layouts/layout-blank/layout-blank.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutAuthComponent,
    canActivate:[logedGuard],

    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'forgot',
        loadComponent: () => import('./components/forgetpassword/forgetpassword.component').then(m => m.ForgetpasswordComponent)
      }
    ]
  },
  {
    path: '',
    component: LayoutBlankComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'product',
        loadComponent: () => import('./components/product/product.component').then(m => m.ProductComponent)
      },
      {
        path: 'brand',
        loadComponent: () => import('./components/brand/brand.component').then(m => m.BrandComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('./components/categories/categories.component').then(m => m.CategoriesComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent)
      },
      {
        path: 'det/:id',
        loadComponent: () => import('./components/det/det.component').then(m => m.DetComponent)
      },
      {
        path: 'categoriesdet/:id',
        loadComponent: () => import('./components/categoriesdet/categoriesdet.component').then(m => m.CategoriesdetComponent)
      },
      {
        path: 'allorders',
        loadComponent: () => import('./components/allorders/allorders.component').then(m => m.AllordersComponent)
      },
      {
        path: 'wishy',
        loadComponent: ()=> import('./components/wishy/wishy.component').then(m =>m.WishyComponent)
      },
      {
        path: 'orders/:id',
        loadComponent: () => import('./components/orders/orders.component').then(m => m.OrdersComponent)
      }
     
      



    ]
  },
  {
    path: '**',
    loadComponent: () => import('./components/notfound/notfound.component').then(m => m.NotfoundComponent)
  }
];

