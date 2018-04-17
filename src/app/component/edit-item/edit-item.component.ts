import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDetailService } from '../../service/item-detail.service';
import { Item } from '../../model/item';
import { error } from 'selenium-webdriver';
import { Product } from '../../model/product';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  public itemId: number;
  public Item:Item=new Item();
  public product:Product=new Product();
  public typeCat:string;

  constructor(private route:ActivatedRoute,private itemDetailService : ItemDetailService) { 
    this.itemId =route.snapshot.params['itemId'];
    console.log("this.itemId:"+this.itemId);
    this.getItemById();
    this.getTypeItem();
  }

  ngOnInit() {
   
  }
  getItemById(){
    this.itemDetailService.getItemById(this.itemId).subscribe(
			res => {
            this.Item = JSON.parse(JSON.parse(JSON.stringify(res))._body);
        },
      		error => console.log(error)
    );
    
  }
  getTypeItem(){
    this.itemDetailService.getItemTypeEdit(this.itemId).subscribe(
      res=>{
        this.typeCat=JSON.parse(JSON.stringify(res))._body;
        this.getObject(this.typeCat);
      },
      error=>console.log(error)
    ); 
  }

  getObject(category:string){
    console.log("typeCat:"+this.typeCat);
    if(category=="Product"){
      this.itemDetailService.getProductByIdItem(this.itemId).subscribe(
        res=>{
          this.product=JSON.parse(JSON.parse(JSON.stringify(res))._body);
          console.log("product:"+JSON.stringify(this.product));
        },
        error=> console.log(error)
      );
    }
  }
}
