import { Component, OnInit } from '@angular/core';
import { IndexService } from '../../../service/index.service'
import { error } from 'selenium-webdriver';
import { Item } from '../../../model/item';
import { Product } from '../../../model/product';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  itemList: Object[]=[];
  productList:Object[]=[];
  Item:Item=new Item();
  prod:Product=new Product();
  constructor(private indexService: IndexService) {
    this.getItems();
    this.getProduct();
   }

  ngOnInit() {
  }
  getItems() {
    this.indexService.getItems().subscribe(
			res => {
            this.itemList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    )
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
  
 
  
}
