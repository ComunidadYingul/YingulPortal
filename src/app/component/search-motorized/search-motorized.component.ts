import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../service/item.service';
import { Category } from '../../model/category';
import { ListCategoryService } from '../../service/list-category.service'
import { FindMotorized } from '../../model/find-motorized';
import { SellService } from '../../service/sell.service';
import { Item } from '../../model/item';
import { Country } from '../../model/country';
import { Motorized } from '../../model/Motorized';
import { Network } from '../../model/Network';
import { user } from '../../model/user';
import { FavoriteService } from '../../service/favorite.service';

@Component({
  selector: 'app-search-motorized',
  templateUrl: './search-motorized.component.html',
  styleUrls: ['./search-motorized.component.css']
})
export class SearchMotorizedComponent implements OnInit {
  BUCKET_URL:string=Network.BUCKET_URL;
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
  popup6:boolean=true;
  popup7:boolean=true;
  popup9:boolean=true;
  popupFechaPubli:boolean=true;
  popupCond:boolean=true;
  popupFiltrar:boolean=true;
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
  conditionCard:boolean=false;
  User:user=new user();
  itemFavorites: Item[]=[];
  msg:string;
  constructor(private router : Router,private favoriteService: FavoriteService,private route:ActivatedRoute,private itemService: ItemService,private categoryService: ListCategoryService,private sellService:SellService) { 
    this.categoryId =route.snapshot.params['categoryId'];
    this.minPrice = route.snapshot.params['minPrice'];
    this.maxPrice = route.snapshot.params['maxPrice'];
    this.minYear = route.snapshot.params['minYear'];
    this.maxYear = route.snapshot.params['maxYear'];
  }
  ngOnInit() {
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
		} else {
      this.User=JSON.parse(localStorage.getItem("user"));
      this.getItemFavorite();
		}
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
    this.popupHide();
    this.popup=false;
  }
  popupPrice(){
    this.popupHide();
    this.popup6=false;
  }
  popupAnio(){
    this.popupHide();
    this.popup2=false;
  }
  popupDatePubli(){
    this.popupHide();
    this.popupFechaPubli=false;
  }
  popupCondition(){
    this.popupHide();
    this.popupCond=false;
  }
  popupHide(){
    this.popup=true;
    this.popup2=true;
    this.popup3=true;
    this.popup4=true;
    this.popup5=true;
    this.popup6=true;
    this.popup7=true;
    this.popup9=true;
    this.popupFiltrar=true;
    this.popupFechaPubli=true;
    this.popupCond=true;
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
  filterHidden(){
    this.popupFiltrar=false;  
  }
  popupCategorys(){
    this.popupHide();
    this.popup7=false;
  }
  popupCountry(){
    this.popupHide();
    this.popup5=false;
  }
  popupProvince(){
    this.popupHide();
    this.popup3=false;
  }
  popupCity(){
    this.popupHide();
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
    this.popupHide();
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
    this.popupHide();
    this.itemListTemp=[];
    for (let i of this.itemList) {
      if(i.condition=="New"){
        this.itemListTemp.push(i);
      }
    }
    this.itemList=[];
    this.itemList=this.itemListTemp;
    this.conditionCard=true;
  }
  findUsed(){
    this.popupHide();
    this.itemListTemp=[];
    for (let i of this.itemList) {
      if(i.condition=="Used"){
        this.itemListTemp.push(i);
      }
    }
    this.itemList=[];
    this.itemList=this.itemListTemp;
    this.conditionCard=true;
  }
  getItemFavorite(){
    this.favoriteService.getItemFavorite(this.User.username).subscribe(
			res => {
            this.itemFavorites = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
  isFavortite(itemId:number){
    for(let i of this.itemFavorites){
      if(i.itemId==itemId){
        return true;
      }
    }
  }
  addToFavorites(itemId:number){
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
      var username= this.User.username;
      this.favoriteService.createFavorite(itemId,username).subscribe(
        res => {
          this.msg = JSON.parse(JSON.stringify(res))._body;
          this.getItemFavorite();
          this.redirectTo();
        },
        error => console.log(error)
      );
    }
  }
  deleteToFavorites(itemId:number){
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
      this.router.navigate(['/login']);      
		} else {
      var username= this.User.username;
      this.favoriteService.deleteFavorite(itemId,username).subscribe(
        res => {
          this.msg = JSON.parse(JSON.stringify(res))._body;
          this.getItemFavorite();
          this.redirectTo();
        },
        error => console.log(error)
      );
    }
  }
  redirectTo(){
    if(this.msg=='save'){ 
      this.ngOnInit();
    }else{
      alert(this.msg);
    } 
    
  }
}
