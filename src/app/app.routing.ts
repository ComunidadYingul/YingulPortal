import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { SingupComponent } from './component/singup/singup.component';
import { SellComponent } from './component/sell/sell.component';
import { IndexComponent } from './component/index/index.component';
import { ItemDetailComponent } from './component/item-detail/item-detail.component';
import { ItemsCategoryComponent } from './component/items-category/items-category.component';
import { QueryComponent } from './component/query/query.component';
import { BuyComponent } from './component/buy/buy.component';
import { ServiceComponent } from './component/service/service.component';
import { PropertyComponent } from './component/property/property.component';
import { MotorizedComponent } from './component/motorized/motorized.component';
import { SearchMotorizedComponent } from './component/search-motorized/search-motorized.component';
import { SearchPropertyComponent } from './component/search-property/search-property.component';
import { EditItemComponent } from './component/edit-item/edit-item.component';
import { CreateStoreComponent } from './component/create-store/create-store.component';
import { AllStoresComponent } from './component/all-stores/all-stores.component';
import { StoreComponent } from './component/store/store.component'; 
import { UserFrontComponent } from './component/user-front/user-front.component';
import { FavoritesComponent } from './component/user-front/favorites/favorites.component';
import { UserProfileComponent } from './component/user-front/user-profile/user-profile.component';
import { ConfirmwsComponent } from './component/confirmws/confirmws.component';
import { ConfirmwosComponent } from './component/confirmwos/confirmwos.component';
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
  },
  {
    path: 'buy/:itemId/:quantity',
    component: BuyComponent
  },
  {
    path: 'service',
    component: ServiceComponent
  },
  {
    path: 'property',
    component: PropertyComponent
  },
  {
    path: 'motorized',
    component: MotorizedComponent
  },
  {
    path: 'searchMotorized/:categoryId/:minPrice/:maxPrice/:minYear/:maxYear',
    component: SearchMotorizedComponent
  },
  {
    path: 'searchProperty/:categoryId/:cityId',
    component: SearchPropertyComponent
  },
  {

    path: 'editItem/:itemId',
    component: EditItemComponent
  },
  {
    path: 'createStore',
    component: CreateStoreComponent
  },
  {
    path: 'allStores',
    component: AllStoresComponent
  },
  {
    path: 'userFront',
    component: UserFrontComponent
  },
  {
    path: 'userProfile',
    component: UserProfileComponent
  },
  {
    path: 'favorites',
    component: FavoritesComponent
  },
  {
    path: 'confirmws/:confirmId',
    component: ConfirmwsComponent
  },
  {
    path: 'confirmwos/:confirmId',
    component: ConfirmwosComponent
  },
  {
    path: ':nameStore',
    component: StoreComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);