import { Component, OnInit } from '@angular/core';
import { IndexService } from '../../../service/index.service'
import { error } from 'selenium-webdriver';
import { Item } from '../../../model/item';
import { Product } from '../../../model/product';
import { FavoriteService } from '../../../service/favorite.service';
import { user } from '../../../model/user';
import { Router } from '@angular/router';
import { Network } from '../../../model/Network';
import { ItemService } from '../../../service/item.service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  itemList: Object[]=[];
  overList:Item[]=[];
  productList:Object[]=[];
  Item:Item=new Item();
  prod:Product=new Product();
  msg:string;
  User: user=new user();
  itemFavorites: Item[]=[];
  BUCKET_URL:string=Network.BUCKET_URL;
  slides = [
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"}
  ];
  slideConfig={
    "anchoSlide":560,
    //"dots": true,
    "infinite": false,
    //"speed": 350,
    //"slidesToShow": 2,
    "slidesToScroll": 3,
    //"autoplay": true,
    //"autoplaySpeed": 2000,
    "responsive": [
      {
        "breakpoint": 320,
        "settings": {
          "slidesToShow": 1,
          "slidesToScroll": 1,
        }
      },
      {
        "breakpoint": 480,
        "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 2,
        }
      },
      {
        "breakpoint": 640,
        "settings": {
          "slidesToShow": 3,
          "slidesToScroll": 3,
        }
      },
      {
        "breakpoint": 800,
        "settings": {
          "slidesToShow": 4,
          "slidesToScroll": 4,
        }
      },
      {
        "breakpoint": 960,
        "settings": {
          "slidesToShow": 5,
          "slidesToScroll": 5,
        }
      },
      {
        "breakpoint": 1200,
        "settings": {
          "slidesToShow": 4,
          "slidesToScroll": 4,
        }
      },
      {
        "breakpoint": 1440,
        "settings": {
          "slidesToShow": 5,
          "slidesToScroll": 5,
        }
      },
      {
        "breakpoint": 1680,
        "settings": {
          "slidesToShow": 6,
          "slidesToScroll": 6,
        }
      },
      {
        "breakpoint": 1920,
        "settings": {
          "slidesToShow": 7,
          "slidesToScroll": 7,
        }
      },
      {
        "breakpoint": 2160,
        "settings": {
          "slidesToShow": 8,
          "slidesToScroll": 8,
        }
      },
      {
        "breakpoint": 2400,
        "settings": {
          "slidesToShow": 9,
          "slidesToScroll": 9,
        }
      },
    ]
  };

  constructor(private itemService: ItemService, private indexService: IndexService, private favoriteService: FavoriteService,private router: Router) {

  }

  ngOnInit() {
    
  }
  getItems() {
    this.itemService.getOver20first(true).subscribe(
			res => {
            this.overList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.getFalse20index();
      		},
      		error => console.log(error)
    );
  }
  getFalse20index(){
    this.itemService.getOver20first(false).subscribe(
			res => {
            this.itemList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
  getTrue20index(){
    this.itemService.getOver20first(true).subscribe(
			res => {
            this.overList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }
  //obtener productos para setear envios 
  getProduct(){
    this.indexService.getProduct().subscribe(
      res=>{
        this.productList=JSON.parse(JSON.parse(JSON.stringify(res))._body);
        console.log("getProduc:"+this.productList.length);
        for(let p of this.productList){
          this.prod=JSON.parse(JSON.stringify(p));           
        }
      },
      error=> console.log(error)
    )
  }

  envioIcon(number:number):boolean{
    var retu=this.productR(number);
    var free="gratis";
    //console.log("retu: "+retu); 
    if(retu==free)    {return false;}
    else     return true;

  }
  productR(number:number):string{
    var ret="";
    for(let p of this.productList){
      this.prod=JSON.parse(JSON.stringify(p));
      if(number==this.prod.yng_Item.itemId){ 
        ret=this.prod.productPagoEnvio
      }
    }
    return ""+ret;
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
      this.ngAfterViewInit();
    }else{
      alert(this.msg);
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
  click(){
    alert("kanf");
  }
  ngAfterViewInit(){
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
      this.User = new user();
		} else {
      this.User=JSON.parse(localStorage.getItem("user"));
      this.getItemFavorite();
		}
    this.getItems();
  }
}
