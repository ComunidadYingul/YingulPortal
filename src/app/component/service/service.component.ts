import { Component, OnInit } from '@angular/core';
import { ListCategoryService } from '../../service/list-category.service'
import { Category } from '../../model/category';
import { ItemService } from '../../service/item.service'
import { Network } from '../../model/Network';
import { user } from '../../model/user';
import { Item } from '../../model/item';
import { FavoriteService } from '../../service/favorite.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  BUCKET_URL:string=Network.BUCKET_URL;
  categoryList: Category[];
  subCategoryList=[];
  itemList: Object[]=[];
  User:user=new user();
  itemFavorites: Item[]=[];
  msg:string;
  constructor(private router: Router,private favoriteService: FavoriteService,private categoryService: ListCategoryService,private itemService: ItemService) { }

  ngOnInit() {
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
		} else {
      this.User=JSON.parse(localStorage.getItem("user"));
      this.getItemFavorite();
		}
    this.itemService.getServices().subscribe(
			res => {
            this.itemList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    )
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getCategories("Service/0").subscribe(
			res => {
            this.categoryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.getSubCategories();       
      		},
      		error => console.log(error)
    )
  }
  getSubCategories(){
    for(let i=0;i<this.categoryList.length;i++){
      this.categoryService.getSubCategories(JSON.stringify(this.categoryList[i].categoryId)).subscribe(
        res => {
              this.subCategoryList[this.categoryList[i].categoryId] = JSON.parse(JSON.parse(JSON.stringify(res))._body);      
            },
            error => console.log(error)
      );
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
