import { ModuleWithProviders, Component }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { SingupComponent } from './component/singup/singup.component';
import { SellComponent } from './component/sell/sell.component';
import { IndexComponent } from './component/index/index.component';
import { ItemDetailComponent } from './component/item-detail/item-detail.component';
import { ItemsCategoryComponent } from './component/items-category/items-category.component';
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
import { FrontYingulPayComponent } from './component/front-yingul-pay/front-yingul-pay.component';
import { BalanceComponent } from './component/front-yingul-pay/balance/balance.component';
import { WithdrawComponent } from './component/front-yingul-pay/withdraw/withdraw.component';
import { AdminComponent } from './component/admin/admin.component';
import { WireTransferComponent } from './component/admin/wire-transfer/wire-transfer.component';
import { OverComponent } from './component/over/over.component';
import { SalesComponent } from './component/user-front/sales/sales.component';
import { PurchasesComponent } from './component/user-front/purchases/purchases.component';
import { ClaimsComponent } from './component/user-front/claims/claims.component';
import { ProtectedPurchaseComponent } from './component/help/protected-purchase/protected-purchase.component';
import { AgreementComponent } from './component/agreement/agreement.component';
import { ListPublicationsComponent } from './component/list-publications/list-publications.component';
import { ListItemsComponent } from './component/list-publications/list-items/list-items.component';
import { ChatComponent } from './component/user-front/chat/chat.component';
import { QuerySalesComponent } from './component/user-front/sales/query-sales/query-sales.component';
import { QueryPurchasesComponent } from './component/user-front/purchases/query-purchases/query-purchases.component';
import { ContactUsComponent } from './component/about/contact-us/contact-us.component';
import { ForgotPasswordComponent } from './component/login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/login/reset-password/reset-password.component';
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
  	path: 'login/forgotPassword',
  	component: ForgotPasswordComponent
  },
  {
  	path: 'resetPassword/:resetPasswordId',
  	component: ResetPasswordComponent
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
    path: 'userFront/userProfile',
    component: UserProfileComponent
  },
  {
    path: 'userFront/favorites',
    component: FavoritesComponent
  },
  {
    path: 'userFront/sales',
    component: SalesComponent
  },
  {
    path: 'userFront/sales/query',
    component: QuerySalesComponent
  },
  {
    path: 'userFront/purchases',
    component: PurchasesComponent
  },
  {
    path: 'userFront/purchases/query',
    component: QueryPurchasesComponent
  },
  {
    path: 'userFront/claims',
    component: ClaimsComponent
  },
  {
    path: 'userFront/chat',
    component: ChatComponent
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
    path: 'frontYingulPay',
    component: FrontYingulPayComponent
  },
  {
    path: 'frontYingulPay/userBalance',
    component: BalanceComponent
  },
  {
    path: 'frontYingulPay/withdraw',
    component: WithdrawComponent
  },
  {
    path: 'yng-admin',
    component: AdminComponent
  },
  {
    path: 'yng-admin/wireTransfer',
    component: WireTransferComponent
  },
  {
    path: 'over',
    component: OverComponent
  },
  {
    path: 'help/protectedPurchase',
    component: ProtectedPurchaseComponent
  },
  {
    path: 'about/contactUs',
    component: ContactUsComponent
  },
  {
    path: 'agreement/:claimId',
    component: AgreementComponent
  },
  {
    path: ':nameStore',
    component: StoreComponent
  },
  {
    path: 'listPublications/:id',
    component: ListPublicationsComponent
  },
  {
    path:'ListItemsComponent',
    component: ListItemsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);