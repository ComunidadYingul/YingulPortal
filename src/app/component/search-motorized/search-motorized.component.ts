import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../service/item.service';
import { Category } from '../../model/category';
import { ListCategoryService } from '../../service/list-category.service'
import { FindMotorized } from '../../model/find-motorized';
import { SellService } from '../../service/sell.service';
import { Item } from '../../model/item';
import { Country } from '../../model/country';

@Component({
  selector: 'app-search-motorized',
  templateUrl: './search-motorized.component.html',
  styleUrls: ['./search-motorized.component.css']
})
export class SearchMotorizedComponent implements OnInit {
  categoryId:number;
  anios = [];
  aniosTemp =[];
  fechaActual = new Date();
  price =[];
  anio = this.fechaActual.getFullYear();
  minPrice:number;
  maxPrice:number;
  minYear:number;
  maxYear:number;
  itemList: Item[]=[];
  itemListTemp: Item[]=[];
  subCategoryList: Category[];
  subCategoryListTemp:Category[];
  tensubCategoryList: Category[];
  popup:boolean=true;
  popup2:boolean=true;
  popup3:boolean=true;
  popup4:boolean=true;
  popup5:boolean=true;
  anioDesde="0";
  anioHasta="0";
  precioDesde;
  precioHasta;
  findMotorized:FindMotorized=new FindMotorized();
  provinceList: Object[];
  provinceListFive:Object[];
  cityCard:boolean=true;
  cityList: Object[];
  cityListFive:Object[];
  provinceCard:boolean=true;
  countryList:Country[];
  countryListFive:Country[];
  countryCard:boolean=false;
  today = new Date().toJSON().split('T')[0];
  dateDesde:string;
  dateHasta:string;
  constructor(private route:ActivatedRoute,private itemService: ItemService,private categoryService: ListCategoryService,private sellService:SellService) { 
    this.categoryId =route.snapshot.params['categoryId'];
    this.minPrice = route.snapshot.params['minPrice'];
    this.maxPrice = route.snapshot.params['maxPrice'];
    this.minYear = route.snapshot.params['minYear'];
    this.maxYear = route.snapshot.params['maxYear'];
    this.getItems();
  }
  ngOnInit() {
    this.getItems();
    this.sellService.getCountries().subscribe(
			res => {
            this.countryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.countryListFive= JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.countryListFive=this.countryListFive.splice(0,5);
      		},
      		error => console.log(error)
    );
  }
  getItems() {
    this.itemService.searchMotorized(this.categoryId, this.minPrice, this.maxPrice, this.minYear, this.maxYear).subscribe(
			res => {
            this.itemList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
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
      this.categoryService.getCategories("Motorized/0").subscribe(
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
    this.itemService.getFindMotorized(this.categoryId.toString()).subscribe(
      res => {
            this.findMotorized = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.setParameters();
          },
          error => console.log(error)
    );
  }
  popupCategory(){
    this.popup=false;
  }
  popupAnio(){
    this.popup2=false;
  }
  popupHide(){
    this.popup=true;
    this.popup2=true;
    this.popup3=true;
    this.popup4=true;
    this.popup5=true;
  }
  setParameters(){
    this.anios=[];
    this.aniosTemp=[];
    //anios
    for(let i = this.anio+1 ;i>=this.findMotorized.minYear;i--){
      this.anios.push(i);
      this.aniosTemp.push(i);
    }
    this.anios=this.anios.splice(0,5);
    this.price=[];
    //precios
    for(let j = this.findMotorized.minPrice ; j<= this.findMotorized.maxPrice ; j=j+this.findMotorized.rankPrice){
      this.price.push(j);
    }
  }
  popupCountry(){
    this.popup5=false;
  }
  popupProvince(){
    this.popup3=false;
  }
  popupCity(){
    this.popup4=false;
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
}
