import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category';
import { ListCategoryService } from '../../service/list-category.service'
import { ItemService } from '../../service/item.service'
import { FindMotorized } from '../../model/find-motorized';
import { Router } from '@angular/router';
import { Network } from '../../model/Network';
import { user } from '../../model/user';
import { Item } from '../../model/item';
import { FavoriteService } from '../../service/favorite.service';
@Component({
  selector: 'app-motorized',
  templateUrl: './motorized.component.html',
  styleUrls: ['./motorized.component.css']
})
export class MotorizedComponent implements OnInit {
  BUCKET_URL:string=Network.BUCKET_URL;
  fechaActual = new Date();
  anios = [];
  anio = this.fechaActual.getFullYear();
  price =[];
  categoryList:Category[];
  subCategoryList: Category[];
  subSubCategoryList: Category[];
  itemList: Object[]=[];
  findMotorized:FindMotorized=new FindMotorized();
  //parametros para armar la url de busqueda
  categoryId: string="0";
  subCategoryId:string="0";
  subSubCategoryId:string="0";
  minPrice:string="0";
  maxPrice:string="0";
  minYear:string="0";
  maxYear:string="0";
  User:user=new user();
  itemFavorites: Item[]=[];
  msg:string;
  constructor(private favoriteService: FavoriteService,private categoryService: ListCategoryService,private itemService: ItemService,private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
		} else {
      this.User=JSON.parse(localStorage.getItem("user"));
      this.getItemFavorite();
		}
    this.getCategories();
    this.itemService.getMotorized().subscribe(
			res => {
            this.itemList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
  getCategories() {
    this.categoryService.getCategories("Motorized/0").subscribe(
			res => {
            this.categoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);  
      		},
      		error => console.log(error)
    )
  }
  getSubCategory(categoryId : string){
    this.categoryId=categoryId;
    this.subCategoryId="0";
    this.subSubCategoryId="0";
    this.subCategoryList=[];
    this.subSubCategoryList=[];
    if(categoryId!="0"){
      this.categoryService.getSubCategories(categoryId).subscribe(
        res => {
              this.subCategoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body)
            },
            error => console.log(error)
      );
      this.itemService.getFindMotorized(categoryId).subscribe(
        res => {
              this.findMotorized = JSON.parse(JSON.parse(JSON.stringify(res))._body);
              this.setParameters();
            },
            error => console.log(error)
      );
    }
  }
  getSubSubCategory(categoryId : string){
    this.subCategoryId=categoryId;
    this.subSubCategoryId="0";
    this.subSubCategoryList=[];
    if(categoryId!="0"){
      this.categoryService.getSubCategories(categoryId).subscribe(
        res => {
              this.subSubCategoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            },
            error => console.log(error)
      );
    }
  }
  setSubSubCategory(categoryId: string){
    this.subSubCategoryId=categoryId;
  }
  setParameters(){
    this.anios=[];
    //anios
    for(let i = this.anio+1 ;i>=this.findMotorized.minYear;i--){
      this.anios.push(i);
    }
    this.price=[];
    //precios
    for(let j = this.findMotorized.minPrice ; j<= this.findMotorized.maxPrice ; j=j+this.findMotorized.rankPrice){
      this.price.push(j);
    }
  }
  setMinPrice(minPrice:string){
    this.minPrice=minPrice;
  }
  setMaxPrice(maxPrice:string){
    this.maxPrice=maxPrice;
  }
  setMinYear(minYear:string){
    this.minYear=minYear;
  }
  setMaxYear(maxYear:string){
    this.maxYear=maxYear;
  }
  search(){
    if(this.subSubCategoryId!="0"){
      let url="/searchMotorized/"+this.subSubCategoryId+"/"+this.minPrice+"/"+this.maxPrice+"/"+this.minYear+"/"+this.maxYear;
      this.router.navigate([url]);
    }else{
      if(this.subCategoryId!="0"){
        let url="/searchMotorized/"+this.subCategoryId+"/"+this.minPrice+"/"+this.maxPrice+"/"+this.minYear+"/"+this.maxYear;
        this.router.navigate([url]);
      }else{
        let url="/searchMotorized/"+this.categoryId+"/"+this.minPrice+"/"+this.maxPrice+"/"+this.minYear+"/"+this.maxYear;
        this.router.navigate([url]);
      }
    }
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
