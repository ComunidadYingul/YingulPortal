import { Component, OnInit, Input } from '@angular/core';
import { ItemsCategoryService } from '../../../service/items-category.service'
import { CategoryService } from '../../../service/category.service';
import { Category } from '../../../model/category';
import { ListCategoryService } from '../../../service/list-category.service';
import { SellService } from '../../../service/sell.service';
import { Item } from '../../../model/item';
import { ItemService } from '../../../service/item.service';

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
  provinceCard:boolean=false;
  MediaPrice:number=0;
  priceTotal:number=0;
  minPrice:number=0;
  maxPrice:number=0;
  precioDesde:number;
  precioHasta:number;
  constructor(private itemService: ItemService, private categoryService: CategoryService, private categoryService1: ListCategoryService,private sellService:SellService) { 
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
    this.sellService.getProvinces().subscribe(
			res => {
            this.provinceList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.provinceListFive= JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.provinceListFive=this.provinceListFive.splice(0,5);
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
  popupCategory(){
    this.popup=false;
  }
  popupHide(){
    this.popup=true;
    this.popup3=true;
    this.popup4=true;
  }
  popupProvince(){
    this.popup3=false;
  }
  popupCity(){
    this.popup4=false;
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
}
