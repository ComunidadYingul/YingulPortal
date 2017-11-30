import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { SingupComponent } from './component/singup/singup.component';
import { SellComponent } from './component/sell/sell.component';
import { IndexComponent } from './component/index/index.component';
import { ItemDetailComponent } from './component/item-detail/item-detail.component';
import { ItemsCategoryComponent } from './component/items-category/items-category.component';
import { QueryComponent } from './component/query/query.component';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
  	path: 'login',
  	component: LoginComponent
  },
  {
  	path: 'signup',
  	component: SingupComponent
  },
  {
  	path: 'sell',
  	component: SellComponent
  },
  {
  	path: 'index',
  	component: IndexComponent
  },
  {
  	path: 'query',
  	component: QueryComponent
  },
  {
  	path: 'itemDetail/:itemId',
  	component: ItemDetailComponent
  },
  {
    path: 'itemsCategory/:categoryId',
    component: ItemsCategoryComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);