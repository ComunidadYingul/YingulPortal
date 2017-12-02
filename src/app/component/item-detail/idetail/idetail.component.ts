import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ItemDetailService } from '../../../service/item-detail.service';
import { Router } from '@angular/router';
import { Service } from '../../../model/service';
import { Item } from '../../../model/item';
import { Product } from '../../../model/product';
import { Person } from '../../../model/person';
import { Motorized } from '../../../model/Motorized';
import { Property } from '../../../model/Property';
@Component({
  selector: 'app-idetail',
  templateUrl: './idetail.component.html',
  styleUrls: ['./idetail.component.css']
})
export class IdetailComponent implements OnInit {
  @Input('itemId') localItemId:number;
  itemType:string;
  Item:Item=new Item();
  Service:Service= new Service();
  Product:Product= new Product();
  Motorized:Motorized= new Motorized();
  Property:Property= new Property();
  Seller:Person= new Person();
  usernameSeller:string;
  itemsBySeller: Object[]=[];
  imageByItem:Object[]=[];
  categoriesByItem:Object[]=[];
  queryByItem:Object[]=[];
  queryLength:number;
  query: string;
  oneQuery:Object= new Object();
  msg:string;
  spinner: boolean=false;
  constructor(private itemDetailService : ItemDetailService, private router : Router){ 
    
  }
  ngOnInit() {
    this.itemDetailService.getItemType(this.localItemId).subscribe(
			res => {
            this.itemType = JSON.parse(JSON.stringify(res))._body;
            this.getItem(this.itemType,this.localItemId);
            this.getItemById();
      		},
      		error => console.log(error)
    ); 
    this.getImageByItem();
    this.getCategoriesByItem();
    this.getQueryByItem();
    this.getSeller();
  }
  getItemById(){
    this.itemDetailService.getItemById(this.localItemId).subscribe(
			res => {
            this.Item = JSON.parse(JSON.parse(JSON.stringify(res))._body);             
      		},
      		error => console.log(error)
    );
  }
  getItem(itemType:string, itemId: number){
    this.itemDetailService.getItem(itemType,itemId).subscribe(
			res => {
            switch (itemType) {
              case "Servicio":
                this.Service = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                break;
              case "Producto":
                this.Product = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                break;
              case "Inmueble":
                this.Property = JSON.parse(JSON.parse(JSON.stringify(res))._body)
                break;
              case "Vehiculo":
                this.Motorized = JSON.parse(JSON.parse(JSON.stringify(res))._body);
                break;
              default:
                alert("error");
            }//aqui poner un switch para los demas casos
      		},
      		error => console.log(error)
    )
  }
  getSeller(){
    this.itemDetailService.getSeller(this.localItemId).subscribe(
			res => {
            this.Seller = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.usernameSeller=JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(this.Seller)).yng_User)).username));
            this.getItemsBySeller();
      		},
      		error => console.log(error)
    );
  }
  getItemsBySeller() {
    this.itemDetailService.getItemsBySeller(this.usernameSeller).subscribe(
			res => {
            this.itemsBySeller = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
    
  }
  getImageByItem(){
    this.itemDetailService.getImageByItem(this.localItemId).subscribe(
			res => {
            this.imageByItem = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
  }

  getCategoriesByItem(){
    this.itemDetailService.getCategoriesByItem(this.localItemId).subscribe(
			res => {
            this.categoriesByItem = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.categoriesByItem=this.categoriesByItem.sort();
            console.log(JSON.stringify(this.categoriesByItem));
      		},
      		error => console.log(error)
    );
  }
  getQueryByItem(){
    this.itemDetailService.getQueryByItem(this.localItemId).subscribe(
			res => {
            this.queryByItem = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.queryByItem = this.queryByItem.sort();
            this.queryLength= this.queryByItem.length;
            console.log(JSON.stringify(this.queryByItem));
      		},
      		error => console.log(error)
    );
  }
  onSubmit(){
    if(localStorage.getItem('user') == '' || localStorage.getItem('user') == null) {
			this.router.navigate(['/login']);
		} else {
			this.spinner=true;
      //probablemente para crear un nuevo servicio funciones con el promise 
      /*var promise = new Promise((resolve, reject) => {
          setTimeout(() => {
          console.log("Async Work Complete");
          resolve();
        }, 100000);
      });*/
      this.oneQuery={"query":this.query,"user":JSON.parse(localStorage.getItem("user")),"yng_Item":{"itemId":this.localItemId}};
      this.itemDetailService.postQuery(this.oneQuery).subscribe(
        res => {
          this.msg = JSON.parse(JSON.stringify(res))._body;
          if(this.msg=='save'){
            location.reload();
          }
          else{
            alert(this.msg);
          } 
        },
        error => console.log(error)
      );
      this.spinner=false;
		}
    
  }
}
