import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../service/item.service'
import { SellService } from '../../service/sell.service';
import { Item } from '../../model/item';
import { Category } from '../../model/category';
import { ListCategoryService } from '../../service/list-category.service';

@Component({
  selector: 'app-search-property',
  templateUrl: './search-property.component.html',
  styleUrls: ['./search-property.component.css']
})
export class SearchPropertyComponent implements OnInit {
  itemList: Item[]=[];
  itemListTemp: Item[]=[];

  categoryId:number;
  cityId:number;
  provinceList: Object[];
  provinceListFive:Object[];
  popup:boolean=true;
  popup2:boolean=true;
  popup3:boolean=true;
  provinceCard:boolean=false;
  cityCard:boolean=true;
  cityList: Object[];
  cityListFive:Object[];
  precioDesde:number;
  precioHasta:number;
  subCategoryList: Category[];
  subCategoryListTemp:Category[];
  tensubCategoryList: Category[];
  constructor(private route:ActivatedRoute,private itemService: ItemService,private sellService:SellService,private categoryService: ListCategoryService) { 
    this.categoryId =route.snapshot.params['categoryId'];
    this.cityId =route.snapshot.params['cityId'];
    this.getItems();
  }

  ngOnInit() {
    this.getItems();
    this.sellService.getProvinces().subscribe(
			res => {
            this.provinceList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.provinceListFive= JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.provinceListFive=this.provinceListFive.splice(0,5);
      		},
      		error => console.log(error)
    );
  }
  getItems() {
    this.itemService.searchProperty(this.categoryId, this.cityId).subscribe(
			res => {
            this.itemList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            console.log(JSON.stringify(this.itemList));
      		},
      		error => console.log(error)
    );
    this.subCategoryList=[];
    if(this.categoryId!=0){
      this.categoryService.getSubCategories(this.categoryId.toString()).subscribe(
        res => {
              this.subCategoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
              this.subCategoryListTemp= JSON.parse(JSON.parse(JSON.stringify(res))._body);
              if(this.subCategoryList.length>5){this.tensubCategoryList=this.subCategoryList.splice(0,5);}
              else{this.tensubCategoryList=this.subCategoryList;}
              if(JSON.stringify(this.subCategoryList)=="[]"){this.tensubCategoryList=null;}
            },
            error => console.log(error)
      );
    }else{
      this.categoryService.getCategories("Property/0").subscribe(
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
  }
  popupProvince(){
    this.popup=false;
  }
  popupCity(){
    this.popup2=false;
  }
  popupHide(){
    this.popup=true;
    this.popup2=true;
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
