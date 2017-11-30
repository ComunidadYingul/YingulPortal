import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing'

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component'
import { SingupComponent } from './component/singup/singup.component';

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
import { QueryServiceService } from './service/query-service.service';
import { ItemDetailService } from './service/item-detail.service';
import { IndexService } from './service/index.service';
import { IndexComponent } from './component/index/index.component';
import { CategoryListComponent } from './component/index/category-list/category-list.component';
import { ItemListComponent } from './component/index/item-list/item-list.component';
import { BannerComponent } from './component/index/banner/banner.component';
import { ItemComponent } from './component/index/item/item.component';
import { ItemDetailComponent } from './component/item-detail/item-detail.component';
import { ItemsCategoryComponent } from './component/items-category/items-category.component';
import { IcdetailComponent } from './component/items-category/icdetail/icdetail.component';
import { ItemsCategoryService } from './service/items-category.service';
import { IdetailComponent } from './component/item-detail/idetail/idetail.component';
import { QueryComponent } from './component/query/query.component';

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
    ItemListComponent,
    BannerComponent,
    ItemComponent,
    ItemDetailComponent,
    ItemsCategoryComponent,
    IcdetailComponent,
    IdetailComponent,
    QueryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    LoginService,
    SingupService,
    ListCategoryService,
    SellService,
    IndexService,
    ItemDetailService,
    ItemsCategoryService,
    QueryServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
