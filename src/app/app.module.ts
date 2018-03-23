import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing'

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component'
import { SingupComponent } from './component/singup/singup.component';
import { CategoryService} from './service/category.service'
import { LoginService } from './service/login.service';
import { SingupService } from './service/singup.service';
import { ListCategoryService } from './service/list-category.service';
import { SellComponent } from './component/sell/sell.component';
import { TypeItemComponent } from './component/sell/type-item/type-item.component';
import { ListCategoryComponent } from './component/sell/list-category/list-category.component';
import { DetailComponent } from './component/sell/detail/detail.component';
import { PriceComponent } from './component/sell/price/price.component';
import { TypeComponent } from './component/sell/type/type.component';
import { SellService } from './service/sell.service';
import { BuyService } from './service/buy.service';
import { QueryServiceService } from './service/query-service.service';
import { ItemDetailService } from './service/item-detail.service';
import { IndexService } from './service/index.service';
import { IndexComponent } from './component/index/index.component';
import { CategoryListComponent } from './component/index/category-list/category-list.component';
import { BannerComponent } from './component/index/banner/banner.component';
import { ItemComponent } from './component/index/item/item.component';
import { ItemDetailComponent } from './component/item-detail/item-detail.component';
import { ItemsCategoryComponent } from './component/items-category/items-category.component';
import { IcdetailComponent } from './component/items-category/icdetail/icdetail.component';
import { ItemsCategoryService } from './service/items-category.service';
import { IdetailComponent } from './component/item-detail/idetail/idetail.component';
import { BuyComponent } from './component/buy/buy.component';
import { ShippingComponent } from './component/buy/shipping/shipping.component';
import { PaymentComponent } from './component/buy/payment/payment.component';
import { ConfirmComponent } from './component/buy/confirm/confirm.component';
import { ServiceComponent } from './component/service/service.component';
import { MotorizedComponent } from './component/motorized/motorized.component';
import { PropertyComponent } from './component/property/property.component';
import { ItemService } from './service/item.service';
import { SearchMotorizedComponent } from './component/search-motorized/search-motorized.component';
import { UbicationService } from './service/ubication.service';
import { SearchPropertyComponent } from './component/search-property/search-property.component';
import { EditItemComponent } from './component/edit-item/edit-item.component';
import { PriceEditComponent } from './component/edit-item/price-edit/price-edit.component';
import { CreateStoreComponent } from './component/create-store/create-store.component';
import { StoresComponent } from './component/index/stores/stores.component';
import { AllStoresComponent } from './component/all-stores/all-stores.component';
import { AboutBusinessComponent } from './component/create-store/about-business/about-business.component';
import { CreateFrontComponent } from './component/create-store/create-front/create-front.component';
import { StoreService } from './service/store.service';
import { StoreComponent } from './component/store/store.component';
import { UserFrontComponent } from './component/user-front/user-front.component';
import { FavoritesComponent } from './component/user-front/favorites/favorites.component';
import { FavoriteService } from './service/favorite.service';
import { UserProfileComponent } from './component/user-front/user-profile/user-profile.component';
import { UserService } from './service/user.service';
import { FooterComponent } from './component/index/footer/footer.component';
import { ConfirmwsComponent } from './component/confirmws/confirmws.component';
import { ConfirmwosComponent } from './component/confirmwos/confirmwos.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { ConfirmService } from './service/confirm.service';
import { FrontYingulPayComponent } from './component/front-yingul-pay/front-yingul-pay.component';
import { BalanceComponent } from './component/front-yingul-pay/balance/balance.component';
import { WithdrawComponent } from './component/front-yingul-pay/withdraw/withdraw.component';
import { AccountService } from './service/account.service';
import { BankService } from './service/bank.service';
import { WireTransferService } from './service/wire-transfer.service';
import { AdminComponent } from './component/admin/admin.component';
import { WireTransferComponent } from './component/admin/wire-transfer/wire-transfer.component';
import { AdminService } from './service/admin.service';

import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { OverComponent } from './component/over/over.component';
import { SalesComponent } from './component/user-front/sales/sales.component';
import { PurchasesComponent } from './component/user-front/purchases/purchases.component';
import { ClaimsComponent } from './component/user-front/claims/claims.component';
import { ClaimService } from './service/claim.service';
import { HelpComponent } from './component/help/help.component';
import { ProtectedPurchaseComponent } from './component/help/protected-purchase/protected-purchase.component';
import { AgreementComponent } from './component/agreement/agreement.component';
import { ListPublicationsComponent } from './component/list-publications/list-publications.component';
import { ListItemsComponent } from './component/list-publications/list-items/list-items.component';
import { SlickModule } from 'ngx-slick';
import { ChatComponent } from './component/user-front/chat/chat.component';
import { QuerySalesComponent } from './component/user-front/sales/query-sales/query-sales.component';
import { QueryPurchasesComponent } from './component/user-front/purchases/query-purchases/query-purchases.component';
import { AboutComponent } from './component/about/about.component';
import { ContactUsComponent } from './component/about/contact-us/contact-us.component';
import { AboutService } from './service/about.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SingupComponent,
    SellComponent,
    TypeItemComponent,
    ListCategoryComponent,
    DetailComponent,
    PriceComponent,
    TypeComponent,
    IndexComponent,
    CategoryListComponent,
    BannerComponent,
    ItemComponent,
    ItemDetailComponent,
    ItemsCategoryComponent,
    IcdetailComponent,
    IdetailComponent,
    BuyComponent,
    ShippingComponent,
    PaymentComponent,
    ConfirmComponent,
    ServiceComponent,
    MotorizedComponent,
    PropertyComponent,
    SearchMotorizedComponent,
    SearchPropertyComponent,
    EditItemComponent,
    PriceEditComponent,
    CreateStoreComponent,
    StoresComponent,
    AllStoresComponent,
    AboutBusinessComponent,
    CreateFrontComponent,
    StoreComponent,
    UserFrontComponent,
    FavoritesComponent,
    UserProfileComponent,
    FooterComponent,
    ConfirmwsComponent,
    ConfirmwosComponent,
    FrontYingulPayComponent,
    BalanceComponent,
    WithdrawComponent,
    AdminComponent,
    WireTransferComponent,

    OverComponent,
    SalesComponent,
    PurchasesComponent,
    ClaimsComponent,
    HelpComponent,
    ProtectedPurchaseComponent,
    AgreementComponent,
    ListPublicationsComponent,
    ListItemsComponent,
    ChatComponent,
    QuerySalesComponent,
    QueryPurchasesComponent,
    AboutComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    RecaptchaModule.forRoot(),
    SlickModule.forRoot(),

    Ng2CarouselamosModule
  ],
  providers: [
    LoginService,
    SingupService,
    ListCategoryService,
    SellService,
    IndexService,
    ItemDetailService,
    ItemsCategoryService,
    QueryServiceService,
    BuyService,
    CategoryService,
    ItemService,
    UbicationService,
    StoreService,
    FavoriteService,
    UserService,
    ConfirmService,
    AccountService,
    BankService,
    WireTransferService,
    AdminService,
    ClaimService,
    AboutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
