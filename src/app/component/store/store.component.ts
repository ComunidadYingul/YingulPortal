import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../service/store.service';
import { Store } from '../../model/store';
import { ItemDetailService } from '../../service/item-detail.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Network } from '../../model/Network';
import { user } from '../../model/user';
import { FavoriteService } from '../../service/favorite.service';
import { Item } from '../../model/item';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  BUCKET_URL:string=Network.BUCKET_URL;
  nameStore:string;
  store:Store=new Store();
  itemsBySeller: Object[]=[];
  video;
  User:user=new user();
  itemFavorites: Item[]=[];
  msg:string;
  constructor(private router: Router,private favoriteService: FavoriteService,private route:ActivatedRoute,private storeService : StoreService,private itemDetailService : ItemDetailService,public sanitizer: DomSanitizer) {
    this.nameStore =route.snapshot.params['nameStore'];
    this.storeService.findStoreByName(this.nameStore).subscribe(
			res => {
            this.store = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            console.log(JSON.stringify(this.store));     
            this.getItemsBySeller();
            this.video=this.sanitizer.bypassSecurityTrustResourceUrl(this.store.video);
      		},
      		error => console.log(error)
    );
  }

  ngOnInit() {
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
		} else {
      this.User=JSON.parse(localStorage.getItem("user"));
      this.getItemFavorite();
		}
    
  }
  getItemsBySeller() {
    this.itemDetailService.getItemsBySeller(this.store.user.username).subscribe(
			res => {
            this.itemsBySeller = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
    
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
