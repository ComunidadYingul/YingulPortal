import { Component, OnInit, Input } from '@angular/core';
import { ItemsCategoryService } from '../../../service/items-category.service'
import { CategoryService } from '../../../service/category.service';
import { Category } from '../../../model/category';
import { ListCategoryService } from '../../../service/list-category.service';
import { SellService } from '../../../service/sell.service';
import { Item } from '../../../model/item';
import { ItemService } from '../../../service/item.service';
import { ItemDetailService } from '../../../service/item-detail.service';
import { Product } from '../../../model/product';
import { Motorized } from '../../../model/Motorized';

@Component({
  selector: 'app-icdetail',
  templateUrl: './icdetail.component.html',
  styleUrls: ['./icdetail.component.css']
})
export class IcdetailComponent implements OnInit {
  @Input('categoryId') categoryId:number;
  itemList: Item[]=[];
  itemListTemp: Item[]=[];
  category:Category=new Category;
  subCategoryList: Category[];
  subCategoryListTemp:Category[];
  tensubCategoryList: Category[];
  popup:boolean=true;
  popup3:boolean=true;
  popup4:boolean=true;
  provinceList: Object[];
  provinceListFive:Object[];
  cityCard:boolean=true;
  cityList: Object[];
  cityListFive:Object[];
  countryCard:boolean=false;
  countryList: Object[];
  countryListFive:Object[];
  provinceCard:boolean=true;
  MediaPrice:number=0;
  priceTotal:number=0;
  minPrice:number=0;
  maxPrice:number=0;
  precioDesde:number;
  precioHasta:number;
  popup5:boolean=true;
  popup6:boolean=true;
  popup7:boolean=true;
  popup8:boolean=true;
  popup9:boolean=true;
  today = new Date().toJSON().split('T')[0];
  dateDesde:string;
  dateHasta:string;
  typeItemCategory:string;
  productList:Product[];
  motorizedList:Motorized[];
  conditionCard:boolean=false;
  constructor(private itemService: ItemService, private categoryService: CategoryService, private categoryService1: ListCategoryService,private sellService:SellService, private itemDetailService :ItemDetailService) { 
  }

  ngOnInit() {
    this.getItemsByCategory();
    this.categoryService.getCategoryById(this.categoryId).subscribe(
			res => {
            this.category = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            console.log(JSON.stringify(this.category));
      		},
      		error => console.log(error)
    );
    this.categoryService.getTypeItemCategory(this.categoryId).subscribe(
      res => {
        this.typeItemCategory = JSON.parse(JSON.stringify(res))._body;
        switch (this.typeItemCategory){
          case "Product":
            this.getProductsByCategory();
          break;
          case "Motorized":

          break;
        }
      },
      error => console.log(error)
    );
    this.sellService.getCountries().subscribe(
			res => {
            this.countryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.countryListFive= JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.countryListFive=this.countryListFive.splice(0,5);
      		},
      		error => console.log(error)
    );
  }
  getItemsByCategory() {
    this.itemService.getItemsByCategory(this.categoryId).subscribe(
			res => {
            this.itemList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            console.log(JSON.stringify(this.itemList));
            for(var j=0; j<this.itemList.length; j++){
              this.priceTotal=this.priceTotal+this.itemList[j].price;
            }
            this.MediaPrice=this.priceTotal/this.itemList.length;
            this.minPrice=this.MediaPrice-(this.MediaPrice*0.4);
            this.maxPrice=this.MediaPrice+(this.MediaPrice*0.4);
      		},
      		error => console.log(error)
    );
    //
    this.subCategoryList=[];
    this.categoryService1.getSubCategories(this.categoryId.toString()).subscribe(
      res => {
            this.subCategoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.subCategoryListTemp= JSON.parse(JSON.parse(JSON.stringify(res))._body);
            if(this.subCategoryList.length>5){this.tensubCategoryList=this.subCategoryList.splice(0,5);}
            else{this.tensubCategoryList=this.subCategoryList;}
            if(JSON.stringify(this.subCategoryList)=="[]"){this.tensubCategoryList=null;}
          },
          error => console.log(error)
    );
  }
  getProductsByCategory(){
    this.itemService.getProductsByCategory(this.categoryId).subscribe(
			res => {
            this.productList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
  getMotorizedByCategory(){
    this.itemService.getMotorizedByCategory(this.categoryId).subscribe(
			res => {
            this.motorizedList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
  popupCategory(){
    this.popup=false;
    this.popup7=true;
    this.popup5=true;
  }
  popupHide(){
    this.popup=true;
    this.popup3=true;
    this.popup4=true;
    this.popup5=true;
    this.popup6=true;
    this.popup7=true;
    this.popup8=true;
    this.popup9=true;
  }
  popupCountry(){
    this.popup9=false;
  }
  popupProvince(){
    this.popup3=false;
    this.popup5=true;
    this.popup8=true;
  }
  popupCity(){
    this.popup4=false;
    this.cityCard=true;
  }
  findCountry(a:number){
    this.sellService.getProvinces(a).subscribe(
			res => {
            this.provinceList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.provinceListFive= JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.provinceListFive=this.provinceListFive.splice(0,5);
      		},
      		error => console.log(error)
    );
    this.itemListTemp=[];
    for (var i = 0; i < this.itemList.length; i++) {
      if(this.itemList[i].yng_Ubication.yng_Country.countryId==a){
        this.itemListTemp.push(this.itemList[i]);
      }
    }
    this.itemList=[];
    this.itemList=this.itemListTemp;
    this.popupHide();
    this.countryCard=true;
    this.provinceCard=false;
  }
  findProvince(a:number){
    this.sellService.getCities(a).subscribe(
			res => {
            this.cityList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.cityListFive= JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.cityListFive=this.cityListFive.splice(0,5);
      		},
      		error => console.log(error)
    );
    this.itemListTemp=[];
    for (var i = 0; i < this.itemList.length; i++) {
      if(this.itemList[i].yng_Ubication.yng_Province.provinceId==a){
        this.itemListTemp.push(this.itemList[i]);
      }
    }
    this.itemList=[];
    this.itemList=this.itemListTemp;
    this.popupHide();
    this.provinceCard=true;
    this.cityCard=false;
  }
  findCity(b:number){
    this.itemListTemp=[];
    for (var i = 0; i < this.itemList.length; i++) {
      if(this.itemList[i].yng_Ubication.yng_City.cityId==b){
        this.itemListTemp.push(this.itemList[i]);
      }
    }
    this.itemList=[];
    this.itemList=this.itemListTemp;
    this.popupHide();
    this.provinceCard=true;
    this.cityCard=true;
  }
  findPrice(precioDesde:number,precioHasta:number){
    this.itemListTemp=[];
    for (var i = 0; i < this.itemList.length; i++) {
      if(precioHasta==0){
        if(this.itemList[i].price>=precioDesde){
          this.itemListTemp.push(this.itemList[i]);
        }
      }else{
        if(this.itemList[i].price>=precioDesde && this.itemList[i].price<=precioHasta){
          this.itemListTemp.push(this.itemList[i]);
        }
      }
    }
    this.itemList=[];
    this.itemList=this.itemListTemp;
  }
  findPrice1(){
    if(!this.precioDesde){
      this.precioDesde=0;
    }
    if(!this.precioHasta){
      this.precioHasta=0;
    }
    this.findPrice(this.precioDesde,this.precioHasta);
  }
  filterHidden(){
    this.popup5=false;  
  }
  popupPrice(){
    this.popup6=false;
  }
  popupUbication(){
    this.popup8=false;
  }
  popupCategorys(){
    this.popup7=false;
  }
  findDate(){
    let dateDesde;
    let dateHasta;
    if(this.dateDesde==null){
      dateDesde=["2018","03","08"];
    }else{
      dateDesde=this.dateDesde.split("-");
    }
    if(this.dateHasta==null){
      dateHasta=this.today.split("-");
    }else{
      dateHasta=this.dateHasta.split("-");
    }
    
    this.itemListTemp=[];
    for (var i = 0; i < this.itemList.length; i++) {
      if(this.itemList[i].yearPublication>=+dateDesde[0]&&this.itemList[i].yearPublication<=+dateHasta[0]&&this.itemList[i].monthPublication>=+dateDesde[1]&&this.itemList[i].monthPublication<=+dateHasta[1]&&this.itemList[i].dayPublication>=+dateDesde[2]&&this.itemList[i].dayPublication<=+dateHasta[2]){
        this.itemListTemp.push(this.itemList[i]);
      }
    }
    this.itemList=[];
    this.itemList=this.itemListTemp;
  }
  findNew(){
    this.itemListTemp=[];
    if(this.typeItemCategory=="Product"){
      for (let i of this.itemList) {
        for(let p of this.productList){
          if(p.yng_Item.itemId==i.itemId){
            if(p.productCondition=="Nuevo"){
              this.itemListTemp.push(i);
            }
          }         
        }
      }
    }else{
      for (let i of this.itemList) {
        for(let m of this.motorizedList){
          if(m.yng_Item.itemId==i.itemId){
            if(m.motorizedKilometers==0){
              this.itemListTemp.push(i);
            }
          }         
        }
      }
    }
    this.itemList=[];
    this.itemList=this.itemListTemp;
    this.conditionCard=true;
  }
  findUsed(){
    this.itemListTemp=[];
    if(this.typeItemCategory=="Product"){
      for (let i of this.itemList) {
        for(let p of this.productList){
          if(p.yng_Item.itemId==i.itemId){
            if(p.productCondition=="Usado"){
              this.itemListTemp.push(i);
            }
          }         
        }
      }
    }else{
      for (let i of this.itemList) {
        for(let m of this.motorizedList){
          if(m.yng_Item.itemId==i.itemId){
            if(m.motorizedKilometers>0){
              this.itemListTemp.push(i);
            }
          }         
        }
      }
    }
    this.itemList=[];
    this.itemList=this.itemListTemp;
    this.conditionCard=true;
  }
  
}


